import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Droplets,
  Leaf,
  Wifi,
  Cpu,
  Sprout,
  FlaskConical,
  Sun,
  ExternalLink,
  Users,
  Microscope,
  Lightbulb,
  MousePointerClick,
} from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import LazyVideo from "@/components/LazyVideo";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import hydroponicsImg from "@/assets/agroselfContent/hydroponics.jpg";
import waterVideo from "@/assets/hydro4.mp4";
import aiIotVideo from "@/assets/agroselfContent/AI & iot.mp4";
import laboVideo from "@/assets/agroselfContent/labo.mp4";
import sustainableVideo from "@/assets/agroselfContent/sustainable.mp4";
import buildImg2 from "@/assets/agroSelf/5whLLhFd.jpg";
import buildImg3 from "@/assets/agroSelf/E4jdxXQF.jpg";
import buildImg4 from "@/assets/agroSelf/Vq5NZZiQ.jpg";
import buildImg5 from "@/assets/agroSelf/hZN1MK5I.jpg";
import agro2Img from "@/assets/agroSelf/agro2.jpeg";
import agro4Img from "@/assets/agroSelf/agro4.jpeg";
import agro5Img from "@/assets/agroSelf/agro5.jpeg";
import conceptionVideo from "@/assets/agroSelf/Conception Serre Intelligente AgroSelf.mp4";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
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

