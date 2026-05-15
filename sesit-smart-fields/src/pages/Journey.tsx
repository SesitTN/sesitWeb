import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Mic,
  Award,
  Calendar,
  Sparkles,
  Star,
  Rocket,
  Volume2,
  VolumeX,
  ChevronDown,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "leaflet/dist/leaflet.css";
import logo3D from "@/assets/logo3D.mp4";
import nasrPhoto from "@/assets/nasr.png";

/* ── Starti 4 photos ─────────────────────────────────────────────── */
import starti1 from "@/assets/start/473523317_628292589756008_1435684063355117722_n.jpg";
import starti2 from "@/assets/start/473568978_628292833089317_3874564223918618106_n.jpg";
import starti3 from "@/assets/start/473626631_628292609756006_6717167132993328654_n.jpg";
import starti4 from "@/assets/start/476612067_1119427626647435_8825174008648186832_n.jpg";
import machrou3kPhoto from "@/assets/machrou3k.jpg";

/* ── Partnership photos ───────────────────────────────────────────── */
import inatPhoto from "@/assets/inatP.jpg";
import novationPhoto from "@/assets/novation.jpg";

/* ── Jordan trip ────────────────────────────────────────────────── */
import jordan1 from "@/assets/jordan1.jpg";
import jordan2 from "@/assets/jordan2.jpg";
import agroSelfVideo from "@/assets/agroSelf/Conception Serre Intelligente AgroSelf.mp4";

/* ── Bari / CIHEAM ──────────────────────────────────────────────── */
import bariPhoto from "@/assets/Bari.jpg";
import ciheamLogo from "@/assets/ciheam.png";

/* ── OSIRRIS / TUNGER 2+2 ────────────────────────────────────────── */
import osirrisPresentation from "@/assets/ossiris/assiris1.jpg";
import osirrisGroup from "@/assets/ossiris/ossiris.jpg";

/* ── AgroSelf / WAVE Connect Sup'Com ────────────────────────────── */
import agroSWave1 from "@/assets/agroS/agroS1.jpg";
import agroSWave2 from "@/assets/agroS/agroS2.jpg";

/* ── Nefta oasis field trip ──────────────────────────────────────── */
import oasisBg from "@/assets/nefta/oasis.jpg";
import neftaPhoto1 from "@/assets/nefta/neft1.jpg";
import neftaPhoto2 from "@/assets/nefta/neft2.png";
import chanLogo from "@/assets/nefta/chan.svg";

/* ── Riyeda 13 event ─────────────────────────────────────────────── */
import riyeda1 from "@/assets/rieda/622383881_918726887379242_995187106280333185_n.jpg";
import riyeda2 from "@/assets/rieda/623677619_918726894045908_5493964683239245005_n.jpg";
import riyeda3 from "@/assets/rieda/624315300_918727080712556_5835876793712429067_n.jpg";
import riyedaLogo from "@/assets/rieda/Logo-riyeda-13-2026-blanc-1.svg";

/* ── Holland / PRIVA trip ────────────────────────────────────────── */
import holand1 from "@/assets/holand/WhatsApp Image 2026-02-17 at 11.21.18 AM.jpeg";
import holand2 from "@/assets/holand/WhatsApp Image 2026-02-17 at 11.26.02 AM.jpeg";
import holand3 from "@/assets/holand/WhatsApp Image 2026-02-17 at 11.26.04 AM.jpeg";
import holand4 from "@/assets/holand/WhatsApp Image 2026-02-17 at 11.26.16 AM.jpeg";
import holand5 from "@/assets/holand/holand1.jpeg";
import holand6 from "@/assets/holand/holand2.jpeg";
import holand8 from "@/assets/holand/holand 4.jpeg";
import holand9 from "@/assets/holand/holand5.jpeg";
import holand10 from "@/assets/holand/holand6.jpeg";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

/* ------------------------------------------------------------------ */
/*  NARC Jordan Map                                                    */
// NARC coordinates: National Agricultural Research Center, Baqa'a, Jordan
const NARC_COORDS: [number, number] = [32.0167, 35.7833];

const NARCMap = () => {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapDivRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapDivRef.current || mapInstanceRef.current) return;

      // Fix broken default marker icons (Vite asset pipeline issue)
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapDivRef.current, {
        center: NARC_COORDS,
        zoom: 13,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      L.marker(NARC_COORDS)
        .addTo(map)
        .bindPopup(
          `<div style="min-width:180px;font-family:sans-serif">
            <strong style="font-size:13px">🇯🇴 NARC Jordan</strong><br/>
            <span style="font-size:11px;color:#555">National Agricultural Research Center</span><br/>
            <span style="font-size:11px;color:#888">Baqa'a, Jordan</span>
          </div>`
        )
        .openPopup();

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapDivRef}
      style={{ width: "100%", height: "100%", borderRadius: "1rem" }}
    />
  );
};
/* ------------------------------------------------------------------ */



/* ------------------------------------------------------------------ */
/*  Phase type                                                         */
/* ------------------------------------------------------------------ */

type Phase = "intro" | "transitioning" | "done";

/* ================================================================== */
/*  CINEMATIC INTRO                                                    */
/* ================================================================== */

