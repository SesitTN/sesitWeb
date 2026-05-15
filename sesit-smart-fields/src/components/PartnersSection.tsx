import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

const partners: { name: string; logo: string }[] = [
  { name: "Sup'Com", logo: supcomLogo },
  { name: "INAT", logo: inatLogo },
  { name: "ENIT – LACS", logo: enitLogo },
  { name: "Smart Tunisian Technoparks", logo: s2tLogo },
  { name: "SHANTI", logo: chanLogo },
  { name: "APIA", logo: apiaLogo },
  { name: "INGREF", logo: ingrefLogo },
  { name: "IRESA", logo: iresaLogo },
  { name: "Institut de l'Olivier", logo: olivierLogo },
];

const scrollItems = [...partners, ...partners];

const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  return (
    <section id="partners" className="py-20 lg:py-28 bg-secondary/20 overflow-hidden" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-primary text-xs font-medium tracking-wider uppercase inline-flex items-center gap-2 mb-3">
            <Handshake className="w-4 h-4" />
            {t("partners.label")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            {t("partners.trustedBy")}{" "}
            <span className="gradient-text">{t("partners.leadingInstitutions")}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("partners.partnerSubtitle")}
          </p>
        </motion.div>

        {/* Scrolling logo strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden mb-10"
        >
          <div className="carousel-track">
            {scrollItems.map((partner, i) => (
              <div key={i} className="flex-shrink-0 mx-4 sm:mx-6">
                <div className="glass-card w-44 sm:w-52 h-24 sm:h-28 flex flex-col items-center justify-center gap-2 px-4 hover:border-primary/30 transition-all duration-300 hover:shadow-md group">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors overflow-hidden">
                    <img src={partner.logo} alt={partner.name + " logo"} className="object-contain w-full h-full" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/partners">
              {t("partners.meetPartners")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
