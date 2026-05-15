import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo3D from "@/assets/logo3D.mp4";

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    [t("footer.products")]: [
      { label: t("footer.telmaLink"),    href: "/telma" },
      { label: t("footer.agroselfLink"), href: "/agroself" },
      { label: t("footer.sensorsLink"),  href: "/#features" },
    ],
    [t("footer.company")]: [
      { label: t("footer.aboutLink"),    href: "/#about" },
      { label: t("footer.partnersLink"), href: "/partners" },
      { label: t("footer.impactLink"),   href: "/#impact" },
    ],
    [t("footer.legal")]: [
      { label: t("footer.privacyLink"), href: "#" },
      { label: t("footer.termsLink"),   href: "#" },
    ],
  };

  return (
    <footer className="border-t border-border/50 bg-background py-16">
      <div className="section-container">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2 mb-4 lg:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-black/5 flex-shrink-0">
                <video src={logo3D} autoPlay muted loop playsInline className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-foreground">SESIT</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4 text-sm">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SESIT. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