const CinematicIntro = ({
  onDone,
}: {
  onDone: () => void;
}) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [dominantColors, setDominantColors] = useState([
    { r: 10, g: 50, b: 120 },
    { r: 34, g: 211, b: 238 },
    { r: 16, g: 185, b: 129 },
  ]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});

    const maxTimer = setTimeout(() => setFading(true), 5000);
    const onEnd = () => setFading(true);
    video.addEventListener("ended", onEnd);
    return () => {
      clearTimeout(maxTimer);
      video.removeEventListener("ended", onEnd);
    };
  }, []);

  /* Color sampling */
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    canvas.width = 16;
    canvas.height = 16;

    const interval = setInterval(() => {
      if (video.paused || video.ended) return;
      ctx.drawImage(video, 0, 0, 16, 16);
      const data = ctx.getImageData(0, 0, 16, 16).data;
      const sample = (sx: number, sy: number) => {
        const i = (sy * 16 + sx) * 4;
        return { r: data[i], g: data[i + 1], b: data[i + 2] };
      };
      setDominantColors([sample(4, 4), sample(8, 8), sample(12, 12)]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  /* When fading starts, wait then call onDone */
  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [fading, onDone]);

  const handleToggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
    >
      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Reactive background — uses site dark + primary green glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(222 47% 8%) 0%, hsl(222 47% 11%) 50%, hsl(222 47% 9%) 100%)",
        }}
      >
        {dominantColors.map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${500 - i * 100}px`,
              height: `${500 - i * 100}px`,
              background: `radial-gradient(circle, rgba(${c.r},${c.g},${c.b},0.20) 0%, transparent 70%)`,
              top: i === 0 ? "15%" : i === 1 ? "40%" : "65%",
              left: i === 0 ? "10%" : i === 1 ? "45%" : "70%",
              filter: `blur(${60 - i * 10}px)`,
              transition: "background 0.4s ease",
            }}
            animate={{
              x: [0, 30 * (i % 2 === 0 ? 1 : -1), 0],
              y: [0, -20 * (i % 2 === 0 ? -1 : 1), 0],
              scale: [1, 1.12 + i * 0.04, 1],
            }}
            transition={{
              duration: 4 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Video */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 w-64 sm:w-80 md:w-96"
      >
        <video
          ref={videoRef}
          src={logo3D}
          muted
          autoPlay
          playsInline
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-white/50 text-sm tracking-widest uppercase"
      >
        {t("journey.ourJourney")}
      </motion.p>

      {/* Skip */}
      <button
        onClick={() => setFading(true)}
        className="absolute bottom-8 right-8 z-10 text-white/40 hover:text-white/70 text-xs tracking-wider uppercase transition-colors"
      >
        {t("journey.skip")}
      </button>

      {/* Sound toggle */}
      <button
        onClick={handleToggleSound}
        className="absolute bottom-8 left-8 z-10 text-white/40 hover:text-white/70 transition-colors"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>
    </motion.div>
  );
};

/* ================================================================== */
/*  SECTION 1 — The Origin (dark navy, frozen video bg)               */
/* ================================================================== */

const OriginSection = () => {
  const { t } = useTranslation();
  return (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">

    {/* ── Background layers ── */}

    {/* Logo3D video — slightly more visible for texture */}
    <video
      src={logo3D}
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-[0.07] pointer-events-none"
      style={{ filter: "blur(6px)" }}
    />

    {/* Grid pattern overlay */}
    <div className="absolute inset-0 grid-pattern opacity-[0.045] pointer-events-none" />

    {/* Primary green — top-left beacon */}
    <div
      className="absolute -top-32 -left-32 w-[900px] h-[900px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(161 78% 32% / 0.13) 0%, transparent 60%)",
        filter: "blur(90px)",
      }}
    />

    {/* Accent blue — bottom-right beacon */}
    <div
      className="absolute -bottom-32 -right-32 w-[800px] h-[800px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(220 91% 54% / 0.10) 0%, transparent 60%)",
        filter: "blur(100px)",
      }}
    />

    {/* Cyan — center focal glow */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(199 80% 44% / 0.06) 0%, transparent 65%)",
        filter: "blur(80px)",
      }}
    />

    {/* Top edge highlight — thin light band */}
    <div
      className="absolute top-0 inset-x-0 h-px pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, hsl(161 78% 45% / 0.4) 30%, hsl(199 80% 55% / 0.4) 70%, transparent 100%)",
      }}
    />

    {/* Bottom fade to next section */}
    <div
      className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
      style={{
        background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.6) 100%)",
      }}
    />

    <div className="section-container relative z-10 py-32 lg:py-40">
      {/* Back link */}
      <motion.div {...fade()}>
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {t("journey.backToHome")}
        </a>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <div>
          <motion.span
            {...fade(0.1)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-5 px-3 py-1.5 rounded-full border"
            style={{
              color: "hsl(161 78% 40%)",
              borderColor: "hsl(161 78% 40% / 0.25)",
              background: "hsl(161 78% 40% / 0.07)",
            }}
          >
            <Calendar className="w-3.5 h-3.5" /> {t("journey.founded")}
          </motion.span>

          <motion.h1
            {...fade(0.15)}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-foreground"
          >
            {t("journey.heroTitle").split("SESIT")[0]}
            <span className="gradient-text">SESIT</span>
            {t("journey.heroTitle").split("SESIT")[1]}
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6"
          >
            {t("journey.heroDesc")}
          </motion.p>

          <motion.p
            {...fade(0.25)}
            className="text-sm text-muted-foreground/60 italic mb-10"
          >
            {t("journey.heroTagline")}
          </motion.p>

          {/* Inline stats row */}
          <motion.div
            {...fade(0.3)}
            className="flex items-center gap-6"
          >
            {[
              { value: "2020", label: t("journey.statFounded") },
              { value: "3+",   label: t("journey.statProjects") },
              { value: "5+",   label: t("journey.statPartners") },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                <div>
                  <div
                    className="text-3xl font-bold gradient-text leading-none"
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 tracking-wide">
                    {s.label}
                  </div>
                </div>
                {i < 2 && (
                  <div className="h-8 w-px bg-border/60" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — founder card */}
        <motion.div {...fade(0.3)}>
          {/* Outer glow ring */}
          <div
            className="relative rounded-3xl p-px"
            style={{
              background:
                "linear-gradient(135deg, hsl(161 78% 40% / 0.35) 0%, hsl(199 80% 50% / 0.20) 50%, hsl(220 91% 54% / 0.15) 100%)",
            }}
          >
            <div
              className="rounded-3xl p-8"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--secondary) / 0.4) 100%)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Photo + name row */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8">
                {/* Photo with green ring */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden"
                    style={{
                      boxShadow:
                        "0 0 0 2px hsl(161 78% 40% / 0.4), 0 8px 32px hsl(161 78% 28% / 0.15)",
                    }}
                  >
                    <img
                      src={nasrPhoto}
                      alt="Nasreddine Somaali — Founder & CEO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Online dot */}
                  <div
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background"
                    style={{ background: "hsl(161 78% 45%)" }}
                  />
                </div>

                <div>
                  <span
                    className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2"
                    style={{
                      color: "hsl(161 78% 40%)",
                      background: "hsl(161 78% 40% / 0.10)",
                      border: "1px solid hsl(161 78% 40% / 0.20)",
                    }}
                  >
                    {t("journey.founderBadge")}
                  </span>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Nasreddine Somaali
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t("journey.founderBio")}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div
                className="w-full h-px mb-6"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(161 78% 40% / 0.3) 30%, hsl(199 80% 50% / 0.2) 70%, transparent)",
                }}
              />

              {/* Stats grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-8">
                {[
                  { label: t("journey.statFounded"), value: "2020" },
                  { label: t("journey.statProjects"), value: "3+" },
                  { label: t("journey.statPartners"), value: "5+" },
                ].map((s) => (
                  <div key={s.label} className="space-y-1">
                    <div className="text-2xl font-bold gradient-text">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex justify-center mt-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted-foreground/40"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </div>
  </section>
  );
};

/* ================================================================== */
/*  SECTION 2 — Starti 4 (warm gold / amber theme)                    */
/* ================================================================== */

const startiPhotos = [
  { src: starti4, alt: "SESIT award ceremony at Starti 4" },
  { src: starti1, alt: "SESIT team at Starti 4 event" },
  { src: starti2, alt: "SESIT presenting smart agritech at Starti 4" },
  { src: starti3, alt: "SESIT receiving the Starti 4 prize" },
];

const StartiSection = () => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Site-palette background — slightly lighter dark than section 1 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(222 47% 14%) 50%, hsl(222 47% 11%) 100%)",
        }}
      />

      {/* Primary green glow top-right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(161 78% 28% / 0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      {/* Accent blue glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(220 91% 54% / 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.span
              {...fade(0.05)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ color: "hsl(161 78% 45%)" }}
            >
              <Trophy className="w-4 h-4" /> {t("journey.startiLabel")}
            </motion.span>

            <motion.h2
              {...fade(0.1)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white"
            >
              {t("journey.startiTitle")}{" "}
              <span className="gradient-text">
                {t("journey.startiTitleHighlight")}
              </span>{" "}
              {t("journey.startiTitleSuffix")}
            </motion.h2>

            <motion.p
              {...fade(0.15)}
              className="text-base sm:text-lg text-white/60 leading-relaxed mb-6"
            >
              {t("journey.startiDesc")}
            </motion.p>

            <motion.div {...fade(0.2)} className="space-y-3 mb-8">
              {[
                t("journey.startiH1"),
                t("journey.startiH2"),
                t("journey.startiH3"),
                t("journey.startiH4"),
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <Star
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{ color: "hsl(161 78% 45%)" }}
                  />
                  <span className="text-sm text-white/70">{point}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              {...fade(0.25)}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border"
              style={{
                borderColor: "hsl(161 78% 28% / 0.4)",
                background: "hsl(161 78% 28% / 0.12)",
              }}
            >
              <Trophy className="w-5 h-5" style={{ color: "hsl(161 78% 45%)" }} />
              <span className="font-semibold text-sm" style={{ color: "hsl(161 78% 55%)" }}>
                {t("journey.startiBadge")}
              </span>
            </motion.div>
          </div>

          {/* Right — photo gallery */}
          <motion.div {...fade(0.2)} className="space-y-4">
            {/* Main photo */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              style={{ boxShadow: "0 0 0 1px hsl(161 78% 28% / 0.3)" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={startiPhotos[active].src}
                  alt={startiPhotos[active].alt}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
              {/* Gradient overlay on photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <span className="text-white/70 text-xs">
                  {active + 1} / {startiPhotos.length}
                </span>
                <div className="flex gap-1.5">
                  {startiPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === active
                          ? "w-4"
                          : "bg-white/30 hover:bg-white/60"
                      }`}
                      style={i === active ? { background: "hsl(161 78% 45%)" } : {}}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {startiPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative rounded-xl overflow-hidden aspect-square transition-all ${
                    i === active
                      ? "scale-[1.03] opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  style={i === active ? { boxShadow: "0 0 0 2px hsl(161 78% 45%)" } : {}}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ================================================================== */
/*  SECTION 2b — Mashrou3ek 1st Place                                 */
/* ================================================================== */

const Mashrou3ekSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(161 78% 28% / 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — photo */}
          <motion.div {...fade()} className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-border/30">
              <img
                src={machrou3kPhoto}
                alt="SESIT — 1st place, Mashrou3ek programme, Gouvernorat de l'Ariana"
                className="w-full h-auto object-contain"
              />
            </div>
            {/* Badge */}
            <div
              className="absolute -bottom-4 -right-4 px-4 py-2.5 rounded-xl border border-primary/25 text-sm font-semibold shadow-lg"
              style={{ background: "hsl(222 47% 11%)", color: "hsl(161 78% 55%)" }}
            >
              {t("journey.mashrou3kBadge")}
            </div>
          </motion.div>

          {/* Right — content */}
          <motion.div {...fade(0.1)} className="order-1 lg:order-2">
            <motion.span
              {...fade(0)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ color: "hsl(161 78% 45%)" }}
            >
              <Award className="w-4 h-4" /> {t("journey.mashrou3kLabel")}
            </motion.span>

            <motion.h2
              {...fade(0.1)}
              className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-6"
            >
              {t("journey.mashrou3kTitle")}{" "}
              <span className="gradient-text">{t("journey.mashrou3kTitleHighlight")}</span>{" "}
              {t("journey.mashrou3kTitleSuffix")}
            </motion.h2>

            <motion.p
              {...fade(0.15)}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              {t("journey.mashrou3kDesc")}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ================================================================== */
/*  SECTION 3 — INAT Partnership (bright bg)                          */
/* ================================================================== */

const INATSection = () => {
  const { t } = useTranslation();
  return (
  <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
    {/* Subtle green gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
    <div
      className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(161 78% 28% / 0.06) 0%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />

    <div className="section-container relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — photo */}
        <motion.div {...fade()} className="relative">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl bg-white/5">
            <img
              src={inatPhoto}
              alt="SESIT partnership with INAT"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Badge */}
          <div
            className="absolute -bottom-4 -right-4 px-5 py-3 rounded-2xl border shadow-lg"
            style={{
              background: "hsl(0 0% 100%)",
              borderColor: "hsl(161 78% 28% / 0.2)",
            }}
          >
            <span className="text-xs font-semibold" style={{ color: "hsl(161 78% 35%)" }}>
              {t("journey.inatBadge")}
            </span>
          </div>
        </motion.div>

        {/* Right — text */}
        <div>
          <motion.span
            {...fade(0.1)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ color: "hsl(161 78% 35%)" }}
          >
            <Award className="w-4 h-4" /> {t("journey.inatLabel")}
          </motion.span>

          <motion.h2
            {...fade(0.15)}
            className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-6 text-foreground"
          >
            {t("journey.inatTitle")}{" "}
            <span className="gradient-text">INAT</span>
          </motion.h2>

          <motion.p
            {...fade(0.2)}
            className="text-base text-muted-foreground leading-relaxed mb-6"
          >
            {t("journey.inatDesc")}
          </motion.p>

          <motion.div {...fade(0.25)} className="space-y-3 mb-8">
            {[
              t("journey.inatH1"),
              t("journey.inatH2"),
              t("journey.inatH3"),
              t("journey.inatH4"),
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <Star
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: "hsl(161 78% 35%)" }}
                />
                <span className="text-sm text-muted-foreground">{point}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            {...fade(0.3)}
            className="glass-card p-5 flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "hsl(161 78% 28% / 0.1)" }}
            >
              <Award className="w-6 h-6" style={{ color: "hsl(161 78% 35%)" }} />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">
                {t("journey.inatCardName")}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {t("journey.inatCardSub")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
};

/* ================================================================== */
/*  SECTION 4 — Novation Accelerator (dark bg)                        */
/* ================================================================== */

const NovationSection = () => {
  const { t } = useTranslation();
  return (
  <section className="relative py-24 lg:py-32 overflow-hidden">
    {/* Dark background */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(222 47% 14%) 50%, hsl(222 47% 11%) 100%)",
      }}
    />
    {/* Accent blue glow */}
    <div
      className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(220 91% 54% / 0.07) 0%, transparent 70%)",
        filter: "blur(100px)",
      }}
    />
    <div
      className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(161 78% 28% / 0.06) 0%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />

    <div className="section-container relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <div>
          <motion.span
            {...fade(0.05)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ color: "hsl(161 78% 45%)" }}
          >
            <Rocket className="w-4 h-4" /> {t("journey.novationLabel")}
          </motion.span>

          <motion.h2
            {...fade(0.1)}
            className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-6 text-white"
          >
            {t("journey.novationTitle")}{" "}
            <span className="gradient-text">Novation</span>
          </motion.h2>

          <motion.p
            {...fade(0.15)}
            className="text-base text-white/60 leading-relaxed mb-6"
          >
            {t("journey.novationDesc")}
          </motion.p>

          <motion.div {...fade(0.2)} className="space-y-3 mb-8">
            {[
              t("journey.novationH1"),
              t("journey.novationH2"),
              t("journey.novationH3"),
              t("journey.novationH4"),
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <Star
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: "hsl(161 78% 45%)" }}
                />
                <span className="text-sm text-white/70">{point}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            {...fade(0.25)}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border"
            style={{
              borderColor: "hsl(161 78% 28% / 0.4)",
              background: "hsl(161 78% 28% / 0.12)",
            }}
          >
            <Rocket className="w-5 h-5" style={{ color: "hsl(161 78% 45%)" }} />
            <span className="font-semibold text-sm" style={{ color: "hsl(161 78% 55%)" }}>
              {t("journey.novationBadge")}
            </span>
          </motion.div>
        </div>

        {/* Right — photo */}
        <motion.div {...fade(0.2)} className="relative">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl bg-white/5">
            <img
              src={novationPhoto}
              alt="SESIT at Novation Business Accelerator"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Badge */}
          <div
            className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl border shadow-lg"
            style={{
              background: "hsl(222 47% 18%)",
              borderColor: "hsl(161 78% 28% / 0.3)",
            }}
          >
            <span className="text-xs font-semibold" style={{ color: "hsl(161 78% 45%)" }}>
              {t("journey.novationPhotoBadge")}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

