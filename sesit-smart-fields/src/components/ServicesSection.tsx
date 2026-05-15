import { motion } from "framer-motion";
import { HeadphonesIcon, FlaskConical, PhoneCall, Wrench, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

const serviceIcons = [FlaskConical, Cpu, Wrench, PhoneCall, HeadphonesIcon];
const serviceAccents = [
  "from-emerald-500 to-green-400",
  "from-cyan-500 to-teal-400",
  "from-blue-500 to-indigo-400",
  "from-violet-500 to-purple-400",
  "from-amber-500 to-orange-400",
];
const serviceGlows = [
  "hsl(161 78% 32% / 0.15)",
  "hsl(199 80% 44% / 0.15)",
  "hsl(220 91% 54% / 0.15)",
  "hsl(262 83% 58% / 0.15)",
  "hsl(38 92% 50% / 0.15)",
];
const serviceTitleKeys = ["services.s1Title","services.s2Title","services.s3Title","services.s4Title","services.s5Title"];
const serviceDescKeys  = ["services.s1Desc", "services.s2Desc", "services.s3Desc", "services.s4Desc", "services.s5Desc"];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, hsl(222 47% 11%) 0%, hsl(222 47% 14%) 100%)" }} />
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(161 78% 32% / 0.12) 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(199 80% 44% / 0.10) 0%, transparent 65%)", filter: "blur(90px)" }} />
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(161 78% 45% / 0.35) 40%, hsl(199 80% 55% / 0.35) 60%, transparent 100%)" }} />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span {...fade(0.05)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full border"
            style={{ color: "hsl(161 78% 55%)", borderColor: "hsl(161 78% 40% / 0.3)", background: "hsl(161 78% 32% / 0.08)" }}
          >
            <Wrench className="w-3.5 h-3.5" /> {t("services.label")}
          </motion.span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            {t("services.title")}{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, hsl(161 78% 55%) 0%, hsl(199 80% 60%) 100%)" }}>
              {t("services.titleHighlight")}
            </span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed">{t("services.subtitle")}</p>
        </motion.div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceTitleKeys.map((titleKey, i) => {
            const Icon = serviceIcons[i];
            return (
              <motion.div
                key={titleKey}
                {...fade(0.08 + i * 0.07)}
                className="relative group rounded-2xl p-px overflow-hidden"
                style={{ background: "linear-gradient(135deg, hsl(161 78% 40% / 0.2) 0%, hsl(199 80% 50% / 0.08) 100%)" }}
              >
                <div className="relative h-full rounded-2xl p-7 flex flex-col gap-4 transition-colors duration-300"
                  style={{ background: "linear-gradient(135deg, hsl(222 47% 13%) 0%, hsl(222 47% 11%) 100%)" }}>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${serviceGlows[i]} 0%, transparent 65%)` }} />
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${serviceAccents[i]} shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute top-6 right-6 text-4xl font-black leading-none select-none pointer-events-none"
                    style={{ color: "hsl(220 40% 100% / 0.04)" }}>
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">{t(titleKey)}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{t(serviceDescKeys[i])}</p>
                  </div>
                  <div className={`mt-auto h-px w-0 group-hover:w-full transition-all duration-500 rounded-full bg-gradient-to-r ${serviceAccents[i]}`} />
                </div>
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            {...fade(0.08 + serviceTitleKeys.length * 0.07)}
            className="sm:col-span-2 lg:col-span-3 rounded-2xl p-px"
            style={{ background: "linear-gradient(90deg, hsl(161 78% 40% / 0.4) 0%, hsl(199 80% 50% / 0.25) 50%, hsl(220 91% 54% / 0.15) 100%)" }}
          >
            <div className="rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-6"
              style={{ background: "linear-gradient(90deg, hsl(222 47% 13%) 0%, hsl(222 47% 12%) 100%)" }}>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "hsl(161 78% 55%)" }}>
                  {t("services.ctaQuestion")}
                </p>
                <h3 className="text-xl font-bold text-white">{t("services.ctaText")}</h3>
              </div>
              <a href="#contact"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
                style={{ background: "linear-gradient(90deg, hsl(161 78% 32%) 0%, hsl(199 80% 38%) 100%)", boxShadow: "0 0 24px hsl(161 78% 32% / 0.4)" }}>
                {t("services.ctaBtn")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
