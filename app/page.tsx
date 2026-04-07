"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import dynamic from "next/dynamic";

/* ─── UI Components ─── */
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";

/* ─── Icons ─── */
import {
  ClipboardCheck, Layers, Globe, Clapperboard, Lightbulb,
  ChevronRight, Shield, User, Lock, FileCheck,
  Network, ShieldCheck, Zap,
} from "lucide-react";

/* ─── Heavy components — dynamic import for code splitting ─── */
const DarkVeil = dynamic(() => import("@/components/backgrounds/DarkVeil"), { ssr: false });
const SoftAurora = dynamic(() => import("@/components/backgrounds/SoftAurora"), { ssr: false });
const MagicRings = dynamic(() => import("@/components/backgrounds/MagicRings"), { ssr: false });
const Grainient = dynamic(() => import("@/components/backgrounds/Grainient"), { ssr: false });
const MagicBento = dynamic(() => import("@/components/features/MagicBento"), { ssr: false });

/* ─── Swiper ─── */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";


/* ─── Data ─── */

type Channel = 'youtube' | 'tiktok' | 'instagram' | 'broadcast';
interface VideoCardItem { src: string; title: string; client: string; channels: Channel[]; tag: string; aspect: 'landscape' | 'portrait'; }

// Inline SVG channel icons
const ChannelIcon = ({ ch }: { ch: Channel }) => {
  const cls = "w-4 h-4";
  if (ch === 'youtube') return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
  );
  if (ch === 'tiktok') return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 3.4A5.5 5.5 0 0 1 14.1 0h-3.8v15.6a2.6 2.6 0 1 1-1.8-2.5V9.2a6.4 6.4 0 1 0 5.6 6.4V8.1a9.3 9.3 0 0 0 5.4 1.7V6a5.5 5.5 0 0 1-1-.6z"/></svg>
  );
  if (ch === 'instagram') return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>
  );
  // broadcast
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-13v6l5 3-1 1.7-6-3.7V7h2z"/></svg>
  );
};