/* ================================================================== */
/*  SECTION 5 — Jordan Trip (bright bg, alternating layout)           */
/* ================================================================== */

const JordanSection = () => {
  const { t } = useTranslation();
  return (
  <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
    {/* Subtle blue gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5 pointer-events-none" />
    <div
      className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(220 91% 54% / 0.05) 0%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />

    <div className="section-container relative z-10">
      {/* Header */}
      <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
        <motion.span
          {...fade(0.05)}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4"
          style={{ color: "hsl(220 91% 54%)" }}
        >
          <Sparkles className="w-4 h-4" /> {t("journey.jordanLabel")}
        </motion.span>
        <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-4 text-foreground">
          {t("journey.jordanTitle")}{" "}
          <span className="gradient-text">Jordan</span>
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          {t("journey.jordanDesc")}
        </p>
      </motion.div>

      {/* Media grid */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left — photos stacked */}
        <motion.div {...fade(0.1)} className="space-y-4">
          <div className="rounded-2xl overflow-hidden aspect-[16/9] shadow-lg">
            <img
              src={jordan1}
              alt="SESIT team at NARC Jordan"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[16/9] shadow-lg">
            <img
              src={jordan2}
              alt="SESIT visit to National Agricultural Research Center Jordan"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* Right — map + highlights */}
        <motion.div {...fade(0.15)} className="space-y-6">
          {/* Map placeholder (Leaflet removed) */}
          <div
            className="rounded-2xl overflow-hidden shadow-xl border border-border/60"
            style={{ height: 280 }}
          >
            <NARCMap />
          </div>
          {/* Highlights */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Star className="w-4 h-4" style={{ color: "hsl(161 78% 35%)" }} />
              {t("journey.jordanHighlights")}
            </h3>
            {[
              t("journey.jordanH1"),
              t("journey.jordanH2"),
              t("journey.jordanH3"),
              t("journey.jordanH4"),
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <Star
                  className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                  style={{ color: "hsl(161 78% 35%)" }}
                />
                <span className="text-sm text-muted-foreground">{point}</span>
              </div>
            ))}
          </div>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border"
            style={{
              borderColor: "hsl(220 91% 54% / 0.3)",
              background: "hsl(220 91% 54% / 0.07)",
            }}
          >
            <span className="text-lg">🇯🇴</span>
            <span
              className="font-semibold text-sm"
              style={{ color: "hsl(220 91% 60%)" }}
            >
              {t("journey.jordanBadge")}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

/* ================================================================== */
/*  SECTION 6 — Bari / CIHEAM (dark bg)                               */
/* ================================================================== */

// CIHEAM Bari Mediterranean Agronomic Institute coordinates
const CIHEAM_COORDS: [number, number] = [41.1181, 16.8705];

const BariMap = () => {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapDivRef.current || mapInstanceRef.current) return;
    import("leaflet").then((L) => {
      if (!mapDivRef.current || mapInstanceRef.current) return;
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      const map = L.map(mapDivRef.current, {
        center: CIHEAM_COORDS,
        zoom: 14,
        scrollWheelZoom: false,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      L.marker(CIHEAM_COORDS)
        .addTo(map)
        .bindPopup(
          `<div style="min-width:180px;font-family:sans-serif">
            <strong style="font-size:13px">🇮🇹 CIHEAM Bari</strong><br/>
            <span style="font-size:11px;color:#555">Mediterranean Agronomic Institute</span><br/>
            <span style="font-size:11px;color:#888">Bari, Italy</span>
          </div>`
        )
        .openPopup();
      mapInstanceRef.current = map;
    });
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%", borderRadius: "1rem" }} />;
};

const BariSection = () => {
  const { t } = useTranslation();
  return (
  <section className="relative py-24 lg:py-32 overflow-hidden">
    {/* Dark background */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(222 47% 14%) 50%, hsl(222 47% 11%) 100%)",
      }}
    />
    {/* Accent blue glow top-left */}
    <div
      className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(220 91% 54% / 0.07) 0%, transparent 70%)",
        filter: "blur(100px)",
      }}
    />
    {/* Green glow bottom-right */}
    <div
      className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(161 78% 28% / 0.06) 0%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />

    <div className="section-container relative z-10">
      {/* Header */}
      <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
        <motion.span
          {...fade(0.05)}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4"
          style={{ color: "hsl(220 91% 54%)" }}
        >
          <Sparkles className="w-4 h-4" /> {t("journey.bariLabel")}
        </motion.span>
        <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-4 text-white">
          {t("journey.bariTitle")}{" "}
          <span className="gradient-text">{t("journey.bariTitleHighlight")}</span>
        </h2>
        <p className="text-white/60 text-base leading-relaxed">
          {t("journey.bariDesc")}
        </p>
      </motion.div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left — map + logo */}
        <motion.div {...fade(0.1)} className="space-y-4">
          {/* Map */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border"
            style={{ height: 280, borderColor: "hsl(220 91% 54% / 0.2)" }}
          >
            <BariMap />
          </div>
          {/* CIHEAM logo card */}
          <div
            className="flex items-center gap-4 px-5 py-4 rounded-2xl border"
            style={{
              borderColor: "hsl(161 78% 28% / 0.3)",
              background: "hsl(222 47% 18% / 0.7)",
            }}
          >
            <img
              src={ciheamLogo}
              alt="CIHEAM logo"
              className="h-10 object-contain"
            />
            <div>
              <div className="text-sm font-semibold text-white">{t("journey.bariCardName")}</div>
              <div className="text-xs text-white/50">{t("journey.bariCardSub")}</div>
            </div>
          </div>
        </motion.div>

        {/* Right — photo + highlights */}
        <motion.div {...fade(0.15)} className="space-y-6">
          {/* Photo */}
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
            <img
              src={bariPhoto}
              alt="SESIT team at CIHEAM Bari"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Highlights */}
          <div
            className="rounded-2xl border p-6 space-y-3"
            style={{
              borderColor: "hsl(161 78% 28% / 0.25)",
              background: "hsl(222 47% 16% / 0.6)",
            }}
          >
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Star className="w-4 h-4" style={{ color: "hsl(161 78% 45%)" }} />
              {t("journey.bariHighlights")}
            </h3>
            {[
              t("journey.bariH1"),
              t("journey.bariH2"),
              t("journey.bariH3"),
              t("journey.bariH4"),
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <Star
                  className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                  style={{ color: "hsl(161 78% 45%)" }}
                />
                <span className="text-sm text-white/70">{point}</span>
              </div>
            ))}
          </div>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border"
            style={{
              borderColor: "hsl(220 91% 54% / 0.3)",
              background: "hsl(220 91% 54% / 0.08)",
            }}
          >
            <span className="text-lg">🇮🇹</span>
            <span className="font-semibold text-sm" style={{ color: "hsl(220 91% 60%)" }}>
              {t("journey.bariBadge")}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

