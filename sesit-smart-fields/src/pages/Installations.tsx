// Sidi Thabet installation photos
import sidi1 from "@/assets/sidi thabet/grok-image-df8bc0ad-d50f-4ae4-b5f3-9c88c0dab908.jpg";
import sidi2 from "@/assets/sidi thabet/Screenshot 2026-02-23 112305.png";
import sidi3 from "@/assets/sidi thabet/Screenshot 2026-02-23 113135.png";
import sidi4 from "@/assets/sidi thabet/Screenshot 2026-02-23 113230.png";
import sidi5 from "@/assets/sidi thabet/Screenshot 2026-02-23 113257.png";
import sidi6 from "@/assets/sidi thabet/Screenshot 2026-02-23 113321.png";

const sidithabetPhotos = [sidi1, sidi2, sidi3, sidi4, sidi5, sidi6];
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Camera } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useTranslation } from "react-i18next";

// INAT installation photos
import inatImg from "@/assets/INAT/inat.png";
import serreImg from "@/assets/INAT/serre.png";
import telma2Img from "@/assets/INAT/telma2.png";
import telmaboxImg from "@/assets/INAT/telmabox.png";
import telmainatImg from "@/assets/INAT/telmainat.png";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

const inatPhotos = [inatImg, serreImg, telma2Img, telmaboxImg, telmainatImg];

const InstallationsPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-24">
        {/* ── Page hero ── */}
        <section className="section-container py-16 lg:py-20">
          <motion.div {...fade()}>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {t("nav.backToHome")}
            </a>
          </motion.div>

          <motion.span
            {...fade(0.05)}
            className="label-text text-primary inline-flex items-center gap-2 mb-3"
          >
            <MapPin className="w-3.5 h-3.5" />
            {t("installations.label")}
          </motion.span>

          <motion.h1
            {...fade(0.1)}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          >
            {t("installations.pageTitle")}{" "}
            <span className="gradient-text">{t("installations.pageTitleHighlight")}</span>
          </motion.h1>

          <motion.p
            {...fade(0.15)}
            className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            {t("installations.pageSubtitle")}
          </motion.p>
        </section>

        {/* ── Installation 1: INAT ── */}
        <section className="section-container mb-12">
          <motion.div {...fade()} className="glass-card rounded-2xl overflow-hidden">
            {/* Card header */}
            <div className="p-8 lg:p-10 border-b border-border/40">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary px-3 py-1 rounded-full border border-primary/25 bg-primary/5 inline-block mb-3">
                    {t("installations.inatTag")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold">{t("installations.inatName")}</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  {t("installations.inatLocation")}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {t("installations.inatDesc")}
              </p>
            </div>

            {/* Photo gallery */}
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-5">
                <Camera className="w-4 h-4 text-primary" />
                {t("installations.photos")}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                {inatPhotos.map((src, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-secondary/40">
                    <img
                      src={src}
                      alt={`${t("installations.inatName")} ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Installation 2: El Kef ── */}
        <section className="section-container mb-12">
          <motion.div {...fade()} className="glass-card rounded-2xl overflow-hidden">
            <div className="p-6 lg:p-10 border-b border-border/40">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary px-3 py-1 rounded-full border border-primary/25 bg-primary/5 inline-block mb-3">
                    {t("installations.elkefTag")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold">{t("installations.elkefName")}</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  {t("installations.elkefLocation")}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {t("installations.elkefDesc")}
              </p>
            </div>

            {/* Map embed */}
            <div className="p-4 lg:p-8">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-5">
                <MapPin className="w-4 h-4 text-primary" />
                {t("installations.locationLabel")}
              </div>
              <div className="rounded-xl overflow-hidden h-80 border border-border/30">
                <iframe
                  title="El Kef Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=8.60%2C36.13%2C8.76%2C36.22&layer=mapnik&marker=36.1751%2C8.6956"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Installation 3: Sidi Thabet ── */}
        <section className="section-container mb-8">
          <motion.div {...fade()} className="glass-card rounded-2xl overflow-hidden">
            <div className="p-8 lg:p-10 border-b border-border/40">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary px-3 py-1 rounded-full border border-primary/25 bg-primary/5 inline-block mb-3">
                    {t("installations.sidithabetTag")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold">{t("installations.sidithabetName")}</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  {t("installations.sidithabetLocation")}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {t("installations.sidithabetDesc")}
              </p>
            </div>

            {/* Photo gallery */}
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-5">
                <Camera className="w-4 h-4 text-primary" />
                {t("installations.photos")}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                {sidithabetPhotos.map((src, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-secondary/40">
                    <img
                      src={src}
                      alt={`${t("installations.sidithabetName")} ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                    />
                  </div>
                ))}
              </div>
              {/* Map embed */}
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-5">
                <MapPin className="w-4 h-4 text-primary" />
                {t("installations.locationLabel")}
              </div>
              <div className="rounded-xl overflow-hidden h-80 border border-border/30">
                <iframe
                  title="Sidi Thabet Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=9.91%2C36.88%2C10.04%2C36.96&layer=mapnik&marker=36.917%2C9.967"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InstallationsPage;
