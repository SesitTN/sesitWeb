import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Sprout, Globe, Flag } from "lucide-react";
import { useTranslation } from "react-i18next";

const impactStats = [
  { value: 30, suffix: "%" },
  { value: 20, suffix: "%" },
  { value: 25, suffix: "%" },
];

const AnimatedStat = ({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          setTimeout(() => {
            const steps = 40;
            const inc = value / steps;
            let cur = 0;
            const t = setInterval(() => {
              cur += inc;
              if (cur >= value) { setCount(value); clearInterval(t); }
              else setCount(Math.floor(cur));
            }, 40);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-4xl sm:text-5xl font-bold gradient-text">
        {count}{suffix}
      </span>
      <div className="w-10 h-px bg-border/70 mx-auto my-2.5" />
      <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wide">{label}</p>
    </div>
  );
};

const ImpactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  const statLabels = [
    t("impact.waterSavings"),
    t("impact.yieldIncrease"),
    t("impact.costReduction"),
  ];

  const impactAreas = [
    {
      icon: Sprout,
      titleKey: "impact.farmersTitle",
      points: ["impact.farmersP1","impact.farmersP2","impact.farmersP3","impact.farmersP4"],
    },
    {
      icon: Globe,
      titleKey: "impact.envTitle",
      points: ["impact.envP1","impact.envP2","impact.envP3","impact.envP4"],
    },
    {
      icon: Flag,
      titleKey: "impact.tunisiaTitle",
      points: ["impact.tunisiaP1","impact.tunisiaP2","impact.tunisiaP3","impact.tunisiaP4"],
    },
  ];

  return (
    <section id="impact" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-secondary/20 pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="label-text text-primary mb-3 block">{t("impact.label")}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-5 tracking-tight">
            {t("impact.title")}{" "}
            <span className="gradient-text">{t("impact.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t("impact.subtitle")}
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {impactStats.map((s, i) => (
            <AnimatedStat key={i} value={s.value} suffix={s.suffix} label={statLabels[i]} delay={i * 100} />
          ))}
        </div>

        {/* Impact Areas */}
        <div className="grid sm:grid-cols-3 gap-6">
          {impactAreas.map((area, i) => (
            <motion.div
              key={area.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="enterprise-card p-7 text-center sm:text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center mb-4">
                <area.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">
                {t(area.titleKey)}
              </h3>
              <ul className="space-y-2.5">
                {area.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {t(p)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
