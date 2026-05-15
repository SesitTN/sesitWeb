import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import ParticlesBackground from "@/components/ParticlesBackground";
import LazyVideo from "@/components/LazyVideo";
import telmaVideo from "@/assets/telmaVideo.mp4";

const TelmaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  const features = [
    t("telma.homeF1"),
    t("telma.homeF2"),
    t("telma.homeF3"),
    t("telma.homeF4"),
  ];

  return (
    <section id="telma" className="py-24 lg:py-32 relative min-h-screen" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <LazyVideo
          src={telmaVideo}
          rootMargin="300px"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto opacity-[0.25]"
        />
      </div>
      <div className="absolute inset-0 z-[1]">
        <ParticlesBackground id="telma-particles" />
      </div>
      <div className="absolute inset-0 bg-background/50 z-[2]" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="enterprise-card overflow-hidden rounded-2xl">
              <LazyVideo
                src={telmaVideo}
                rootMargin="150px"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="label-text text-primary">
              {t("telma.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-5 tracking-tight">
              {t("telma.homeTitle")} <span className="gradient-text">TELMA</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
              {t("telma.homeDesc")}
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button size="lg" className="btn-glow" asChild>
              <Link to="/telma">
                {t("telma.homeBtn")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TelmaSection;
