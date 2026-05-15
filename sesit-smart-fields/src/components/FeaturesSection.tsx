import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Activity, TrendingUp, Clock, Smartphone, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  const features = [
    { icon: Calendar,   titleKey: "features.f1Title", descKey: "features.f1Desc" },
    { icon: Activity,   titleKey: "features.f2Title", descKey: "features.f2Desc" },
    { icon: TrendingUp, titleKey: "features.f3Title", descKey: "features.f3Desc" },
    { icon: Clock,      titleKey: "features.f4Title", descKey: "features.f4Desc" },
    { icon: Smartphone, titleKey: "features.f5Title", descKey: "features.f5Desc" },
    { icon: Shield,     titleKey: "features.f6Title", descKey: "features.f6Desc" },
  ];

  return (
    <section id="features" className="py-24 lg:py-32 bg-secondary/30 relative" ref={ref}>
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="label-text text-primary mb-3 block">{t("features.label")}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-5 tracking-tight">
            {t("features.title")}{" "}
            <span className="gradient-text">{t("features.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.06 * i }}
              className="enterprise-card p-7 group relative overflow-hidden"
            >
              <span className="absolute top-4 right-5 text-[11px] font-mono text-muted-foreground/30 font-medium select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-11 h-11 rounded-lg bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">
                {t(f.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(f.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
