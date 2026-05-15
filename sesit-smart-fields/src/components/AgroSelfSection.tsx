import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "@/components/ParticlesBackground";
import LazyVideo from "@/components/LazyVideo";
import agroselfVideo from "@/assets/agroSelf/Agroself.mp4";
import { useTranslation } from "react-i18next";

const AgroSelfSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="agroself"
      className="py-24 lg:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground id="agroself-particles" />
      </div>
      <div className="absolute inset-0 bg-background/80 z-[1]" />

      <div className="section-container relative z-10">
        {/* Video + Content side by side */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="enterprise-card overflow-hidden rounded-2xl">
              <LazyVideo
                src={agroselfVideo}
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
            <span className="label-text text-primary inline-flex items-center gap-2">
              <Rocket className="w-3.5 h-3.5" />
              {t("agroselfSection.label")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-5 tracking-tight">
              {t("agroselfSection.introducing")}{" "}
              <span className="gradient-text">AgroSelf</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {t("agroselfSection.desc")}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button size="lg" className="btn-glow" asChild>
                <Link to="/agroself">
                  {t("agroselfSection.learnMore")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border/60 hover:border-primary/40 hover:bg-primary/5" asChild>
                <a
                  href="https://agroself.tn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("agroselfSection.visit")} <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AgroSelfSection;
