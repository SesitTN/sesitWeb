import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LazyVideo from "@/components/LazyVideo";
import { useTranslation } from "react-i18next";
import logo3D from "@/assets/logo3D.mp4";

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  return (
    <section id="achievements" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 z-0">
        <LazyVideo
          src={logo3D}
          rootMargin="300px"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-auto opacity-[0.06]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-[1]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="label-text text-primary inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {t("achievements.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 tracking-tight">
            {t("achievements.title")}{" "}
            <span className="gradient-text">{t("achievements.titleHighlight")}</span>{" "}
            {t("achievements.titleSuffix")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
            {t("achievements.description")}
          </p>
          <Button size="lg" className="btn-glow" asChild>
            <Link to="/journey">
              {t("achievements.cta")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
