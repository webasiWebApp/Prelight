"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import DarkVeil from './reactBitCompo/darkveli';
import SoftAurora from './reactBitCompo/SoftAurora';
import GradientText from './reactBitCompo/GradientText';
import { ClipboardCheck, Target, Layers, Clapperboard, Globe, Lightbulb } from 'lucide-react';

// --- REUSABLE COMPONENTS ---

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

import Button from './components/Button';

// --- MAIN PAGE ---

export default function PrelightLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ["start end", "center center"]
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isModalOpen]);

  return (
    <main className="relative overflow-hidden selection:bg-prelight-purple selection:text-white">
      
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between pointer-events-auto">
        <div className="text-xl font-semibold flex items-center gap-2">
          <img src="/logo.png" alt="Prelight Logo" className="w-[30px] h-[30px] object-contain" />
          prelight
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Solutions</a>
          <a href="#" className="hover:text-white transition-colors">Resources</a>
          <a href="#" className="hover:text-white transition-colors">Company</a>
        </div>
        <div className="flex items-center gap-4">
          
          <Button onClick={() => setIsModalOpen(true)}>
            Request Demo
          </Button>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className="relative h-screen w-full flex items-center justify-center text-center px-8 md:px-24">
        {/* Background DarkVeil */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <DarkVeil
              hueShift={0}
              noiseIntensity={0}
              scanlineIntensity={0}
              speed={0.5}
              scanlineFrequency={0}
              warpAmount={0}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-prelight-black/90 via-prelight-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[800px] mt-16 mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            {/* Logo Placeholder */}
            <div className="flex items-center justify-center mb-2">
              <img src="/logo.png" alt="Prelight Logo" className="h-16 w-auto object-contain" />
            </div>
          </motion.div>

          <FadeIn>
            <h1 className="text-[50px] font-bold leading-normal mb-6 uppercase">
              Control your IP in AI-driven content workflows
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-[15px] font-normal opacity-80 mb-8 max-w-[500px]">
              Prelight helps studios, brands, and agencies create, scale, and govern content with consistency and full ownership.Start with a focused 4-6 week pilot to measure real production impact.
            </p>
            
          </FadeIn>

          <FadeIn delay={0.4}>
            <Button onClick={() => setIsModalOpen(true)}>Request a Demo</Button>
            <div className="flex flex-col sm:flex-row gap-6 mt-8 text-sm text-gray-400 font-medium justify-center items-center">
              <span className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-prelight-blue" /> 60-80% faster approvals
              </span>
              <span className="flex items-center gap-2">
                <Target className="w-4 h-4 text-prelight-purple" /> 50-70% fewer revisions
              </span>
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-prelight-blue" /> 2-3x output
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. BUILT FOR IP CRITICAL BUSINESSES */}
      <section className="py-32 px-8 bg-black  flex flex-col items-center text-center">
        <div className="max-w-6xl w-full mx-auto">
          <FadeIn>
            <h2 className="text-[40px] font-medium leading-normal mb-12">
              Built for  <span className="text-[#4da6ff] font-light">IP</span> Critical Businesses
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            {/* Video Placeholder */}
            <motion.div 
              ref={videoContainerRef}
              style={{ scale: videoScale }}
              className="relative w-full aspect-video rounded-xl mb-16 max-w-4xl mx-auto p-[2px] overflow-hidden group"
            >
              {/* Moving purple shine */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute -inset-[100%] z-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,#8b5cf6_360deg)] opacity-80"
              />
              
              {/* Inner container to hold the video and mask the shine */}
              <div className="relative z-10 w-full h-full bg-prelight-black rounded-xl overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl">
                <video 
                  src="/aboutVid.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </FadeIn>

          {/* 3 Cards */}
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <FadeIn delay={0.4}>
              <div className="flex flex-col items-start text-left">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Clapperboard className="w-8 h-8 text-prelight-blue" />
                </div>
                <h3 className="text-[20px] font-bold mb-4">Film Studios</h3>
                <p className="text-[15px] font-normal opacity-80">
                  Manage character universes and scale production
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.6}>
              <div className="flex flex-col items-start text-left">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-prelight-purple" />
                </div>
                <h3 className="text-[20px] font-bold mb-4">Global Brands</h3>
                <p className="text-[15px] font-normal opacity-80">
                  Launch campaigns across markets without losing consistency
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="flex flex-col items-start text-left">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-prelight-blue" />
                </div>
                <h3 className="text-[20px] font-bold mb-4">Creative Agencies</h3>
                <p className="text-[15px] font-normal opacity-80">
                  Produce high-volume content faster with fewer revisions
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (Previously PILOT) */}
      <section className="relative py-32 px-8 overflow-hidden bg-black">
        {/* Soft Aurora Background */}
        <div className="absolute inset-0 z-0">
          <SoftAurora 
            color1="#0077b6" 
            color2="#692bdf" 
            speed={0.5} 
            brightness={0.8}
            enableMouseInteraction={true}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-32 gap-12">
            <FadeIn>
              <h2 className="text-[50px] font-medium leading-[1.1] tracking-tight text-white">
                How Prelight <br />
                <span className="text-[#4da6ff] font-light">Works</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="md:max-w-[400px] text-left pt-2">
                <p className="text-[18px] font-normal leading-relaxed text-gray-300">
                  From secure IP management to global content scaling: a complete end-to-end workflow
                </p>
              </div>
            </FadeIn>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 text-center md:text-left">
            {[
              { 
                step: "01", 
                title: "INGEST", 
                desc: "Upload brand assets, characters, and guidelines into a secure system" 
              },
              { 
                step: "02", 
                title: "GENERATE", 
                desc: "Create scripts, visuals, and localized content across 70+ languages" 
              },
              { 
                step: "03", 
                title: "MONITOR", 
                desc: "Track usage, detect misuse, and ensure compliance across platforms" 
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="relative flex flex-col items-center md:items-start group pt-8">
                  {/* Background Number */}
                  <div className="absolute top-0 md:-top-16 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 text-[160px] font-black leading-none text-white/5 pointer-events-none select-none transition-transform duration-500 group-hover:scale-105 z-0">
                    {item.step}
                  </div>
                  {/* Foreground Content */}
                  <div className="relative z-10 mt-16 md:mt-20 px-4 md:px-0 py-6 md:py-0">
                    <h3 className="text-[22px] font-bold text-[#4da6ff] uppercase tracking-wider mb-4">{item.title}</h3>
                    <p className="text-[15px] font-normal text-gray-300 leading-relaxed max-w-xs mx-auto md:mx-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RESULTS (STATS) */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-[40px] font-medium leading-normal mb-16 text-center">Measured Impact</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-12 text-center border-t border-b border-white/10 py-16">
            <FadeIn delay={0.1}>
              <div className="mb-2 inline-block">
                <GradientText
                  colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                  animationSpeed={8}
                  showBorder={false}
                  className="text-6xl md:text-7xl font-semibold"
                >
                  60-80%
                </GradientText>
              </div>
              <div className="text-xl text-gray-400 font-medium">faster approvals</div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mb-2 inline-block">
                <GradientText
                  colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                  animationSpeed={8}
                  showBorder={false}
                  className="text-6xl md:text-7xl font-semibold"
                >
                  50-70%
                </GradientText>
              </div>
              <div className="text-xl text-gray-400 font-medium">fewer revisions</div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="mb-2 inline-block">
                <GradientText
                  colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                  animationSpeed={8}
                  showBorder={false}
                  className="text-6xl md:text-7xl font-semibold"
                >
                  2-3x
                </GradientText>
              </div>
              <div className="text-xl text-gray-400 font-medium">content output</div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. SEE IT IN ACTION (CAROUSEL) */}
      <section className="py-32 px-8 overflow-hidden bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <FadeIn>
            <h2 className="text-[40px] font-bold leading-normal mb-4">See it in action</h2>
            <p className="text-[15px] font-normal opacity-80">Real outputs generated and scaled using structured IP workflows</p>
          </FadeIn>
        </div>
        
        {/* Framer Motion Drag Carousel */}
        <div className="w-full max-w-7xl mx-auto cursor-grab active:cursor-grabbing">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -1000 }} // Adjust left constraint based on content
            className="flex gap-6"
          >
            {[
              "Character consistency across scenes",
              "Multi-language campaign variations",
              "Storyboard to visual production",
              "Asset variations at scale"
            ].map((label, i) => (
              <motion.div 
                key={i} 
                className="min-w-[300px] md:min-w-[400px] rounded-xl overflow-hidden border border-white/10 bg-prelight-black flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-video bg-gray-900 relative">
                  {/* Placeholder for looping video */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    [Video: {label}]
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-[40px] font-bold leading-normal">{label}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5.1 PROBLEM & 6. HOW IT WORKS & 7. PRODUCT (Combined for flow) */}
      <section className="py-24 px-8 bg-prelight-black">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24">
          
          {/* Problem */}
          <div>
            <FadeIn>
              <h2 className="text-[40px] font-bold leading-normal mb-8">Why this matters</h2>
              <ul className="space-y-6 text-lg text-gray-300 font-medium mb-12">
                <li className="flex items-center gap-3"><span className="text-prelight-purple">→</span> Content demand has exploded</li>
                <li className="flex items-center gap-3"><span className="text-prelight-purple">→</span> AI outputs are inconsistent</li>
                <li className="flex items-center gap-3"><span className="text-prelight-purple">→</span> Approval cycles are slowing down</li>
                <li className="flex items-center gap-3"><span className="text-prelight-purple">→</span> IP risk is increasing</li>
              </ul>
              <div className="p-6 border-l-4 border-prelight-blue bg-white/5">
                <p className="text-[15px] font-normal opacity-80">Brands can generate content faster than they can control it.</p>
              </div>
            </FadeIn>
          </div>

          {/* Product Cards */}
          <div className="grid gap-6">
            <FadeIn delay={0.2}>
              <h2 className="text-[40px] font-bold leading-normal mb-8">How Prelight works</h2>
            </FadeIn>
            {[
              { title: "HUB - Structure", desc: "System of record for your IP" },
              { title: "STUDIO - Create", desc: "Generate consistent content" },
              { title: "SCORE - Protect", desc: "Monitor usage and enforce compliance" }
            ].map((item, i) => (
              <FadeIn key={i} delay={0.3 + (i * 0.1)}>
                <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent flex items-center justify-between">
                  <div>
                    <h3 className="text-[40px] font-bold leading-normal mb-1">{item.title}</h3>
                    <p className="text-[15px] font-normal opacity-80">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TRUST STRIP */}
      <section className="py-12 border-y border-white/10 bg-[#05050a] overflow-hidden">
        <div className="flex w-max animate-marquee gap-16 px-8 text-gray-500 font-semibold uppercase tracking-wider text-sm">
          <span>• Your IP is never used to train external models</span>
          <span>• Full ownership of all assets</span>
          <span>• Enterprise-grade privacy</span>
          <span>• Every output is traceable</span>
          {/* Duplicate for seamless infinite scroll effect */}
          <span className="hidden md:inline">• Your IP is never used to train external models</span>
          <span className="hidden md:inline">• Full ownership of all assets</span>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-32 px-8 bg-gradient-to-t from-prelight-darkBlue/20 to-prelight-black text-center">
        <FadeIn>
          <h2 className="text-[40px] font-bold leading-normal mb-12 max-w-[800px] mx-auto">
            See what your workflow could look like in 4-6 weeks
          </h2>
          <Button onClick={() => setIsModalOpen(true)} className="text-lg px-12 py-4">Request a Demo</Button>
        </FadeIn>
      </section>

      {/* 10. FOOTER */}
      <footer className="py-12 px-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-semibold flex items-center gap-2">
          <img src="/logo.png" alt="Prelight Logo" className="w-[30px] h-[30px] object-contain" />
          prelight
        </div>
        <div className="text-gray-400 font-medium text-sm">
          Brand-first. Policy-compliant. Fully private.
        </div>
        <a href="mailto:hello@prelight.ai" className="text-prelight-blue hover:text-white transition-colors font-medium">
          hello@prelight.ai
        </a>
      </footer>

      {/* ON-PAGE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0a0a1a] border border-white/10 p-8 rounded-2xl max-w-md w-full relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-6 text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
              <h3 className="text-[40px] font-bold leading-normal mb-2">Request a Pilot</h3>
              <p className="text-[15px] font-normal opacity-80 mb-8">Enter your details to measure real production impact.</p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Work Email</label>
                  <input type="email" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-prelight-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                  <input type="text" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-prelight-blue" />
                </div>
                <Button onClick={() => {}} className="w-full mt-4">Submit Request</Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}