import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MapPin, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import telmainatImg from "@/assets/INAT/telmainat.png";
import sidiThumb from "@/assets/sidi thabet/Screenshot 2026-02-23 113257.png";

const InstallationsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cards = [
    {
      title: t("installations.inatName"),
      location: t("installations.inatLocation"),
      tag: t("installations.inatTag"),
      image: telmainatImg,
      icon: <Camera className="w-5 h-5 text-primary/50" />,
    },
    {
      title: t("installations.elkefName"),
      location: t("installations.elkefLocation"),
      tag: t("installations.elkefTag"),
      image: null,
      icon: <MapPin className="w-5 h-5 text-primary/50" />,
    },
    {
      title: t("installations.sidithabetName"),
      location: t("installations.sidithabetLocation"),
      tag: t("installations.sidithabetTag"),
      image: sidiThumb,
      icon: <MapPin className="w-5 h-5 text-primary/50" />,
    },
  ];

  return (
    <section id="installations" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="label-text text-primary inline-flex items-center gap-2 mb-4">
            <MapPin className="w-3.5 h-3.5" />
            {t("installations.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("installations.title")}{" "}
            <span className="gradient-text">{t("installations.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            {t("installations.subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="enterprise-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="h-48 bg-secondary/30 relative overflow-hidden">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "hsl(161 78% 40% / 0.1)" }}
                    >
                      <MapPin className="w-6 h-6 text-primary/70" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{card.location}</span>
                  </div>
                )}
                {/* Tag badge */}
                <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-sm text-primary border border-primary/20">
                  {card.tag}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-primary/60" />
                  {card.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center"
        >
          <Button size="lg" className="btn-glow" asChild>
            <Link to="/installations">
              {t("installations.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default InstallationsSection;