const AgroSelfPage = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeStep, setActiveStep] = useState<string | null>("building");

  const pillars = [
    {
      icon: Sprout,
      media: { type: "image" as const, src: hydroponicsImg },
      title: t("agroself.p1t"),
      subtitle: t("agroself.p1s"),
      description: t("agroself.p1d"),
      highlights: [t("agroself.p1h1"), t("agroself.p1h2"), t("agroself.p1h3"), t("agroself.p1h4")],
    },
    {
      icon: Droplets,
      media: { type: "video" as const, src: waterVideo },
      title: t("agroself.p2t"),
      subtitle: t("agroself.p2s"),
      description: t("agroself.p2d"),
      highlights: [t("agroself.p2h1"), t("agroself.p2h2"), t("agroself.p2h3"), t("agroself.p2h4")],
    },
    {
      icon: Cpu,
      media: { type: "video" as const, src: aiIotVideo },
      title: t("agroself.p3t"),
      subtitle: t("agroself.p3s"),
      description: t("agroself.p3d"),
      highlights: [t("agroself.p3h1"), t("agroself.p3h2"), t("agroself.p3h3"), t("agroself.p3h4")],
    },
    {
      icon: FlaskConical,
      media: { type: "video" as const, src: laboVideo },
      title: t("agroself.p4t"),
      subtitle: t("agroself.p4s"),
      description: t("agroself.p4d"),
      highlights: [t("agroself.p4h1"), t("agroself.p4h2"), t("agroself.p4h3"), t("agroself.p4h4")],
    },
    {
      icon: Sun,
      media: { type: "video" as const, src: sustainableVideo },
      title: t("agroself.p5t"),
      subtitle: t("agroself.p5s"),
      description: t("agroself.p5d"),
      highlights: [t("agroself.p5h1"), t("agroself.p5h2"), t("agroself.p5h3"), t("agroself.p5h4")],
    },
  ];

  const projectCapabilities = [
    { icon: Wifi,       title: t("agroself.pc1t"), desc: t("agroself.pc1d") },
    { icon: Cpu,        title: t("agroself.pc2t"), desc: t("agroself.pc2d") },
    { icon: Microscope, title: t("agroself.pc3t"), desc: t("agroself.pc3d") },
    { icon: Users,      title: t("agroself.pc4t"), desc: t("agroself.pc4d") },
  ];

  const visionItems = [
    { icon: Lightbulb,  title: t("agroself.v1t"), description: t("agroself.v1d") },
    { icon: Microscope, title: t("agroself.v2t"), description: t("agroself.v2d") },
    { icon: Leaf,       title: t("agroself.v3t"), description: t("agroself.v3d") },
  ];

  const progressSteps = [
    { label: t("agroself.step1"), status: "done",     key: "research" },
    { label: t("agroself.step2"), status: "done",     key: "prototyping" },
    { label: t("agroself.step3"), status: "active",   key: "building" },
    { label: t("agroself.step4"), status: "upcoming", key: "deployment" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute inset-0 z-[1]">
          <ParticlesBackground id="agroself-page-particles" />
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
              {t("agroself.badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              {t("agroself.heroTitle")} <span className="gradient-text">AgroSelf</span> {t("agroself.heroProject")}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-5">
              {t("agroself.heroDesc1")}
            </p>
            <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-xl mx-auto mb-10">
              {t("agroself.heroDesc2")}
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 enterprise-card p-6 sm:p-8 max-w-2xl mx-auto mb-8">
              {[
                { value: "90%",  label: t("agroself.s1") },
                { value: "0",    label: t("agroself.s2") },
                { value: "365",  label: t("agroself.s3") },
                { value: "100%", label: t("agroself.s4") },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <span className="text-2xl sm:text-3xl font-bold gradient-text">{s.value}</span>
                  <div className="w-8 h-px bg-border/60 mx-auto my-2" />
                  <p className="text-xs text-muted-foreground font-medium tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── About AgroSelf ───────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-y border-border/40">
        <div className="section-container">
          <motion.div {...fade()} className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {t("agroself.aboutTitle")} <span className="gradient-text">AgroSelf</span>?
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ── Vision Cards ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <motion.div {...fade()} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {t("agroself.guidingTitle")} <span className="gradient-text">{t("agroself.guidingHighlight")}</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              {t("agroself.guidingSub")}
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {visionItems.map((item, i) => (
              <motion.div
                key={item.title}
                {...fade(0.1 + i * 0.1)}
                className="glass-card p-6 sm:p-8 text-center group hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project In Progress ──────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-secondary/20">
        <div className="section-container">
          <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-xs font-semibold tracking-wider uppercase mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
              {t("agroself.wipBadge")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              {t("agroself.wipTitle")} <span className="gradient-text">{t("agroself.wipHighlight")}</span>{t("agroself.wipSuffix") ? `, ${t("agroself.wipSuffix")}` : ""}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{t("agroself.wipDesc")}</p>
          </motion.div>

          {/* Clickable hint */}
          <motion.p
            {...fade(0.02)}
            className="text-center text-sm text-muted-foreground/70 mb-8 flex items-center justify-center gap-2"
          >
            <MousePointerClick className="w-4 h-4" />
            {t("agroself.clickHint")}
          </motion.p>

          {/* Progress Timeline Steps */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 mb-10">
            {progressSteps.map((step, i, arr) => (
              <div key={step.key} className="flex items-center">
                <button
                  onClick={() => {
                    if (step.status === "done" || step.status === "active") {
                      setActiveStep(activeStep === step.key ? null : step.key);
                    }
                  }}
                  className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                    step.status !== "upcoming"
                      ? "cursor-pointer hover:scale-110"
                      : "cursor-default opacity-60"
                  } ${activeStep === step.key ? "scale-110" : ""}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      activeStep === step.key
                        ? "ring-4 ring-primary/30 bg-primary text-primary-foreground scale-110"
                        : step.status === "done"
                        ? "bg-primary text-primary-foreground"
                        : step.status === "active"
                        ? "bg-amber-500 text-white animate-pulse"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.status === "done" ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors duration-300 ${
                      activeStep === step.key
                        ? "text-primary font-semibold"
                        : step.status === "active"
                        ? "text-amber-600"
                        : step.status === "done"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
                {i < arr.length - 1 && (
                  <div
                    className={`hidden sm:block w-16 lg:w-24 h-0.5 mx-3 ${
                      step.status === "done" ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Content panels */}
          <AnimatePresence mode="wait">
            {activeStep === "prototyping" && (
              <motion.div
                key="prototyping"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <div className="enterprise-card overflow-hidden rounded-2xl">
                  <div className="p-5 border-b border-border/40">
                    <h3 className="text-lg font-semibold">{t("agroself.conceptionTitle")}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t("agroself.conceptionDesc")}</p>
                  </div>
                  <LazyVideo src={conceptionVideo} controls rootMargin="100px" className="w-full h-auto" />
                </div>
              </motion.div>
            )}

            {activeStep === "building" && (
              <motion.div
                key="building"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="enterprise-card overflow-hidden rounded-2xl p-5 mb-4">
                  <h3 className="text-lg font-semibold">{t("agroself.constructionTitle")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t("agroself.constructionDesc")}</p>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <div className="carousel-track">
                    {[buildImg2, buildImg3, buildImg4, buildImg5, agro2Img, agro4Img, agro5Img,
                      buildImg2, buildImg3, buildImg4, buildImg5, agro2Img, agro4Img, agro5Img,
                    ].map((src, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 w-72 sm:w-80 lg:w-96 h-56 sm:h-64 lg:h-72 mx-2 rounded-2xl overflow-hidden border border-border/30 bg-card shadow-sm"
                      >
                        <img src={src} alt={t("agroself.constructionAlt")} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Pillar Sections ──────────────────────────────────────── */}
      {pillars.map((pillar, idx) => {
        const isReversed = idx % 2 !== 0;
        return (
          <section
            key={pillar.title}
            className={`py-20 lg:py-28 ${idx % 2 === 0 ? "" : "bg-secondary/20"}`}
          >
            <div className="section-container">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start ${isReversed ? "lg:direction-rtl" : ""}`}>
                {/* Media card */}
                <motion.div {...fade()} className={`${isReversed ? "lg:order-2" : ""}`}>
                  <div className="glass-card overflow-hidden rounded-2xl h-64 sm:h-80 lg:h-[520px]">
                    {pillar.media.type === "video" ? (
                      <LazyVideo
                        src={pillar.media.src}
                        rootMargin="200px"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={pillar.media.src}
                        alt={pillar.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div {...fade(0.1)} className={`${isReversed ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                      <pillar.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                      {pillar.subtitle}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground">{pillar.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{pillar.description}</p>
                  <ul className="space-y-3">
                    {pillar.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-muted-foreground">
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

      {/* ── SESIT × AgroSelf ────────────────────────────────────── */}
      <section className="py-20 lg:py-28 border-t border-border/40">
        <div className="section-container">
          <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-xs font-medium tracking-wider uppercase inline-flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              {t("agroself.expertiseLabel")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 mb-4">
              {t("agroself.expertiseTitle").includes("SESIT") ? (
                <>How <span className="gradient-text">SESIT</span> Drives AgroSelf</>
              ) : (
                <>{t("agroself.expertiseTitle")}</>
              )}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{t("agroself.expertiseSub")}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectCapabilities.map((point, i) => (
              <motion.div
                key={point.title}
                {...fade(0.1 + i * 0.08)}
                className="glass-card p-6 text-center group hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <motion.div {...fade()} className="enterprise-card p-10 sm:p-14 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              {t("agroself.ctaTitle")} <span className="gradient-text">AgroSelf</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {t("agroself.ctaDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <a href="https://agroself.tn/" target="_blank" rel="noopener noreferrer">
                  {t("agroself.visitBtn")} <ExternalLink className="ml-2 h-4 w-4" />
                </a>
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

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="border-t border-border/50 bg-background py-10">
        <div className="section-container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sesit. {t("agroself.copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AgroSelfPage;
