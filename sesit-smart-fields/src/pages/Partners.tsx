import { motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  ArrowLeft,
  Handshake,
  GraduationCap,
} from "lucide-react";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

import supcomLogo from "@/assets/supcom.png";
import inatLogo from "@/assets/inat.jpg";
import enitLogo from "@/assets/ENIT.png";
import s2tLogo from "@/assets/S2T.jpg";
import chanLogo from "@/assets/nefta/chan.svg";
import apiaLogo from "@/assets/apia.png";
import ingrefLogo from "@/assets/INGREF.png";
import iresaLogo from "@/assets/IRESA.png";
import olivierLogo from "@/assets/institut de l'olivier.jpg";

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

const PartnersPage = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const partners = [
    {
      name: "Sup'Com",
      fullName: "École Supérieure des Communications de Tunis",
      logo: supcomLogo,
      role: t("partners.p1role"),
      color: "bg-blue-500/10 text-blue-600",
      description: t("partners.p1desc"),
      highlights: [t("partners.p1h1"), t("partners.p1h2"), t("partners.p1h3"), t("partners.p1h4")],
      lab: "INNOVCOM Laboratory",
    },
    {
      name: "INAT",
      fullName: "Institut National Agronomique de Tunisie",
      logo: inatLogo,
      role: t("partners.p2role"),
      color: "bg-green-500/10 text-green-600",
      description: t("partners.p2desc"),
      highlights: [t("partners.p2h1"), t("partners.p2h2"), t("partners.p2h3"), t("partners.p2h4")],
    },
    {
      name: "ENIT – LACS",
      fullName: "École Nationale d'Ingénieurs de Tunis – Laboratoire LACS",
      logo: enitLogo,
      role: t("partners.p3role"),
      color: "bg-purple-500/10 text-purple-600",
      description: t("partners.p3desc"),
      highlights: [t("partners.p3h1"), t("partners.p3h2"), t("partners.p3h3"), t("partners.p3h4")],
      lead: "Prof. Taoufik Bettaieb & Prof. Faouzi Bouani",
    },
    {
      name: "Smart Tunisian Technoparks",
      fullName: "Smart Tunisian Technoparks",
      logo: s2tLogo,
      role: t("partners.p4role"),
      color: "bg-amber-500/10 text-amber-600",
      description: t("partners.p4desc"),
      highlights: [t("partners.p4h1"), t("partners.p4h2"), t("partners.p4h3"), t("partners.p4h4")],
    },
    {
      name: "SHANTI",
      fullName: "Association SHANTI Tunisie",
      logo: chanLogo,
      role: t("partners.p5role"),
      color: "bg-teal-500/10 text-teal-700",
      description: t("partners.p5desc"),
      highlights: [t("partners.p5h1"), t("partners.p5h2"), t("partners.p5h3"), t("partners.p5h4")],
    },
    {
      name: "APIA",
      fullName: "Agence de Promotion de l'Industrie et de l'Innovation",
      logo: apiaLogo,
      role: t("partners.p6role"),
      color: "bg-rose-500/10 text-rose-600",
      description: t("partners.p6desc"),
      highlights: [t("partners.p6h1"), t("partners.p6h2"), t("partners.p6h3"), t("partners.p6h4")],
    },
    {
      name: "INGREF",
      fullName: "Institut National de la Recherche en Génie Rural, Eaux et Forêts",
      logo: ingrefLogo,
      role: t("partners.p7role"),
      color: "bg-emerald-500/10 text-emerald-700",
      description: t("partners.p7desc"),
      highlights: [t("partners.p7h1"), t("partners.p7h2"), t("partners.p7h3"), t("partners.p7h4")],
    },
    {
      name: "IRESA",
      fullName: "Institution de la Recherche et de l'Enseignement Supérieur Agricoles",
      logo: iresaLogo,
      role: t("partners.p8role"),
      color: "bg-lime-500/10 text-lime-700",
      description: t("partners.p8desc"),
      highlights: [t("partners.p8h1"), t("partners.p8h2"), t("partners.p8h3"), t("partners.p8h4")],
    },
    {
      name: "Institut de l'Olivier",
      fullName: "Institut de l'Olivier — Centre de Recherche Oléicole",
      logo: olivierLogo,
      role: t("partners.p9role"),
      color: "bg-yellow-600/10 text-yellow-700",
      description: t("partners.p9desc"),
      highlights: [t("partners.p9h1"), t("partners.p9h2"), t("partners.p9h3"), t("partners.p9h4")],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        <div className="section-container relative z-10">
          <motion.div {...fade()} className="max-w-3xl mx-auto text-center">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {t("nav.backToHome")}
            </a>

            <span className="inline-flex items-center gap-2 text-primary text-xs font-medium tracking-wider uppercase mb-3">
              <Handshake className="w-4 h-4" />
              {t("partners.label")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              {t("partners.title")} <span className="gradient-text">{t("partners.titleHighlight")}</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t("partners.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Partner Cards ────────────────────────────────────────── */}
      <section className="pb-20 lg:pb-28">
        <div className="section-container">
          <div className="space-y-8">
            {partners.map((partner, idx) => {
              const isReversed = idx % 2 !== 0;
              return (
                <motion.div
                  key={partner.name}
                  {...fade(0.05 + idx * 0.05)}
                  className="glass-card overflow-hidden"
                >
                  <div
                    className={`grid lg:grid-cols-[1fr_1.5fr] gap-0 gap-y-8 ${
                      isReversed ? "lg:direction-rtl" : ""
                    }`}
                  >
                    {/* Left — Identity */}
                    <div
                      className={`p-6 lg:p-10 flex flex-col justify-center border-b lg:border-b-0 ${
                        isReversed
                          ? "lg:border-l border-border/40 lg:order-2"
                          : "lg:border-r border-border/40"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-20 h-20 rounded-xl ${partner.color} flex items-center justify-center overflow-hidden`}
                        >
                          <img
                            src={partner.logo}
                            alt={partner.name + " logo"}
                            className="object-contain w-16 h-16"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{partner.name}</h3>
                          <span className="text-xs text-muted-foreground leading-tight block mt-0.5">
                            {partner.fullName}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full w-fit mb-4 ${partner.color}`}
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        {partner.role}
                      </span>

                      {partner.lead && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{t("partners.ledBy")}</span>{" "}
                          {partner.lead}
                        </p>
                      )}
                      {partner.lab && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{t("partners.lab")}</span>{" "}
                          {partner.lab}
                        </p>
                      )}
                    </div>

                    {/* Right — Details */}
                    <div
                      className={`p-6 lg:p-10 ${
                        isReversed ? "lg:order-1" : ""
                      }`}
                    >
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {partner.description}
                      </p>

                      <h4 className="text-sm font-semibold mb-3">
                        {t("partners.keyContributions")}
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-2 mb-8">
                        {partner.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-secondary/20">
        <div className="section-container">
          <motion.div
            {...fade()}
            className="glass-card p-10 sm:p-14 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              {t("partners.ctaTitle")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {t("partners.ctaDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" onClick={() => { window.location.href = "/#contact"; }}>
                {t("partners.getInTouch")} <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
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

      <Footer />
    </div>
  );
};

export default PartnersPage;
