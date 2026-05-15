import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  Brain,
  BarChart3,
  Wifi,
  AlertTriangle,
  Cpu,
  Smartphone,
  Zap,
  Network,
} from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import LazyVideo from "@/components/LazyVideo";
import { useTranslation } from "react-i18next";
import telmaVideo from "@/assets/telma.mp4";
import connectedNodeVideo from "@/assets/connectedNode.mp4";
import obstructionVideo from "@/assets/obstruction.mp4";
import leakVideo from "@/assets/Leak.mp4";
import iotSystemVideo from "@/assets/IOTSystem.mp4";

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const TelmaPage = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const capabilities = [
    {
      video: iotSystemVideo,
      title: t("telma.c1t"),
      subtitle: t("telma.c1s"),
      icon: Wifi,
      description: t("telma.c1d"),
      highlights: [t("telma.c1h1"), t("telma.c1h2"), t("telma.c1h3"), t("telma.c1h4")],
    },
    {
      video: connectedNodeVideo,
      title: t("telma.c2t"),
      subtitle: t("telma.c2s"),
      icon: Network,
      description: t("telma.c2d"),
      highlights: [t("telma.c2h1"), t("telma.c2h2"), t("telma.c2h3"), t("telma.c2h4")],
    },
    {
      video: telmaVideo,
      title: t("telma.c3t"),
      subtitle: t("telma.c3s"),
      icon: Droplets,
      description: t("telma.c3d"),
      highlights: [t("telma.c3h1"), t("telma.c3h2"), t("telma.c3h3"), t("telma.c3h4")],
    },
    {
      video: leakVideo,
      title: t("telma.c4t"),
      subtitle: t("telma.c4s"),
      icon: AlertTriangle,
      description: t("telma.c4d"),
      highlights: [t("telma.c4h1"), t("telma.c4h2"), t("telma.c4h3"), t("telma.c4h4")],
    },
    {
      video: obstructionVideo,
      title: t("telma.c5t"),
      subtitle: t("telma.c5s"),
      icon: BarChart3,
      description: t("telma.c5d"),
      highlights: [t("telma.c5h1"), t("telma.c5h2"), t("telma.c5h3"), t("telma.c5h4")],
    },
  ];

  const pipelineSteps = [
    { icon: Wifi,        label: t("telma.p1"), desc: t("telma.p1d") },
    { icon: Cpu,         label: t("telma.p2"), desc: t("telma.p2d") },
    { icon: Brain,       label: t("telma.p3"), desc: t("telma.p3d") },
    { icon: Zap,         label: t("telma.p4"), desc: t("telma.p4d") },
    { icon: Smartphone,  label: t("telma.p5"), desc: t("telma.p5d") },
  ];

  const stats = [
    { value: "40%",  label: t("telma.statWater") },
    { value: "25%",  label: t("telma.statYield") },
    { value: "30%",  label: t("telma.statCost") },
    { value: "<2s",  label: t("telma.statResponse") },
  ];

  return (
  <div className="min-h-screen bg-background">
    <Header />

    {/* ── Hero ────────────────────────────────────────────────────── */}
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0">
        <LazyVideo
          src={telmaVideo}
          rootMargin="0px"
          className="w-full h-full object-cover opacity-[0.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
      </div>
      <div className="absolute inset-0 z-[1]">
        <ParticlesBackground id="telma-page-particles" />
      </div>

      <div className="section-container relative z-10">
        <motion.div {...fade()} className="max-w-3xl mx-auto text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {t("nav.backToHome")}
          </a>

          <span className="block text-primary text-xs font-medium tracking-wider uppercase mb-3">
            {t("telma.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            <span className="gradient-text">TELMA</span> Platform
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            {t("telma.heroDesc")}
          </p>

          {/* Stats bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 enterprise-card p-6 sm:p-8 max-w-2xl mx-auto mb-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <span className="text-2xl sm:text-3xl font-bold gradient-text">
                  {s.value}
                </span>
                <div className="w-8 h-px bg-border/60 mx-auto my-2" />
                <p className="text-xs text-muted-foreground font-medium tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Intelligence Pipeline ───────────────────────────────────── */}
    <section className="py-16 lg:py-20 border-y border-border/40">
      <div className="section-container">
        <motion.div {...fade()} className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            {t("telma.pipelineTitle")}
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {t("telma.pipelineSub")}
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
          {pipelineSteps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.div
                {...fade(0.06 * i)}
                className="enterprise-card p-5 text-center min-w-[140px] hover:border-primary/40 transition-colors duration-300 relative"
              >
                <span className="absolute top-3 right-3 text-[10px] font-mono text-muted-foreground/40 font-medium">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-10 h-10 rounded-lg bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center mx-auto mb-3">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold text-sm text-foreground">
                  {step.label}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
              </motion.div>
              {i < pipelineSteps.length - 1 && (
                <div className="hidden sm:flex items-center mx-2 text-muted-foreground/25">
                  <div className="w-6 border-t border-dashed border-current" />
                  <ArrowRight className="h-3.5 w-3.5 -ml-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Capability Sections ─────────────────────────────────────── */}
    {capabilities.map((cap, idx) => {
      const isReversed = idx % 2 !== 0;
      return (
        <section
          key={cap.title}
          className={`py-20 lg:py-28 border-t border-border/20 ${idx % 2 === 0 ? "" : "bg-secondary/20"}`}
        >
          <div className="section-container">
            <div
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                isReversed ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Video */}
              <motion.div
                {...fade()}
                className={`${isReversed ? "lg:order-2" : ""}`}
              >
                <div className="enterprise-card overflow-hidden rounded-2xl">
                  <LazyVideo
                    src={cap.video}
                    rootMargin="100px"
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                {...fade(0.1)}
                className={`${isReversed ? "lg:order-1" : ""}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                    <cap.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                    {cap.subtitle}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                  {cap.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {cap.description}
                </p>

                <ul className="space-y-3">
                  {cap.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      );
    })}

    {/* ── CTA ──────────────────────────────────────────────────────── */}
    <section className="py-20 lg:py-28">
      <div className="section-container">
        <motion.div
          {...fade()}
          className="enterprise-card p-10 sm:p-14 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {t("telma.ctaTitle")} <span className="gradient-text">TELMA</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            {t("telma.ctaDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => { window.location.href = "/#contact"; }}>
              {t("telma.requestDemo")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t("nav.backToHome")}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Footer ──────────────────────────────────────────────────── */}
    <footer className="border-t border-border/50 bg-background py-10">
      <div className="section-container text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sesit. {t("telma.copyright")}
        </p>
      </div>
    </footer>
  </div>
  );
};

export default TelmaPage;