const videoCardItems: VideoCardItem[] = [
  { src: "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=900&auto=format&fit=crop", title: "Global Launch Campaign", client: "Warner Media", channels: ['youtube', 'broadcast'], tag: "16:9", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1574717024453-354056aad792?w=600&h=1067&auto=format&fit=crop", title: "Product Drop Reel", client: "Nike Studios", channels: ['instagram', 'tiktok'], tag: "9:16", aspect: "portrait" },
  { src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&auto=format&fit=crop", title: "Character Universe Spot", client: "Pixar Creative", channels: ['youtube', 'broadcast'], tag: "16:9", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=1067&auto=format&fit=crop", title: "Multi-Market TikTok Series", client: "L'Oréal Group", channels: ['tiktok', 'instagram'], tag: "9:16", aspect: "portrait" },
  { src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&auto=format&fit=crop", title: "Broadcast Franchise Promo", client: "Sky Studios", channels: ['broadcast', 'youtube'], tag: "16:9", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=600&h=1067&auto=format&fit=crop", title: "Localised Stories — 70+ Langs", client: "Unilever Global", channels: ['instagram', 'tiktok'], tag: "9:16", aspect: "portrait" },
];

const processSteps = [
  { step: "01", title: "INGEST", desc: "Upload brand assets, characters, and guidelines into a secure system" },
  { step: "02", title: "GENERATE", desc: "Create scripts, visuals, and localized content across 70+ languages" },
  { step: "03", title: "MONITOR", desc: "Track usage, detect misuse, and ensure compliance across platforms" },
];

const stats = [
  { value: "60-80%", label: "faster approvals" },
  { value: "50-70%", label: "fewer revisions" },
  { value: "2-3x", label: "content output" },
];

const trustItems = [
  { icon: Shield, color: "text-[#26afff]", text: "Your IP is never used to train external models" },
  { icon: User, color: "text-[#b961ee]", text: "Full ownership of all assets" },
  { icon: Lock, color: "text-[#26afff]", text: "Enterprise-grade privacy" },
  { icon: FileCheck, color: "text-[#b961ee]", text: "Every output is traceable" },
];

const partners = [
  { src: "/sponcer/1.png", alt: "Partner 1" },
  { src: "/sponcer/2.png", alt: "Partner 2" },
  { src: "/sponcer/3.png", alt: "Partner 3" },
  { src: "/sponcer/4.png", alt: "Partner 4" },
];

/* ─── Page ─── */

export default function PrelightLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: videoContainerRef, offset: ["start end", "center center"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);



  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="relative overflow-hidden selection:bg-prelight-purple selection:text-white">

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between" aria-label="Main navigation">
        <div className="text-xl font-semibold flex items-center gap-2">
          <Image src="/logo.png" alt="Prelight Logo" width={30} height={30} className="object-contain" />
          prelight
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Solutions</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Products</a>
          <a href="#partners" onClick={(e) => { e.preventDefault(); document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Clients</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">About us</a>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={openModal}>Request Demo</Button>
        </div>
      </nav>

      {/* ─── 1. HERO ─── */}
      <section className="relative h-screen w-full flex items-center justify-center text-center px-8 md:px-24">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <DarkVeil hueShift={0} noiseIntensity={0} scanlineIntensity={0} speed={0.5} scanlineFrequency={0} warpAmount={0} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-prelight-black/90 via-prelight-black/60 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[800px] mt-16 mx-auto flex flex-col items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mb-8">
            <div className="flex items-center justify-center mb-2">
              <Image src="/logo.png" alt="Prelight Logo" width={64} height={64} priority className="h-16 w-auto object-contain" />
            </div>
          </motion.div>

          <FadeIn>
            <h1 className="text-[50px] font-bold leading-normal mb-6 uppercase">
              Control your IP in AI-driven content workflows
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[15px] font-normal opacity-80 mb-8 max-w-[500px]">
              Prelight helps studios, brands, and agencies create, scale, and govern content with consistency and full ownership. Start with a focused 4–6 week pilot to measure real production impact.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Button onClick={openModal}>Request a Demo</Button>
            <div className="flex flex-col sm:flex-row gap-6 mt-8 text-sm text-gray-400 font-medium justify-center items-center">
              <span className="flex items-center gap-2"><ClipboardCheck className="w-4 h-4 text-prelight-blue" /> 60-80% faster approvals</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-prelight-purple" /> 50-70% fewer revisions</span>
              <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-prelight-blue" /> 2-3x output</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 2. BUILT FOR IP CRITICAL BUSINESSES ─── */}
      <section className="py-32 px-8 bg-black flex flex-col items-center text-center">
        <div className="max-w-6xl w-full mx-auto">
          <FadeIn>
            <div className="mb-5">
              <ShinyText text="✦ WHO IT'S FOR" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[40px] font-medium leading-normal mb-4">
              From Studios to  <span className="text-[#4da6ff] font-light capitalize">global brands </span> with high value IP
            </h2>
            <p className="text-[15px] font-normal opacity-60 max-w-lg mx-auto mb-12">
              Then Anmy team that creates, governs, or scales properties creative assets at volume.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div
              ref={videoContainerRef}
              style={{ scale: videoScale }}
              className="relative w-full aspect-video rounded-xl mb-16 max-w-4xl mx-auto p-[2px] overflow-hidden group"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute -inset-[100%] z-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,#8b5cf6_360deg)] opacity-80"
              />
              <div className="relative z-10 w-full h-full bg-prelight-black rounded-xl overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl">
                <video
                  src="/aboutVid.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { icon: Clapperboard, color: "text-prelight-blue", title: "Film Studios", desc: "Manage character universes and scale production" },
              { icon: Globe, color: "text-prelight-purple", title: "Global Brands", desc: "Launch campaigns across markets without losing consistency" },
              { icon: Lightbulb, color: "text-prelight-blue", title: "Creative Agencies", desc: "Produce high-volume content faster with fewer revisions" },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={0.4 + i * 0.2}>
                <div className="flex flex-col items-start text-left">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="text-[20px] font-bold mb-4">{item.title}</h3>
                  <p className="text-[15px] font-normal opacity-80">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. HOW IT WORKS ─── */}
      <section id="how-it-works" className="relative py-32 px-8 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <SoftAurora color1="#0077b6" color2="#692bdf" speed={0.5} brightness={0.8} enableMouseInteraction={true} />
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
                  From secure IP management to global content scaling: a complete <span className="font-bold text-[#00ffff]">end-to-end</span> workflow
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-16 text-center md:text-left">
            {processSteps.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.2}>
                <div className="relative flex flex-col items-center md:items-start group pt-8">
                  <div className="absolute top-0 md:-top-16 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 text-[160px] font-black leading-none text-white/8 pointer-events-none select-none transition-transform duration-500 group-hover:scale-105 z-0">
                    {item.step}
                  </div>
                  <div className="relative z-10 mt-16 md:mt-20 px-4 md:px-0 py-6 md:py-0">
                    <h3 className="text-[22px] font-bold text-[#4da6ff] uppercase tracking-wider mb-4">{item.title}</h3>
                    <p className="text-[15px] font-normal text-gray-300 leading-relaxed max-w-xs mx-auto md:mx-0">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. STATS ─── */}
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
            {stats.map((stat, i) => (
              <FadeIn key={stat.value} delay={0.1 + i * 0.2}>
                <div className="mb-2 inline-block">
                  <GradientText colors={["#5227FF", "#FF9FFC", "#B19EEF"]} animationSpeed={8} showBorder={false} className="text-6xl md:text-7xl font-semibold">
                    {stat.value}
                  </GradientText>
                </div>
                <div className="text-xl text-gray-400 font-medium">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. SEE IT IN ACTION ─── */}
      <section className="py-32 px-8 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <FadeIn>
            <div className="mb-5">
              <ShinyText text="✦ LIVE DEMOS" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[40px] font-bold leading-normal mb-4 capitalize">See it in action</h2>
            <p className="text-[15px] font-normal opacity-60 max-w-lg mx-auto">
              Real outputs — generated, localised, and scaled using structured IP workflows.
            </p>
          </FadeIn>
        </div>

        <div className="w-full">
          <Swiper
            spaceBetween={20}
            slidesPerView="auto"
            loop={true}
            centeredSlides={false}
            modules={[Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="w-full"
            style={{ paddingLeft: "40px", paddingRight: "40px" }}
          >
            {[...videoCardItems, ...videoCardItems].map((item, idx) => (
              <SwiperSlide
                key={idx}
                style={{
                  width: item.aspect === "portrait" ? "260px" : "420px",
                  height: "auto",
                  display: "flex",
                  flexShrink: 0,
                }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden group flex-shrink-0 w-full border border-[#26afff]/20 hover:border-[#26afff]/60 transition-all duration-300"
                  style={{ height: item.aspect === "portrait" ? "462px" : "236px" }}
                >
                  {/* Thumbnail */}
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
                  <div className="absolute inset-0 bg-[#26afff]/0 group-hover:bg-[#26afff]/8 transition-colors duration-300" />

                  {/* ── TOP: Campaign title + channel icons ── */}
                  <div className="absolute top-0 left-0 right-0 p-3 flex items-start justify-between gap-2">
                    <p className="text-white text-[12px] font-semibold leading-snug drop-shadow-lg max-w-[70%]">{item.title}</p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {item.channels.map(ch => (
                        <span key={ch} className="text-[#26afff] bg-black/60 border border-[#26afff]/30 rounded-md p-1 backdrop-blur-sm">
                          <ChannelIcon ch={ch} />
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ── CENTER: Play button ── */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-[#26afff]/20 border border-[#26afff]/60 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#26afff]/40 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-4 h-4 text-[#26afff] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* ── BOTTOM: Client + format tag ── */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between gap-2">
                    <p className="text-gray-300 text-[11px] font-medium truncate">{item.client}</p>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#26afff] bg-black/60 border border-[#26afff]/40 rounded px-1.5 py-0.5 backdrop-blur-sm flex-shrink-0">{item.tag}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ─── 6. TWO SYSTEMS ─── */}
      <section id="products" className="py-32 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-5 flex justify-center">
              <ShinyText text="✦ OUR PRODUCTS" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[50px] font-medium leading-[1.1] tracking-tight text-white mb-6 text-center">
              Two systems. <span className="text-[#26afff] font-light">One</span> controlled workflow.
            </h2>
            <p className="text-[15px] font-normal opacity-60 max-w-xl mx-auto mb-20 text-center">
              Prelight STUDIO generates content from your IP library. Prelight SCORE monitors how it&apos;s used out in the world.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* STUDIO Card */}
            <FadeIn delay={0.2}>
              <div className="flex flex-col h-full bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:bg-white/[0.04]">
                <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#26afff]/10 to-transparent flex items-center justify-center border-b border-white/5">
                  <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" fill className="object-cover opacity-30 mix-blend-overlay" alt="Studio Background" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-80" />
                  <Image src="/studio.png" alt="Prelight Studio" width={80} height={80} className="relative z-10 object-contain" />
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 mt-2 text-[11px] font-bold uppercase tracking-wider text-prelight-black bg-[#26afff] rounded-[4px]">Create</span>
                  </div>
                  <h3 className="text-[32px] font-bold text-[#26afff] mb-4">prelight STUDIO</h3>
                  <p className="text-[16px] text-gray-300 font-normal opacity-80 mb-10 leading-relaxed">
                    Generate high-quality, on-brand content at scale using your private IP library.
                  </p>
                  <ul className="space-y-4 mt-auto">
                    {["Script to image to video workflows", "Brand-safe generation", "Multi-language output (70+)"].map(text => (
                      <li key={text} className="flex items-center gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#26afff]">
                          <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-gray-300 text-[15px] font-medium">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* SCORE Card */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col h-full bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:bg-white/[0.04]">
                <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#b961ee]/10 to-transparent flex items-center justify-center border-b border-white/5">
                  <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" fill className="object-cover opacity-20 mix-blend-screen" alt="Score Background" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-80" />
                  <Image src="/score.png" alt="Prelight Score" width={80} height={80} className="relative z-10 object-contain" />
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 mt-2 text-[11px] font-bold uppercase tracking-wider text-white bg-[#b961ee] rounded-[4px]">Monitor &amp; Protect</span>
                  </div>
                  <h3 className="text-[32px] font-bold text-[#b961ee] mb-4">prelight SCORE</h3>
                  <p className="text-[16px] text-gray-300 font-normal opacity-80 mb-10 leading-relaxed">
                    Understand how your IP is used across AI systems and manage risk.
                  </p>
                  <ul className="space-y-4 mt-auto">
                    {["IP usage detection", "Risk and compliance analysis", "Ongoing monitoring"].map(text => (
                      <li key={text} className="flex items-center gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#b961ee]">
                          <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-gray-300 text-[15px] font-medium">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── 7. CAPABILITIES ─── */}
      <section className="py-20 px-8 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-prelight-purple/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <div className="mb-4 flex justify-center">
              <ShinyText text="✦ CAPABILITIES" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[40px] font-medium leading-[1.1] tracking-tight text-white mb-4 text-center">
              What you <span className="text-[#26afff] font-light">unlock</span> with Prelight
            </h2>
            <p className="text-[15px] font-normal opacity-60 max-w-xl mx-auto mb-12 text-center">
              A complete stack of capabilities that makes your IP the engine behind every piece of content you produce.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: <Network className="w-5 h-5 text-[#b961ee] flex-shrink-0" strokeWidth={1.5} />, title: "Unified IP Architecture", desc: "Turn your creative DNA into a searchable, intelligent database — stop digging through folders." },
              { icon: <ShieldCheck className="w-5 h-5 text-[#26afff] flex-shrink-0" strokeWidth={1.5} />, title: "Automated Brand Guardrails", desc: "Every image, video, and script is mathematically aligned with your brand identity from day one." },
              { icon: <Zap className="w-5 h-5 text-[#26afff] flex-shrink-0" strokeWidth={1.5} />, title: "Linear Cost Scaling", desc: "Multiply your content output 10x–100x without hiring a massive production team." },
              { icon: <Lock className="w-5 h-5 text-[#b961ee] flex-shrink-0" strokeWidth={1.5} />, title: "Sovereign Asset Control", desc: "100% ownership of inputs and outputs. Your data is never used to train public models." },
              { icon: <Globe className="w-5 h-5 text-[#26afff] flex-shrink-0" strokeWidth={1.5} />, title: "Native Global Reach", desc: "Localise brand voice and visual nuances across 70+ languages instantly." },
              { icon: <FileCheck className="w-5 h-5 text-[#b961ee] flex-shrink-0" strokeWidth={1.5} />, title: "Rigorous Compliance", desc: "Ensure all generated content meets legal, ethical, and internal standards before it goes live." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-5 rounded-xl border border-white/8 bg-white/[0.02] hover:border-[#26afff]/30 hover:bg-white/[0.04] transition-all duration-300 group">
                  <div className="mt-0.5 w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#26afff]/10 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-[13px] text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. TRUST STRIP ─── */}
      <section className="py-12 border-y border-white/10 bg-[#05050a] overflow-hidden flex group" aria-label="Trust commitments">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[0, 1].map(setIdx => (
            <div key={setIdx} className="flex gap-16 px-8 items-center text-gray-500 font-semibold uppercase tracking-wider text-[30px]" aria-hidden={setIdx === 1}>
              {trustItems.map(item => (
                <span key={item.text} className="flex items-center gap-4 cursor-default whitespace-nowrap flex-shrink-0 group-hover:opacity-100 transition-opacity">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                  <span className="bg-gradient-to-r from-[#26afff] to-[#b961ee] bg-clip-text text-transparent">{item.text}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── 9. PARTNERS ─── */}
      <section id="partners" className="py-24 px-8 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <div className="mb-5">
              <ShinyText text="✦ OUR NETWORK" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[12px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[40px] font-bold leading-normal mb-4">Elevated Partnerships.</h2>
            <p className="text-[15px] font-normal opacity-60 max-w-md mx-auto mb-16 leading-relaxed">
              Trusted by studios, brands, and agencies pushing the frontier of IP-powered content at scale.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
              {partners.map(logo => (
                <div key={logo.src} className="flex items-center justify-center transition-all duration-300 opacity-40 hover:opacity-100 group">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={80}
                    className="h-20 w-auto object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 10. WHY PRELIGHT EXISTS ─── */}
      <section className="relative py-32 px-8 bg-black overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
          <div style={{ width: "700px", height: "700px" }}>
            <MagicRings color="#26afff" colorTwo="#b961ee" speed={0.6} ringCount={6} attenuation={12} lineThickness={2.5} baseRadius={0.3} radiusStep={0.08} scaleRate={0.08} opacity={0.9} blur={0} noiseAmount={0.05} rotation={0} ringGap={1.6} followMouse={false} clickBurst={false} />
          </div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="mb-6">
              <ShinyText text="✦ WHY PRELIGHT EXISTS" speed={3} delay={0} color="#26afff" shineColor="#ffffff" spread={100} direction="left" className="text-[13px] font-bold tracking-[0.25em] uppercase" />
            </div>
            <h2 className="text-[48px] md:text-[56px] font-bold leading-[1.1] tracking-tight text-white mb-8">
              Generative AI is changing how content is created but it removes control from{" "}
              <span className="italic font-extrabold">IP owners</span>.
            </h2>
            <p className="text-[17px] text-gray-400 font-normal max-w-xl mx-auto leading-relaxed">
              We believe you should be able to scale creativity without giving up ownership, consistency, or security. Prelight turns your IP into a system you can control — not just content you create.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── 11. CTA ─── */}
      <section className="py-20 px-8 bg-black">
        <FadeIn>
          <div className="relative max-w-5xl mx-auto rounded-[20px] overflow-hidden" style={{ minHeight: "440px" }}>
            <div className="absolute inset-0 rounded-[20px] overflow-hidden">
              <Grainient color1="#FF9FFC" color2="#5227FF" color3="#B19EEF" timeSpeed={0.25} colorBalance={0} warpStrength={1} warpFrequency={5} warpSpeed={2} warpAmplitude={50} blendAngle={0} blendSoftness={0.05} rotationAmount={500} noiseScale={2} grainAmount={0.1} grainScale={2} grainAnimated={false} contrast={1.5} gamma={1} saturation={1} centerX={0} centerY={0} zoom={0.9} />
            </div>
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center py-[50px] px-8 h-full" style={{ minHeight: "440px" }}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60 mb-6">Ready to take control?</p>
              <h2 className="text-[48px] md:text-[60px] font-bold leading-[1.05] tracking-tight text-white mb-6 max-w-[700px]">
                See what your workflow could look like in 4–6 weeks
              </h2>
              <p className="text-[18px] text-white/70 font-normal max-w-[480px] mb-12 leading-relaxed">
                Book a pilot with your team. We&apos;ll map your IP, run a content sprint, and show you real results.
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-black font-bold text-[16px] hover:bg-white/90 transition-all duration-200 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                Request a Demo
                <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── FOOTER ─── */}
      <footer id="contact" className="py-10 px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="text-xl font-semibold flex items-center gap-2">
            <Image src="/logo.png" alt="Prelight Logo" width={30} height={30} className="object-contain" />
            prelight
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {[
              {
                label: "Instagram",
                href: "https://www.instagram.com/prelight.studio/",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
                  </svg>
                ),
              },
              {
                label: "YouTube",
                href: "https://youtube.com/@prelight",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                  </svg>
                ),
              },
              {
                label: "TikTok",
                href: "#",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M19.6 3.4A5.5 5.5 0 0 1 14.1 0h-3.8v15.6a2.6 2.6 0 1 1-1.8-2.5V9.2a6.4 6.4 0 1 0 5.6 6.4V8.1a9.3 9.3 0 0 0 5.4 1.7V6a5.5 5.5 0 0 1-1-.6z"/>
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/prelight-ai/posts/?feedView=all",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.5v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.4H3.5V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.5C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.7C24 .8 23.2 0 22.2 0z"/>
                  </svg>
                ),
              },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href === "#" ? undefined : "_blank"}
                rel={href === "#" ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Email + credit */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <a href="mailto:hello@prelight.ai" className="text-prelight-blue hover:text-white transition-colors font-medium text-sm">
              hello@prelight.ai
            </a>
            <span className="text-white/20 hidden md:inline">·</span>
            <a href="https://webasi.co" target="_blank" rel="noopener noreferrer" className="text-[12px] text-gray-500 hover:text-white transition-colors tracking-wide">
              design by <span className="font-bold text-gray-300">WEBASI</span>
            </a>
          </div>
        </div>
      </footer>

      {/* ─── MODAL ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Request a Pilot"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0a0a1a] border border-white/10 p-8 rounded-2xl max-w-md w-full relative"
            >
              <button onClick={closeModal} className="absolute top-4 right-6 text-gray-400 hover:text-white text-2xl" aria-label="Close dialog">
                &times;
              </button>
              <h3 className="text-[40px] font-bold leading-normal mb-2">Request a Pilot</h3>
              <p className="text-[15px] font-normal opacity-80 mb-8">Enter your details to measure real production impact.</p>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
                <div>
                  <label htmlFor="demo-email" className="block text-sm font-medium text-gray-400 mb-1">Work Email</label>
                  <input id="demo-email" type="email" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-prelight-blue" />
                </div>
                <div>
                  <label htmlFor="demo-company" className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                  <input id="demo-company" type="text" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-prelight-blue" />
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