/* ================================================================== */
/*  SECTION 7 — OSIRRIS / TUNGER 2+2 Project Closure (bright bg)     */
/* ================================================================== */

// Leibniz Universität Hannover — key German TUNGER 2+2 research partner
const OSIRRIS_DE_COORDS: [number, number] = [52.382, 9.7197];

const OSIRRISMap = () => {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapDivRef.current || mapInstanceRef.current) return;
    import("leaflet").then((L) => {
      if (!mapDivRef.current || mapInstanceRef.current) return;
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      const map = L.map(mapDivRef.current, {
        center: OSIRRIS_DE_COORDS,
        zoom: 12,
        scrollWheelZoom: false,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      L.marker(OSIRRIS_DE_COORDS)
        .addTo(map)
        .bindPopup(
          `<div style="min-width:200px;font-family:sans-serif">
            <strong style="font-size:13px">🇩🇪 TUNGER 2+2 — German Partner</strong><br/>
            <span style="font-size:11px;color:#555">Leibniz Universität Hannover</span><br/>
            <span style="font-size:11px;color:#888">Hannover, Lower Saxony, Germany</span>
          </div>`
        )
        .openPopup();
      mapInstanceRef.current = map;
    });
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%", borderRadius: "1rem" }} />;
};

const osirrisPhotos = [
  { src: osirrisPresentation, alt: "OSIRRIS project workshop presentation — Nabeul, January 2026" },
  { src: osirrisGroup, alt: "OSIRRIS project team group photo — TUNGER 2+2 closing workshop" },
];

const OSIRRISSection = () => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Subtle green-to-blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(161 78% 28% / 0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(220 91% 54% / 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            {...fade(0.05)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ color: "hsl(161 78% 35%)" }}
          >
            <Trophy className="w-4 h-4" /> {t("journey.osirrisLabel")}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-4 text-foreground">
            {t("journey.osirrisTitle")}{" "}
            <span className="gradient-text">{t("journey.osirrisTitleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            {t("journey.osirrisDesc")}
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — photo gallery */}
          <motion.div {...fade(0.1)} className="space-y-4">
            {/* Main photo */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl"
              style={{ boxShadow: "0 0 0 1px hsl(161 78% 28% / 0.15)" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={osirrisPhotos[active].src}
                  alt={osirrisPhotos[active].alt}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <span className="text-white/70 text-xs">{active + 1} / {osirrisPhotos.length}</span>
                <div className="flex gap-1.5">
                  {osirrisPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === active ? "w-4" : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                      style={i === active ? { background: "hsl(161 78% 45%)" } : {}}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 gap-3">
              {osirrisPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] transition-all ${
                    i === active ? "scale-[1.02] opacity-100" : "opacity-55 hover:opacity-80"
                  }`}
                  style={i === active ? { boxShadow: "0 0 0 2px hsl(161 78% 45%)" } : {}}
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Event badge */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl border"
              style={{
                borderColor: "hsl(161 78% 28% / 0.2)",
                background: "hsl(161 78% 28% / 0.05)",
              }}
            >
              <span className="text-xl">📍</span>
              <div>
                <div className="text-xs font-semibold text-foreground">{t("journey.osirrisVenue")}</div>
                <div className="text-xs text-muted-foreground">{t("journey.osirrisVenueSub")}</div>
              </div>
            </div>
          </motion.div>

          {/* Right — text + map */}
          <motion.div {...fade(0.15)} className="space-y-6">
            {/* Key highlights */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: "hsl(161 78% 35%)" }} />
                {t("journey.osirrisOutcomes")}
              </h3>
              {[
                t("journey.osirrisH1"),
                t("journey.osirrisH2"),
                t("journey.osirrisH3"),
                t("journey.osirrisH4"),
                t("journey.osirrisH5"),
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <Star
                    className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                    style={{ color: "hsl(161 78% 35%)" }}
                  />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>

            {/* Germany map */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-foreground">{t("journey.osirrisGermanPartner")}</span>
                <span className="text-xs text-muted-foreground">{t("journey.osirrisGermanCity")}</span>
              </div>
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ height: 240, borderColor: "hsl(220 91% 54% / 0.2)" }}
              >
                <OSIRRISMap />
              </div>
            </div>

            {/* Partnership badge */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                style={{
                  borderColor: "hsl(161 78% 28% / 0.25)",
                  background: "hsl(161 78% 28% / 0.06)",
                }}
              >
                <span className="text-xl">🇹🇳</span>
                <div>
                  <div className="text-xs font-semibold text-foreground">{t("journey.osirrisTunisia")}</div>
                  <div className="text-xs text-muted-foreground">{t("journey.osirrisTunisiaSub")}</div>
                </div>
              </div>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                style={{
                  borderColor: "hsl(220 91% 54% / 0.25)",
                  background: "hsl(220 91% 54% / 0.06)",
                }}
              >
                <span className="text-xl">🇩🇪</span>
                <div>
                  <div className="text-xs font-semibold text-foreground">{t("journey.osirrisGermany")}</div>
                  <div className="text-xs text-muted-foreground">{t("journey.osirrisGermanySub")}</div>
                </div>
              </div>
            </div>

            {/* OSIRRIS label */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border w-full justify-center"
              style={{
                borderColor: "hsl(161 78% 28% / 0.3)",
                background: "hsl(161 78% 28% / 0.08)",
              }}
            >
              <Trophy className="w-5 h-5" style={{ color: "hsl(161 78% 45%)" }} />
              <span className="font-semibold text-sm" style={{ color: "hsl(161 78% 45%)" }}>
                {t("journey.osirrisBadge")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ================================================================== */
/*  SECTION 8 — AgroSelf at WAVE Connect · Sup'Com (dark bg)         */
/* ================================================================== */

const AgroSelfWaveSection = () => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();
  const photos = [
    { src: agroSWave1, alt: "SESIT team presenting AgroSelf at WAVE Connect 2026 · Sup'Com" },
    { src: agroSWave2, alt: "TELMA Crops Smart Management live demo at Sup'Com" },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Dark background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(222 47% 14%) 50%, hsl(222 47% 11%) 100%)",
        }}
      />
      {/* Green glow top-left */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(161 78% 28% / 0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      {/* Blue glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(220 91% 54% / 0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            {...fade(0.05)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ color: "hsl(161 78% 45%)" }}
          >
            <Sparkles className="w-4 h-4" /> {t("journey.waveLabel")}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-4 text-white">
            {t("journey.waveTitle")}{" "}
            <span className="gradient-text">{t("journey.waveTitleHighlight")}</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            {t("journey.waveDesc")}
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — text + highlights */}
          <div className="space-y-6">
            {/* Innovation card */}
            <motion.div
              {...fade(0.1)}
              className="rounded-2xl border p-6 space-y-5"
              style={{
                borderColor: "hsl(161 78% 28% / 0.3)",
                background: "hsl(222 47% 16% / 0.6)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(161 78% 28% / 0.2)" }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: "hsl(161 78% 45%)" }} />
                </div>
                <h3 className="text-base font-semibold text-white">
                  {t("journey.waveInnovationTitle")}
                </h3>
              </div>
              <p className="text-sm text-white/65 leading-relaxed">
                {t("journey.waveInnovationDesc")}
              </p>
              {[
                t("journey.waveH1"),
                t("journey.waveH2"),
                t("journey.waveH3"),
                t("journey.waveH4"),
                t("journey.waveH5"),
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <Star
                    className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                    style={{ color: "hsl(161 78% 45%)" }}
                  />
                  <span className="text-sm text-white/70">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* Sponsors row */}
            <motion.div
              {...fade(0.15)}
              className="rounded-2xl border px-5 py-4 space-y-3"
              style={{
                borderColor: "hsl(220 91% 54% / 0.2)",
                background: "hsl(222 47% 18% / 0.5)",
              }}
            >
              <div className="text-xs font-semibold tracking-wider uppercase text-white/40">
                {t("journey.waveSponsors")}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {["Ooredoo", "Tunisie Telecom", "PwC", "Siemens", "Forvia", "EY", "Pearls Consulting", "Decade"].map((s) => (
                  <span key={s} className="text-xs font-medium text-white/55">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Event badge */}
            <motion.div
              {...fade(0.2)}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border"
              style={{
                borderColor: "hsl(161 78% 28% / 0.4)",
                background: "hsl(161 78% 28% / 0.12)",
              }}
            >
              <Rocket className="w-5 h-5" style={{ color: "hsl(161 78% 45%)" }} />
              <span className="font-semibold text-sm" style={{ color: "hsl(161 78% 55%)" }}>
                {t("journey.waveBadge")}
              </span>
            </motion.div>
          </div>

          {/* Right — photo gallery */}
          <motion.div {...fade(0.15)} className="space-y-4">
            {/* Main photo */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-2xl"
              style={{ boxShadow: "0 0 0 1px hsl(161 78% 28% / 0.25)" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={photos[active].src}
                  alt={photos[active].alt}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Caption */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <span className="text-white/60 text-xs">
                  {active === 0 ? t("journey.waveCaption1") : t("journey.waveCaption2")}
                </span>
                <div className="flex gap-1.5">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === active ? "w-4" : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                      style={i === active ? { background: "hsl(161 78% 45%)" } : {}}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative rounded-xl overflow-hidden aspect-[16/10] transition-all ${
                    i === active ? "scale-[1.02] opacity-100" : "opacity-45 hover:opacity-75"
                  }`}
                  style={i === active ? { boxShadow: "0 0 0 2px hsl(161 78% 45%)" } : {}}
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Sup'Com logo card */}
            <div
              className="flex items-center gap-4 px-5 py-4 rounded-2xl border"
              style={{
                borderColor: "hsl(161 78% 28% / 0.3)",
                background: "hsl(222 47% 18% / 0.7)",
              }}
            >
              <img
                src="/src/assets/supcom.png"
                alt="Sup'Com logo"
                className="h-9 object-contain opacity-90"
              />
              <div>
                <div className="text-sm font-semibold text-white">{t("journey.waveSupcomName")}</div>
                <div className="text-xs text-white/50">{t("journey.waveSupcomFull")}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ================================================================== */
/*  SECTION 9 — Nefta Oasis Field Trip (photo bg, oasis atmosphere)  */
/* ================================================================== */

// Nefta, Tozeur Governorate, Tunisia
const NEFTA_COORDS: [number, number] = [33.8731, 7.8773];

const NeftaMap = () => {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapDivRef.current || mapInstanceRef.current) return;
    import("leaflet").then((L) => {
      if (!mapDivRef.current || mapInstanceRef.current) return;
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      const map = L.map(mapDivRef.current, {
        center: NEFTA_COORDS,
        zoom: 13,
        scrollWheelZoom: false,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      L.marker(NEFTA_COORDS)
        .addTo(map)
        .bindPopup(
          `<div style="min-width:190px;font-family:sans-serif">
            <strong style="font-size:13px">🌴 Nefta Oasis</strong><br/>
            <span style="font-size:11px;color:#555">Tozeur Governorate, Tunisia</span><br/>
            <span style="font-size:11px;color:#888">33.8731° N, 7.8773° E · Saharan Oasis</span>
          </div>`
        )
        .openPopup();
      mapInstanceRef.current = map;
    });
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%", borderRadius: "1rem" }} />;
};

const neftaPhotos = [
  { src: neftaPhoto1, alt: "SESIT field research at Nefta oasis, Tunisia" },
  { src: neftaPhoto2, alt: "Nefta oasis landscape — smart agriculture research site" },
];

const NeftaSection = () => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      {/* ── Oasis background ── */}
      <div className="absolute inset-0">
        <img
          src={oasisBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />

        {/* PRIMARY dark veil — strong enough for text legibility */}
        <div className="absolute inset-0 bg-black/72" />

        {/* Top: dark emerald canopy gradient */}
        <div
          className="absolute top-0 inset-x-0 h-80 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsl(150 55% 5% / 0.90) 0%, transparent 100%)",
          }}
        />

        {/* Bottom: dark desert-sand gradient */}
        <div
          className="absolute bottom-0 inset-x-0 h-80 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, hsl(25 50% 8% / 0.92) 0%, transparent 100%)",
          }}
        />

        {/* Central oasis shimmer — subtle warmth through the dark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, hsl(50 80% 55% / 0.07) 0%, hsl(161 60% 30% / 0.04) 45%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Side palm-green accents */}
        <div
          className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(152 60% 18% / 0.18) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(152 60% 18% / 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* ── Section header ── */}
        <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            {...fade(0.05)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ color: "hsl(50 90% 65%)" }}
          >
            <Sparkles className="w-4 h-4" /> {t("journey.neftaLabel")}
          </motion.span>

          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-4 text-white">
            {t("journey.neftaTitle")}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(50 90% 65%) 0%, hsl(161 78% 50%) 50%, hsl(152 60% 40%) 100%)",
              }}
            >
              {t("journey.neftaTitleHighlight")}
            </span>
          </h2>

          <p className="text-white/70 text-base leading-relaxed">
            {t("journey.neftaDesc")}
          </p>
        </motion.div>

        {/* ── Main content ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — photo carousel */}
          <motion.div {...fade(0.1)} className="space-y-4">
            {/* Main photo with carousel */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl"
              style={{
                boxShadow:
                  "0 0 0 1px hsl(50 80% 50% / 0.20), 0 20px 60px hsl(0 0% 0% / 0.6)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={neftaPhotos[active].src}
                  alt={neftaPhotos[active].alt}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <span className="text-white/60 text-xs">
                  {active + 1} / {neftaPhotos.length}
                </span>
                <div className="flex gap-1.5">
                  {neftaPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === active ? "w-4" : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                      style={i === active ? { background: "hsl(50 90% 60%)" } : {}}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 gap-3">
              {neftaPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] transition-all ${
                    i === active ? "scale-[1.02] opacity-100" : "opacity-45 hover:opacity-75"
                  }`}
                  style={i === active ? { boxShadow: "0 0 0 2px hsl(50 90% 60%)" } : {}}
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Location + partner badges */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl border"
              style={{
                borderColor: "hsl(50 80% 50% / 0.25)",
                background: "hsl(25 40% 6% / 0.70)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="text-xl">🌴</span>
              <div>
                <div className="text-xs font-semibold text-amber-200">
                  {t("journey.neftaLocation")}
                </div>
                <div className="text-xs" style={{ color: "hsl(50 60% 55%)" }}>
                  {t("journey.neftaLocationSub")}
                </div>
              </div>
            </div>

            <div
              className="flex items-center gap-4 px-5 py-4 rounded-xl border"
              style={{
                borderColor: "hsl(220 40% 50% / 0.20)",
                background: "hsl(220 30% 8% / 0.65)",
                backdropFilter: "blur(12px)",
              }}
            >
              <img
                src={chanLogo}
                alt="Partner organisation"
                className="h-7 object-contain opacity-80 brightness-0 invert"
              />
              <div className="text-xs text-white/50">
                {t("journey.neftaPartnerSub")}
              </div>
            </div>
          </motion.div>

          {/* Right — map + highlights */}
          <motion.div {...fade(0.15)} className="space-y-5">
            {/* Leaflet map */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-amber-200">{t("journey.neftaMapLabel")}</span>
                <span className="text-xs" style={{ color: "hsl(50 60% 55%)" }}>
                  {t("journey.neftaMapSub")}
                </span>
              </div>
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ height: 240, borderColor: "hsl(50 60% 30% / 0.25)" }}
              >
                <NeftaMap />
              </div>
            </div>

            {/* Research focus card */}
            <div
              className="rounded-2xl border p-6 space-y-4"
              style={{
                borderColor: "hsl(50 60% 40% / 0.25)",
                background: "hsl(25 25% 6% / 0.72)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(50 70% 40% / 0.18)" }}
                >
                  <Star className="w-4 h-4" style={{ color: "hsl(50 90% 65%)" }} />
                </div>
                <h3 className="text-base font-semibold text-white">{t("journey.neftaResearchTitle")}</h3>
              </div>
              {[
                t("journey.neftaH1"),
                t("journey.neftaH2"),
                t("journey.neftaH3"),
                t("journey.neftaH4"),
                t("journey.neftaH5"),
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                    style={{ background: "hsl(50 90% 60%)" }}
                  />
                  <span className="text-sm" style={{ color: "hsl(50 15% 78%)" }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Facts strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🌡️", label: t("journey.neftaFact1Label"), sub: t("journey.neftaFact1Sub") },
                { icon: "💧", label: t("journey.neftaFact2Label"), sub: t("journey.neftaFact2Sub") },
                { icon: "🌴", label: t("journey.neftaFact3Label"), sub: t("journey.neftaFact3Sub") },
              ].map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border px-3 py-4 text-center"
                  style={{
                    borderColor: "hsl(50 60% 30% / 0.22)",
                    background: "hsl(25 20% 6% / 0.68)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="text-xl mb-1">{f.icon}</div>
                  <div className="text-xs font-semibold text-amber-200">{f.label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: "hsl(50 40% 55%)" }}>
                    {f.sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


/* ================================================================== */
/*  SECTION 10 — Riyeda 13 Event (dark bg)                           */
/* ================================================================== */

const riyedaPhotos = [
  { src: riyeda1, alt: "SESIT booth at Riyeda 13 entrepreneurship event" },
  { src: riyeda2, alt: "SESIT team presenting AgriTech solutions at Riyeda 13" },
  { src: riyeda3, alt: "Riyeda 13 event — SESIT & APIA incubated startups" },
];

const RiyedaSection = () => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(222 47% 10%) 0%, hsl(222 47% 13%) 50%, hsl(222 47% 10%) 100%)",
        }}
      />
      {/* Green glow top-right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(161 78% 28% / 0.09) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
      />
      {/* Blue glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(220 91% 54% / 0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.span
              {...fade(0.05)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ color: "hsl(161 78% 45%)" }}
            >
              <Mic className="w-4 h-4" /> {t("journey.riyedaLabel")}
            </motion.span>

            <motion.h2
              {...fade(0.1)}
              className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-6 text-white"
            >
              {t("journey.riyedaTitle")}{" "}
              <span className="gradient-text">{t("journey.riyedaTitleHighlight")}</span>
            </motion.h2>

            <motion.p
              {...fade(0.15)}
              className="text-base text-white/60 leading-relaxed mb-6"
            >
              {t("journey.riyedaDesc")}
            </motion.p>

            <motion.div {...fade(0.2)} className="space-y-3 mb-8">
              {[
                t("journey.riyedaH1"),
                t("journey.riyedaH2"),
                t("journey.riyedaH3"),
                t("journey.riyedaH4"),
                t("journey.riyedaH5"),
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "hsl(161 78% 45%)" }} />
                  <span className="text-sm text-white/70">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* APIA + Riyeda badges */}
            <motion.div {...fade(0.25)} className="flex flex-wrap gap-3">
              <div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border"
                style={{
                  borderColor: "hsl(161 78% 28% / 0.4)",
                  background: "hsl(161 78% 28% / 0.12)",
                }}
              >
                <span className="text-sm">🌱</span>
                <span className="text-xs font-semibold" style={{ color: "hsl(161 78% 55%)" }}>
                  {t("journey.riyedaBadge1")}
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border"
                style={{
                  borderColor: "hsl(220 91% 54% / 0.3)",
                  background: "hsl(220 91% 54% / 0.08)",
                }}
              >
                <span className="text-sm">🇹🇳</span>
                <span className="text-xs font-semibold" style={{ color: "hsl(220 91% 65%)" }}>
                  {t("journey.riyedaBadge2")}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right — gallery */}
          <motion.div {...fade(0.2)} className="space-y-4">
            {/* Riyeda logo */}
            <div className="flex justify-center mb-2">
              <img
                src={riyedaLogo}
                alt="Riyeda 13 logo"
                className="h-14 object-contain"
              />
            </div>

            {/* Main photo */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              style={{ boxShadow: "0 0 0 1px hsl(161 78% 28% / 0.3), 0 20px 50px hsl(0 0% 0% / 0.4)" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={riyedaPhotos[active].src}
                  alt={riyedaPhotos[active].alt}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <span className="text-white/60 text-xs">{active + 1} / {riyedaPhotos.length}</span>
                <div className="flex gap-1.5">
                  {riyedaPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all ${i === active ? "w-4" : "w-1.5 bg-white/30 hover:bg-white/60"}`}
                      style={i === active ? { background: "hsl(161 78% 45%)" } : {}}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {riyedaPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] transition-all ${i === active ? "scale-[1.03] opacity-100" : "opacity-45 hover:opacity-75"}`}
                  style={i === active ? { boxShadow: "0 0 0 2px hsl(161 78% 45%)" } : {}}
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ================================================================== */
/*  SECTION 11 — Holland / PRIVA AgriTech Trip (bright bg)           */
/* ================================================================== */

// PRIVA headquarters — De Lier, Netherlands
const PRIVA_COORDS: [number, number] = [51.9954, 4.2269];

const PrivaMap = () => {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapDivRef.current || mapInstanceRef.current) return;
    import("leaflet").then((L) => {
      if (!mapDivRef.current || mapInstanceRef.current) return;
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      const map = L.map(mapDivRef.current, {
        center: PRIVA_COORDS,
        zoom: 13,
        scrollWheelZoom: false,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      L.marker(PRIVA_COORDS)
        .addTo(map)
        .bindPopup(
          `<div style="min-width:200px;font-family:sans-serif">
            <strong style="font-size:13px">🇳🇱 PRIVA — AgriTech HQ</strong><br/>
            <span style="font-size:11px;color:#555">World Leader in Greenhouse Automation</span><br/>
            <span style="font-size:11px;color:#888">De Lier, South Holland, Netherlands</span>
          </div>`
        )
        .openPopup();
      mapInstanceRef.current = map;
    });
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%", borderRadius: "1rem" }} />;
};

const holandPhotos = [
  { src: holand1, alt: "SESIT team at PRIVA headquarters, De Lier, Netherlands" },
  { src: holand2, alt: "Exploring PRIVA's advanced greenhouse automation technology" },
  { src: holand3, alt: "PRIVA AgriTech visit — precision horticulture systems" },
  { src: holand4, alt: "SESIT mission to Netherlands — latest AgriTech innovations" },
  { src: holand5, alt: "SESIT visit to Netherlands — AgriTech exploration" },
  { src: holand6, alt: "SESIT Netherlands trip — greenhouse technology" },
  { src: holand8, alt: "SESIT Netherlands — PRIVA facility tour" },
  { src: holand9, alt: "SESIT Holland — smart irrigation technology" },
  { src: holand10, alt: "SESIT Holland — greenhouse automation insights" },
];

const HollandSection = () => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(220 91% 54% / 0.06) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(161 78% 28% / 0.05) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            {...fade(0.05)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ color: "hsl(220 91% 54%)" }}
          >
            <Sparkles className="w-4 h-4" /> {t("journey.hollandLabel")}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-4 text-foreground">
            {t("journey.hollandTitle")}{" "}
            <span className="gradient-text">{t("journey.hollandTitleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            {t("journey.hollandDesc")}
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — photo gallery */}
          <motion.div {...fade(0.1)} className="space-y-4">
            {/* Main photo */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl"
              style={{ boxShadow: "0 0 0 1px hsl(220 91% 54% / 0.15)" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={holandPhotos[active].src}
                  alt={holandPhotos[active].alt}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <span className="text-white/60 text-xs">{active + 1} / {holandPhotos.length}</span>
                <div className="flex gap-1.5">
                  {holandPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all ${i === active ? "w-4" : "w-1.5 bg-white/30 hover:bg-white/60"}`}
                      style={i === active ? { background: "hsl(220 91% 54%)" } : {}}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 2×2 thumbnail grid */}
            <div className="grid grid-cols-4 gap-2">
              {holandPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative rounded-xl overflow-hidden aspect-square transition-all ${i === active ? "scale-[1.04] opacity-100" : "opacity-50 hover:opacity-80"}`}
                  style={i === active ? { boxShadow: "0 0 0 2px hsl(220 91% 54%)" } : {}}
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Location badge */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl border"
              style={{
                borderColor: "hsl(220 91% 54% / 0.2)",
                background: "hsl(220 91% 54% / 0.05)",
              }}
            >
              <span className="text-xl">🇳🇱</span>
              <div>
                <div className="text-xs font-semibold text-foreground">
                  {t("journey.hollandLocation")}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t("journey.hollandLocationSub")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — map + highlights */}
          <motion.div {...fade(0.15)} className="space-y-5">
            {/* Map */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-foreground">{t("journey.hollandMapLabel")}</span>
                <span className="text-xs text-muted-foreground">{t("journey.hollandMapSub")}</span>
              </div>
              <div
                className="rounded-2xl overflow-hidden border border-border/60 shadow-lg"
                style={{ height: 260 }}
              >
                <PrivaMap />
              </div>
            </div>

            {/* Highlights */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                {t("journey.hollandHighlights")}
              </h3>
              {[
                t("journey.hollandH1"),
                t("journey.hollandH2"),
                t("journey.hollandH3"),
                t("journey.hollandH4"),
                t("journey.hollandH5"),
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-primary" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border w-full justify-center"
              style={{
                borderColor: "hsl(220 91% 54% / 0.3)",
                background: "hsl(220 91% 54% / 0.07)",
              }}
            >
              <span className="text-lg">🇳🇱</span>
              <span className="font-semibold text-sm" style={{ color: "hsl(220 91% 55%)" }}>
                {t("journey.hollandBadge")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ================================================================== */
/*  CTA SECTION                                                        */
/* ================================================================== */

const CTASection = () => {
  const { t } = useTranslation();
  return (
  <section className="pb-20 lg:pb-28">
    <div className="section-container">
      <motion.div
        {...fade()}
        className="glass-card p-10 lg:p-14 text-center max-w-3xl mx-auto"
      >
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">
          {t("journey.ctaTitle")}{" "}
          <span className="gradient-text">{t("journey.ctaHighlight")}</span>
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xl mx-auto">
          {t("journey.ctaDesc")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={() => { window.location.href = "/#contact"; }}>
            {t("journey.ctaContact")} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/partners">
              {t("journey.ctaPartners")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

/* ================================================================== */
/*  HEADER                                                             */
/* ================================================================== */


/* ================================================================== */
/*  PAGE ROOT                                                          */
/* ================================================================== */

const JourneyPage = () => {
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIntroDone = useCallback(() => setPhase("done"), []);

  return (
    <>
      {/* Cinematic intro overlay */}
      <AnimatePresence>
        {phase !== "done" && (
          <CinematicIntro key="intro" onDone={handleIntroDone} />
        )}
      </AnimatePresence>

      {/* Page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "done" ? 1 : 0 }}
        transition={{ duration: 0.8, delay: phase === "done" ? 0.2 : 0 }}
        className="min-h-screen bg-background"
      >
        <Header />

        {/* Section 1 — Origin */}
        <OriginSection />

        {/* Section 2 — Starti 4 */}
        <StartiSection />

        {/* Section 2b — Mashrou3ek 1st Place */}
        <Mashrou3ekSection />

        {/* Section 3 — INAT Partnership */}
        <INATSection />

        {/* Section 4 — Novation Accelerator */}
        <NovationSection />

        {/* Section 5 — Jordan Trip */}
        <JordanSection />

        {/* Section 6 — Bari / CIHEAM */}
        <BariSection />

        {/* Section 7 — OSIRRIS / TUNGER 2+2 */}
        <OSIRRISSection />

        {/* Section 8 — AgroSelf at WAVE Connect · Sup'Com */}
        <AgroSelfWaveSection />

        {/* Section 9 — Nefta Oasis Field Trip */}
        <NeftaSection />

        {/* Section 10 — Riyeda 13 Event */}
        <RiyedaSection />

        {/* Section 11 — Holland / PRIVA Trip */}
        <HollandSection />

        {/* CTA */}
        <CTASection />

        <Footer />
      </motion.div>
    </>
  );
};

export default JourneyPage;
