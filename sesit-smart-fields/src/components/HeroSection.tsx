import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Sprout, Wifi } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useTranslation } from "react-i18next";
import sesitIcon from "@/assets/sesitICON.jpg";
import hydro1 from "@/assets/hydro1.mp4";
import hydro3 from "@/assets/hydro3.mp4";
import hydro5 from "@/assets/hydro5.mp4";

/* 3 background videos instead of 5 — reduces initial bandwidth by ~8 MB */
const bgVideos = [hydro1, hydro3, hydro5];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-bold gradient-text">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

const HeroSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();

  const stats = [
    { value: 12, suffix: "+", label: t("hero.hectares") },
    { value: 40, suffix: "%", label: t("hero.water") },
  ];

  /* Delay video loading by 1.5 s so page content paints first */
  useEffect(() => {
    const timer = setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;
      video.src = bgVideos[0];
      video.load();
      video.play().catch(() => {});
      setVideoReady(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  /* Cycle to next video only after the first one is ready */
  useEffect(() => {
    if (!videoReady || currentVideo === 0) return;
    const video = videoRef.current;
    if (!video) return;
    video.src = bgVideos[currentVideo];
    video.load();
    video.play().catch(() => {});
  }, [currentVideo, videoReady]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background video — preload="none" until delay fires */}
      <div className="absolute inset-0 z-[0]">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="none"
          onEnded={() => setCurrentVideo((prev) => (prev + 1) % bgVideos.length)}
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0 z-[1]">
        <ParticlesBackground id="hero-particles" />
      </div>

      <div className="section-container relative z-[2] pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Copy */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div {...fade(0)}>
              <span className="label-text inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              {...fade(0.08)}
              className="display-text text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6 text-foreground"
            >
              {t("hero.title1")}{" "}
              <br className="hidden sm:block" />
              {t("hero.title2")}{" "}
              <span className="gradient-text">{t("hero.titleHighlight")}</span>
            </motion.h1>

            <motion.p
              {...fade(0.16)}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div {...fade(0.24)} className="flex flex-wrap gap-3 mb-14">
              <Button size="lg" className="btn-glow" asChild>
                <a href="#telma">
                  {t("hero.discoverTelma")} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-border/60 hover:border-primary/40 hover:bg-primary/5" asChild>
                <Link to="/agroself">
                  {t("hero.requestDemo")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div {...fade(0.32)}>
              <div className="border-t border-border/40 pt-8 flex flex-wrap gap-8 sm:gap-14 justify-center lg:justify-start mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="min-w-[90px] flex flex-col items-center lg:items-start">
                    <Counter target={stat.value} suffix={stat.suffix} />
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — SESIT solutions card (replaces heavy logo3D video) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Ambient glow */}
              <div className="absolute inset-0 -m-12 rounded-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl pointer-events-none" />

              {/* Glass card */}
              <div className="relative z-[1] rounded-3xl border border-border/30 bg-card/40 backdrop-blur-sm overflow-hidden shadow-2xl">
                {/* Logo */}
                <div className="flex items-center justify-center py-8 border-b border-border/20 bg-gradient-to-b from-primary/5 to-transparent">
                  <img
                    src={sesitIcon}
                    alt="SESIT"
                    className="w-20 h-20 rounded-2xl object-contain shadow-lg"
                  />
                </div>

                {/* Solutions list */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Wifi className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">TELMA</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        Smart autonomous irrigation &amp; IoT field sensing
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Sprout className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">AgroSelf</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        Intelligent soilless farming powered by AI
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/30">
                    <Cpu className="w-4 h-4 text-primary flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Driven by <span className="text-primary font-medium">Digital Intelligence</span> — IoT · AI · Precision Sensing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
