import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Cpu, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import logo3D from "@/assets/logo3D.mp4";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav.home"), href: "/#home" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.features"), href: "/#features" },
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.partners"), href: "/partners" },
    { label: t("nav.journey"), href: "/journey" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  const solutions = [
    {
      label: t("nav.telma"),
      href: "/telma",
      icon: Cpu,
      desc: "Smart irrigation & field monitoring",
    },
    {
      label: t("nav.agroself"),
      href: "/agroself",
      icon: Sprout,
      desc: "Autonomous greenhouse system",
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSolutionsOpen(false);
  }, [location.pathname]);

  const NavItem = ({ link }: { link: (typeof navLinks)[number] }) => {
    const cls =
      "text-sm font-medium transition-colors duration-200 text-muted-foreground hover:text-foreground";
    if (link.href.startsWith("/") && !link.href.startsWith("/#")) {
      return (
        <Link to={link.href} className={cls}>
          {link.label}
        </Link>
      );
    }
    const href = isHome ? link.href.replace(/^\/#/, "#") : link.href;
    return (
      <a href={href} className={cls}>
        {link.label}
      </a>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 shadow-sm bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-background/70 backdrop-blur-md"
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 lg:h-[68px]">
        {/* Logo */}
        <a href={isHome ? "#home" : "/"} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-black/5">
            <video
              src={logo3D}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">SESIT</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {/* Home / About first */}
          {navLinks.slice(0, 2).map((link) => (
            <NavItem key={link.href} link={link} />
          ))}

          {/* Our Solutions dropdown */}
          <div
            ref={solutionsRef}
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors duration-200"
            >
              {t("nav.ourSolutions")}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  solutionsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64"
                >
                  <div className="rounded-xl border border-border/50 bg-background/98 backdrop-blur-xl shadow-lg overflow-hidden">
                    <div className="px-3 py-2 border-b border-border/40">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        SESIT Solutions
                      </p>
                    </div>
                    {solutions.map((sol) => {
                      const Icon = sol.icon;
                      return (
                        <Link
                          key={sol.href}
                          to={sol.href}
                          onClick={() => setSolutionsOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 hover:bg-primary/5 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {sol.label}
                            </p>
                            <p className="text-xs text-muted-foreground leading-tight">
                              {sol.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Remaining links */}
          {navLinks.slice(2).map((link) => (
            <NavItem key={link.href} link={link} />
          ))}
        </nav>

        {/* Desktop: Language switcher + CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild size="sm" className="btn-glow font-medium">
            <Link to="/agroself">{t("nav.requestDemo")}</Link>
          </Button>
        </div>

        {/* Mobile: Language switcher + hamburger */}
        <div className="lg:hidden flex items-center gap-1">
          <LanguageSwitcher />
          <button
            className="p-2 -mr-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="section-container py-5 flex flex-col gap-1">
              {/* Home & About */}
              {navLinks.slice(0, 2).map((link) => {
                const cls =
                  "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/60";
                if (link.href.startsWith("/") && !link.href.startsWith("/#")) {
                  return (
                    <Link key={link.href} to={link.href} className={cls} onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </Link>
                  );
                }
                const href = isHome ? link.href.replace(/^\/#/, "#") : link.href;
                return (
                  <a key={link.href} href={href} className={cls} onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </a>
                );
              })}

              {/* Our Solutions accordion */}
              <div>
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  {t("nav.ourSolutions")}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileSolutionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileSolutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-primary/20 pl-3">
                        {solutions.map((sol) => {
                          const Icon = sol.icon;
                          return (
                            <Link
                              key={sol.href}
                              to={sol.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                            >
                              <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                              {sol.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Remaining links */}
              {navLinks.slice(2).map((link) => {
                const cls =
                  "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/60";
                if (link.href.startsWith("/") && !link.href.startsWith("/#")) {
                  return (
                    <Link key={link.href} to={link.href} className={cls} onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </Link>
                  );
                }
                const href = isHome ? link.href.replace(/^\/#/, "#") : link.href;
                return (
                  <a key={link.href} href={href} className={cls} onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </a>
                );
              })}

              <div className="pt-3 border-t border-border/40 mt-2">
                <Button asChild className="w-full btn-glow">
                  <Link to="/agroself" onClick={() => setMobileOpen(false)}>
                    {t("nav.requestDemo")}
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
