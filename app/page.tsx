"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import DarkVeil from './reactBitCompo/darkveli';
import SoftAurora from './reactBitCompo/SoftAurora';
import GradientText from './reactBitCompo/GradientText';
import ChromaGrid from '@/components/ChromaGrid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ClipboardCheck, Target, Layers, Clapperboard, Globe, Lightbulb, Component, User, Shield, Lock, FileCheck, ChevronRight, Network, ShieldCheck, Zap, FileSignature } from 'lucide-react';
import MagicBento from '@/components/MagicBento';
import Grainient from '@/components/Grainient';
import ShinyText from '@/components/ShinyText';
import MagicRings from '@/components/MagicRings';

// --- REUSABLE COMPONENTS ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

import Button from './components/Button';

// --- MAIN PAGE ---

const seeItInActionItems = [
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson"
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen"
  },
  {
    image: "https://i.pravatar.cc/300?img=40",
    title: "Alex Rivera",
    subtitle: "AI Storyboard Artist",
    handle: "@arivera",
    borderColor: "#A855F7",
    gradient: "linear-gradient(145deg, #A855F7, #000)"
  },
  {
    image: "https://i.pravatar.cc/300?img=43",
    title: "Jordan Lee",
    subtitle: "Brand Specialist",
    handle: "@jordanlee",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(180deg, #F59E0B, #000)"
  }
];

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
            <div className="mb-5">
              <ShinyText text="✦ WHO IT'S FOR" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[40px] font-medium leading-normal mb-4">
              Built for  <span className="text-[#4da6ff] font-light capitalize">IP</span> Critical Businesses
            </h2>
            <p className="text-[15px] font-normal opacity-60 max-w-lg mx-auto mb-12">
              From studios to global brands — any team that creates, governs, or scales proprietary creative assets at volume.
            </p>
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
              <div className="mb-5">
                <ShinyText text="✦ THE PROCESS" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
              </div>
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
            <div className="mb-5 text-center">
              <ShinyText text="✦ REAL RESULTS" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[40px] font-medium leading-normal mb-4 text-center capitalize">Measured Impact</h2>
            <p className="text-[15px] font-normal opacity-60 max-w-lg mx-auto mb-16 text-center">
              Numbers from real pilots run with global studios and content teams over a 6-week period.
            </p>
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
      <section className="py-32 px-8 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <FadeIn>
            <div className="mb-5">
              <ShinyText text="✦ LIVE DEMOS" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[40px] font-bold leading-normal mb-4 capitalize">See it in action</h2>
            <p className="text-[15px] font-normal opacity-60 max-w-lg mx-auto">
              Real outputs generated and scaled using structured IP workflows — no prompts, no guesswork.
            </p>
          </FadeIn>
        </div>
        
        {/* SwiperJS Carousel with ChromaGrid Cards */}
        <div className="w-full max-w-7xl mx-auto">
          <Swiper
            spaceBetween={30}
            slidesPerView="auto"
            loop={true}
            centeredSlides={true}
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="w-full pb-16"
          >
            {[...seeItInActionItems, ...seeItInActionItems].map((item, idx) => (
              <SwiperSlide key={idx} style={{ width: '352px', height: 'auto', display: 'flex' }}>
                <div className="w-full" style={{ height: '600px', position: 'relative' }}>
                  <ChromaGrid 
                    items={[item]}
                    columns={1}
                    rows={1}
                    radius={300}
                    damping={0.45}
                    fadeOut={0.6}
                    ease="power3.out"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 6. WHY THIS MATTERS (Two Systems) */}
      <section className="py-32 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-5 flex justify-center">
              <ShinyText text="✦ OUR PRODUCTS" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[50px] font-medium leading-[1.1] tracking-tight text-white mb-6 text-center">
              Two systems. <span className="text-[#26afff] font-light">One</span> controlled workflow.
            </h2>
            <p className="text-[15px] font-normal opacity-60 max-w-xl mx-auto mb-20 text-center">
              Prelight STUDIO generates content from your IP library. Prelight SCORE monitors how it's used out in the world.
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Card 1: STUDIO */}
            <FadeIn delay={0.2}>
              <div className="flex flex-col h-full bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:bg-white/[0.04]">
                {/* Image Placeholder */}
                <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#26afff]/10 to-transparent flex items-center justify-center border-b border-white/5">
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" alt="Studio Background" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-80" />
                  <Clapperboard className="w-16 h-16 text-[#26afff] relative z-10 opacity-80" />
                </div>
                
                {/* Content */}
                <div className="p-10 flex flex-col flex-grow">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 mt-2 text-[11px] font-bold uppercase tracking-wider text-prelight-black bg-[#26afff] rounded-[4px]">
                      Create
                    </span>
                  </div>
                  <h3 className="text-[32px] font-bold text-[#26afff] mb-4">prelight STUDIO</h3>
                  <p className="text-[16px] text-gray-300 font-normal opacity-80 mb-10 leading-relaxed">
                    Generate high-quality, on-brand content at scale using your private IP library.
                  </p>
                  
                  <ul className="space-y-4 mt-auto">
                    <li className="flex items-center gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#26afff]">
                        <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-300 text-[15px] font-medium">Script to image to video workflows</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#26afff]">
                        <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-300 text-[15px] font-medium">Brand-safe generation</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#26afff]">
                        <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-300 text-[15px] font-medium">Multi-language output (70+)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Card 2: SCORE */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col h-full bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:bg-white/[0.04]">
                {/* Image Placeholder */}
                <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#b961ee]/10 to-transparent flex items-center justify-center border-b border-white/5">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen" alt="Score Background" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-80" />
                  <Target className="w-16 h-16 text-[#b961ee] relative z-10 opacity-80" />
                </div>
                
                {/* Content */}
                <div className="p-10 flex flex-col flex-grow">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 mt-2 text-[11px] font-bold uppercase tracking-wider text-white bg-[#b961ee] rounded-[4px]">
                      Monitor & Protect
                    </span>
                  </div>
                  <h3 className="text-[32px] font-bold text-[#b961ee] mb-4">prelight SCORE</h3>
                  <p className="text-[16px] text-gray-300 font-normal opacity-80 mb-10 leading-relaxed">
                    Understand how your IP is used across AI systems and manage risk.
                  </p>
                  
                  <ul className="space-y-4 mt-auto">
                    <li className="flex items-center gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#b961ee]">
                        <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-300 text-[15px] font-medium">IP usage detection</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#b961ee]">
                        <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-300 text-[15px] font-medium">Risk and compliance analysis</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#b961ee]">
                        <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-300 text-[15px] font-medium">Ongoing monitoring</span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 7. WHAT YOU UNLOCK (Bento Grid) */}
      <section className="py-32 px-8 bg-black relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-prelight-purple/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="mb-5 flex justify-center">
              <ShinyText text="✦ CAPABILITIES" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[50px] font-medium leading-[1.1] tracking-tight text-white mb-6 text-center">
              What you <span className="text-[#26afff] font-light">unlock</span> with Prelight
            </h2>
            <p className="text-[15px] font-normal opacity-60 max-w-xl mx-auto mb-20 text-center">
              A complete stack of capabilities that makes your IP the engine behind every piece of content you produce.
            </p>
          </FadeIn>
          
          <MagicBento 
            textAutoHide={false}
            enableStars={false}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={12}
            glowColor="132, 0, 255"
            disableAnimations={false}
          />
        </div>
      </section>

      {/* 8. TRUST STRIP */}
      <section className="py-12 border-y border-white/10 bg-[#05050a] overflow-hidden flex group">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused]">
          {/* First set */}
          <div className="flex gap-16 px-8 items-center text-gray-500 font-semibold uppercase tracking-wider text-[30px]">
            <span className="flex items-center gap-4 cursor-default whitespace-nowrap flex-shrink-0 group-hover:opacity-100 transition-opacity">
              <Shield className="w-8 h-8 text-[#26afff]" />
              <span className="bg-gradient-to-r from-[#26afff] to-[#b961ee] bg-clip-text text-transparent">
                Your IP is never used to train external models
              </span>
            </span>
            <span className="flex items-center gap-4 cursor-default whitespace-nowrap flex-shrink-0 group-hover:opacity-100 transition-opacity">
              <User className="w-8 h-8 text-[#b961ee]" />
              <span className="bg-gradient-to-r from-[#26afff] to-[#b961ee] bg-clip-text text-transparent">
                Full ownership of all assets
              </span>
            </span>
            <span className="flex items-center gap-4 cursor-default whitespace-nowrap flex-shrink-0 group-hover:opacity-100 transition-opacity">
              <Lock className="w-8 h-8 text-[#26afff]" />
              <span className="bg-gradient-to-r from-[#26afff] to-[#b961ee] bg-clip-text text-transparent">
                Enterprise-grade privacy
              </span>
            </span>
            <span className="flex items-center gap-4 cursor-default whitespace-nowrap flex-shrink-0 group-hover:opacity-100 transition-opacity">
              <FileCheck className="w-8 h-8 text-[#b961ee]" />
              <span className="bg-gradient-to-r from-[#26afff] to-[#b961ee] bg-clip-text text-transparent">
                Every output is traceable
              </span>
            </span>
          </div>
          {/* Duplicate set for seamless infinite scroll */}
          <div className="flex gap-16 px-8 items-center text-gray-500 font-semibold uppercase tracking-wider text-[30px]" aria-hidden="true">
            <span className="flex items-center gap-4 cursor-default whitespace-nowrap flex-shrink-0 group-hover:opacity-100 transition-opacity">
              <Shield className="w-8 h-8 text-[#26afff]" />
              <span className="bg-gradient-to-r from-[#26afff] to-[#b961ee] bg-clip-text text-transparent">
                Your IP is never used to train external models
              </span>
            </span>
            <span className="flex items-center gap-4 cursor-default whitespace-nowrap flex-shrink-0 group-hover:opacity-100 transition-opacity">
              <User className="w-8 h-8 text-[#b961ee]" />
              <span className="bg-gradient-to-r from-[#26afff] to-[#b961ee] bg-clip-text text-transparent">
                Full ownership of all assets
              </span>
            </span>
            <span className="flex items-center gap-4 cursor-default whitespace-nowrap flex-shrink-0 group-hover:opacity-100 transition-opacity">
              <Lock className="w-8 h-8 text-[#26afff]" />
              <span className="bg-gradient-to-r from-[#26afff] to-[#b961ee] bg-clip-text text-transparent">
                Enterprise-grade privacy
              </span>
            </span>
            <span className="flex items-center gap-4 cursor-default whitespace-nowrap flex-shrink-0 group-hover:opacity-100 transition-opacity">
              <FileCheck className="w-8 h-8 text-[#b961ee]" />
              <span className="bg-gradient-to-r from-[#26afff] to-[#b961ee] bg-clip-text text-transparent">
                Every output is traceable
              </span>
            </span>
          </div>
        </div>
      </section>

       <section className="py-24 px-8 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <div className="mb-5">
              <ShinyText text="✦ OUR NETWORK" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[40px] font-bold leading-normal mb-4">
              Elevated Partnerships.
            </h2>
            <p className="text-[15px] font-normal opacity-60 max-w-md mx-auto mb-16 leading-relaxed">
              Trusted by studios, brands, and agencies pushing the frontier of IP-powered content at scale.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
              {[
                { src: "/sponcer/1.png", alt: "Partner 1" },
                { src: "/sponcer/2.png", alt: "Partner 2" },
                { src: "/sponcer/3.png", alt: "Partner 3" },
                { src: "/sponcer/4.png", alt: "Partner 4" },
              ].map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center transition-opacity duration-300 "
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-16 md:h-18 w-auto object-contain max-w-[140px]"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY PRELIGHT EXISTS */}
      <section className="relative py-32 px-8 bg-black overflow-hidden">
        {/* MagicRings Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
          <div style={{ width: '700px', height: '700px' }}>
            <MagicRings
              color="#26afff"
              colorTwo="#b961ee"
              speed={0.6}
              ringCount={6}
              attenuation={12}
              lineThickness={2.5}
              baseRadius={0.3}
              radiusStep={0.08}
              scaleRate={0.08}
              opacity={0.9}
              blur={0}
              noiseAmount={0.05}
              rotation={0}
              ringGap={1.6}
              followMouse={false}
              clickBurst={false}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="mb-6">
              <ShinyText
                text="✦ WHY PRELIGHT EXISTS"
                speed={3}
                delay={0}
                color="#26afff"
                shineColor="#ffffff"
                spread={100}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
                className="text-[13px] font-bold tracking-[0.25em] uppercase"
              />
            </div>
            <h2 className="text-[48px] md:text-[56px] font-bold leading-[1.1] tracking-tight text-white mb-8">
              Generative AI is changing how content is created but it removes control from{' '}
              <span className="italic font-extrabold">IP owners</span>.
            </h2>
            <p className="text-[17px] text-gray-400 font-normal max-w-xl mx-auto leading-relaxed">
              We believe you should be able to scale creativity without giving up ownership, consistency, or security. Prelight turns your IP into a system you can control — not just content you create.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-20 px-8 bg-black">
        <FadeIn>
          <div className="relative max-w-5xl mx-auto rounded-[20px] overflow-hidden" style={{ minHeight: '440px' }}>
            {/* Grainient animated background */}
            <div className="absolute inset-0 rounded-[20px] overflow-hidden">
              <Grainient
                color1="#FF9FFC"
                color2="#5227FF"
                color3="#B19EEF"
                timeSpeed={0.25}
                colorBalance={0}
                warpStrength={1}
                warpFrequency={5}
                warpSpeed={2}
                warpAmplitude={50}
                blendAngle={0}
                blendSoftness={0.05}
                rotationAmount={500}
                noiseScale={2}
                grainAmount={0.1}
                grainScale={2}
                grainAnimated={false}
                contrast={1.5}
                gamma={1}
                saturation={1}
                centerX={0}
                centerY={0}
                zoom={0.9}
              />
            </div>

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center py-[50px] px-8 h-full" style={{ minHeight: '440px' }}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60 mb-6">Ready to take control?</p>
              <h2 className="text-[48px] md:text-[60px] font-bold leading-[1.05] tracking-tight text-white mb-6 max-w-[700px]">
                See what your workflow could look like in 4–6 weeks
              </h2>
              <p className="text-[18px] text-white/70 font-normal max-w-[480px] mb-12 leading-relaxed">
                Book a pilot with your team. We'll map your IP, run a content sprint, and show you real results.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-black font-bold text-[16px] hover:bg-white/90 transition-all duration-200 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                Request a Demo
                <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
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
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a href="mailto:hello@prelight.ai" className="text-prelight-blue hover:text-white transition-colors font-medium">
            hello@prelight.ai
          </a>
          <span className="text-white/20 hidden md:inline">·</span>
          <a
            href="https://webasi.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-gray-500 hover:text-white transition-colors tracking-wide"
          >
            design by <span className="font-bold text-gray-300">WEBASI</span>
          </a>
        </div>
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