
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Gamepad2, Stars, Calendar, Sparkles, ChevronDown, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateLoveNote } from './services/geminiService';

// --- Sub-components ---

const FloatingHeart: React.FC = () => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    setStyle({
      left: Math.random() * 100 + "vw",
      animationDelay: Math.random() * 5 + "s",
      fontSize: (Math.random() * 15 + 15) + "px"
    });
  }, []);

  return (
    <div className="heart-float" style={style}>
      ❤️
    </div>
  );
};

const SectionHeading: React.FC<{ children: React.ReactNode; icon: React.ElementType }> = ({ children, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center gap-2 mb-8 animate-fade-in">
    <Icon className="text-[#ff4d6d]" size={36} />
    <h2 className="text-4xl md:text-5xl font-bold font-handwriting text-white">{children}</h2>
  </div>
);

// --- Main App ---

export default function App() {
  const [aiNote, setAiNote] = useState<string>('');
  const [loadingNote, setLoadingNote] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isProposed, setIsProposed] = useState(false);
  const [daysTogether, setDaysTogether] = useState(0);
  const [hearts, setHearts] = useState<number[]>([]);

  const storyRef = useRef<HTMLElement>(null);

  // Calculate Days Together
  useEffect(() => {
    const startDate = new Date("August 4, 2024");
    const today = new Date();
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);

    // Initial hearts
    setHearts([...Array(15)].map((_, i) => i));
    const interval = setInterval(() => {
      setHearts(prev => [...prev.slice(-20), Date.now()]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchNewNote = async () => {
    setLoadingNote(true);
    const note = await generateLoveNote("gaming memories, long distance connection, Archisha my home");
    setAiNote(note);
    setLoadingNote(false);
  };

  useEffect(() => {
    fetchNewNote();
  }, []);

  const handleNoHover = () => {
    const randomX = Math.random() * 400 - 200;
    const randomY = Math.random() * 400 - 200;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    setIsProposed(true);
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ffffff', '#ffd700']
    });
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen relative">
      {/* Floating Hearts Background */}
      {hearts.map((id) => <FloatingHeart key={id} />)}

      {/* 1. Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative z-10 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold font-handwriting mb-6 text-white">
          Hey Archisha ❤️
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12">
          This isn’t just a website… it’s my heart.
        </p>
        <button 
          onClick={() => scrollToSection(storyRef)}
          className="bg-[#ff4d6d] hover:scale-110 text-white px-10 py-4 rounded-full text-xl font-bold transition-transform shadow-[0_0_20px_rgba(255,77,109,0.5)]"
        >
          Click if you love me
        </button>
      </section>

      {/* 2. Story Section */}
      <section ref={storyRef} id="story" className="py-24 px-6 max-w-4xl mx-auto text-center z-10 relative">
        <SectionHeading icon={Calendar}>How It All Started...</SectionHeading>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
          Since August 4, 2024, everything changed for me. 
          From random conversations to becoming my peace, you slowly became my home.
        </p>
        <div className="text-3xl md:text-4xl font-bold text-[#ff4d6d] mt-10 font-handwriting">
          We have been together for {daysTogether} beautiful days ❤️
        </div>
      </section>

      {/* 3. Special Memory (Gaming) */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading icon={Gamepad2}>Our Special Memory 🎮</SectionHeading>
          <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10">
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed italic mb-8">
              "I still remember how you used to flirt with me while we played games. Those laughs… those cute fights… those moments, they were the beginning of something beautiful."
            </p>
          </div>
        </div>
      </section>

      {/* 4. Gallery Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <SectionHeading icon={Camera}>Our Moments 📸</SectionHeading>
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative">
                <img 
                  src={`https://picsum.photos/seed/archisha${i}/300/400`} 
                  alt={`Memory ${i}`}
                  className="w-[250px] h-[320px] object-cover rounded-2xl gallery-glow transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#ff4d6d]/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Letter From My Heart */}
      <section className="py-24 px-6 max-w-4xl mx-auto z-10 relative">
        <SectionHeading icon={MessageCircle}>A Letter From My Heart 💌</SectionHeading>
        <div className="bg-white/5 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-white/10 space-y-8 text-lg md:text-xl text-gray-200 leading-relaxed">
          <p>
            Archisha… honestly bolun na, mujhe kabhi nahi laga tha ki koi itna special ho sakta hai mere liye. Aap sirf meri girlfriend nahi ho… aap meri best friend ho, meri comfort ho, meri daily happiness ho.
          </p>
          <p>
            Long distance easy nahi hota… lekin aapke saath har call, har late night talk, har “miss you” message worth it lagta hai. Jab aap games khelte waqt flirt karti thi, tab mujhe samajh aaya tha ki main aapse sach mein pyaar karne laga hoon.
          </p>
          <p className="text-2xl font-handwriting text-[#ff4d6d] pt-4">
            4 August 2024 se lekar aaj tak, main sirf ek cheez jaanta hoon — I want my future with you.
          </p>
        </div>
      </section>

      {/* 6. AI Powered Love Note (Bonus feature from original, integrated into theme) */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-[#ff4d6d]/10 p-8 rounded-3xl border border-[#ff4d6d]/30">
            <h3 className="text-[#ff4d6d] font-bold mb-4 flex items-center justify-center gap-2">
                <Stars size={20} /> AI Note for You
            </h3>
            {loadingNote ? (
              <div className="animate-pulse text-gray-400 italic">Finding the right words...</div>
            ) : (
              <p className="text-xl font-handwriting text-white">"{aiNote}"</p>
            )}
            <button 
              onClick={fetchNewNote}
              className="mt-4 text-xs uppercase tracking-widest text-[#ff4d6d] hover:text-white transition-colors"
            >
              Get another sweet note
            </button>
          </div>
        </div>
      </section>

      {/* 7. Proposal Section */}
      <section id="proposal" className={`py-32 px-6 text-center z-10 relative ${isProposed ? 'hidden' : ''}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-handwriting">
          I Don’t Just Want Today...
        </h2>
        <h2 className="text-5xl md:text-6xl font-bold text-[#ff4d6d] mb-8 font-handwriting">
          I Want Forever With You 💍
        </h2>
        <p className="text-2xl text-gray-300 mb-12">Archisha… will you marry me?</p>

        <div className="flex flex-wrap justify-center items-center gap-8 relative min-h-[120px]">
          <button 
            onClick={handleYes}
            className="bg-[#ff4d6d] hover:scale-110 text-white px-14 py-4 rounded-full text-2xl font-bold shadow-[0_0_25px_rgba(255,77,109,0.6)] transition-all"
          >
            YES ❤️
          </button>
          <button 
            onMouseEnter={handleNoHover}
            style={{
              position: noButtonPos.x !== 0 ? 'relative' : 'static',
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
              transition: 'all 0.15s ease-out'
            }}
            className="bg-white text-[#ff4d6d] px-14 py-4 rounded-full text-2xl font-bold shadow-lg"
          >
            No 🙈
          </button>
        </div>
      </section>

      {/* 8. Final Message */}
      {isProposed && (
        <section className="py-32 px-6 text-center z-10 relative animate-in zoom-in duration-1000">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-[#ff4d6d] mb-8 font-handwriting">
              She Said YESSSS 😭❤️
            </h1>
            <div className="space-y-6 text-2xl md:text-3xl text-gray-200 leading-relaxed">
              <p>Distance is temporary.</p>
              <p>Forever starts now.</p>
              <p>I love you, Archisha.</p>
              <p className="text-[#ff4d6d] font-handwriting text-5xl pt-8">– Shashank ❤️</p>
            </div>
            <div className="mt-16 flex justify-center gap-4">
               {[...Array(8)].map((_, i) => (
                 <Sparkles key={i} className="text-yellow-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
               ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 font-medium">
        <p>Made with all my heart for Archisha • Established 04.08.2024</p>
      </footer>
    </div>
  );
}
