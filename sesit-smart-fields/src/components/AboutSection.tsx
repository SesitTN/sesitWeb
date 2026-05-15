import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Network, Lightbulb, Leaf, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  const values = [
    { icon: Network,   titleKey: "about.val1Title", descKey: "about.val1Desc" },
    { icon: Leaf,      titleKey: "about.val2Title", descKey: "about.val2Desc" },
    { icon: BarChart3, titleKey: "about.val3Title", descKey: "about.val3Desc" },
    { icon: Lightbulb, titleKey: "about.val4Title", descKey: "about.val4Desc" },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <span className="text-primary text-xs font-medium tracking-wider uppercase">
              {t("about.label")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6 leading-tight">
              {t("about.title")}{" "}
              <span className="gradient-text">{t("about.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-5">
              {t("about.para1")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.para2")}
            </p>
          </motion.div>

          {/* Right - Value Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {values.map((v, i) => (
              <motion.div
                key={v.titleKey}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="glass-card p-6 hover:border-primary/30 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1.5">{t(v.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(v.descKey)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
