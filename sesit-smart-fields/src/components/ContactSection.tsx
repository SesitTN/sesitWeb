import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const contactInfo = [
    { icon: Mail,   label: t("contact.emailLabel"),    value: "contact@sesit.tn" },
    { icon: Phone,  label: t("contact.phoneLabel"),    value: t("55 879 318") },
    { icon: MapPin, label: t("contact.locationLabel"), value: "Tunis, Tunisia" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("https://formsubmit.co/ajax/contact.sesit@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _captcha: "false" }),
      });

      if (res.ok) {
        toast({ title: t("contact.toastTitle"), description: t("contact.toastDesc") });
        form.reset();
      } else {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Network error. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <span className="label-text text-primary mb-3 block">{t("contact.label")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-5 tracking-tight">
              {t("contact.title")}{" "}
              <span className="gradient-text">{t("contact.titleHighlight")}</span>{" "}
              {t("contact.titleSuffix")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
              {t("contact.description")}
            </p>

            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">{label}</p>
                    <p className="text-foreground font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex justify-center"
          >
            <form onSubmit={handleSubmit} className="enterprise-card p-8 space-y-5 w-full max-w-md">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground font-medium tracking-wide uppercase mb-2 block">
                    {t("contact.nameLabel")}
                  </label>
                  <Input name="name" placeholder={t("contact.namePlaceholder")} required maxLength={100} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium tracking-wide uppercase mb-2 block">
                    {t("contact.emailInputLabel")}
                  </label>
                  <Input name="email" type="email" placeholder="you@email.com" required maxLength={255} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground font-medium tracking-wide uppercase mb-2 block">
                    {t("contact.phoneInputLabel")}
                  </label>
                  <Input name="phone" type="tel" placeholder="+216..." maxLength={20} />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium tracking-wide uppercase mb-2 block">
                  {t("contact.messageLabel")}
                </label>
                <Textarea name="message" placeholder={t("contact.messagePlaceholder")} rows={4} required maxLength={1000} />
              </div>
              <Button type="submit" className="w-full btn-glow" size="lg" disabled={loading}>
                {loading ? t("contact.sending") : (
                  <>{t("contact.send")} <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
