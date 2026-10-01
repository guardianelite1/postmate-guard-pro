import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  Facebook,
  FileCheck2,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  SearchCheck,
  Share2,
  ShieldCheck,
  UsersRound,
  X,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/guardian-consulting-hero.jpg";
import planningImage from "@/assets/risk-planning-meeting.jpg";

const logoUrl = "/guardian-elite-logo.png";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Our Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: SearchCheck,
    title: "Security Risk Assessments",
    description: "Identify vulnerabilities, exposure points, and gaps in an existing security environment.",
  },
  {
    icon: ShieldCheck,
    title: "Physical Security Consulting",
    description: "Review entrances, exits, perimeter protection, lighting, surveillance, access control, and other safeguards.",
  },
  {
    icon: FileCheck2,
    title: "Vendor Contract Oversight",
    description: "Review third-party security agreements for performance expectations, contract compliance, and operational alignment.",
  },
  {
    icon: UsersRound,
    title: "HOA & Board Advisory",
    description: "Provide independent security guidance for community boards, residential associations, and property managers.",
  },
];

const approach = [
  { number: "01", title: "Understand", description: "We learn about your organization, property, operations, concerns, and existing security measures." },
  { number: "02", title: "Assess", description: "We evaluate the environment and identify vulnerabilities, gaps, and areas of concern." },
  { number: "03", title: "Analyze", description: "We examine the findings and determine which issues deserve attention based on their potential impact." },
  { number: "04", title: "Recommend", description: "We provide practical recommendations tailored to your specific situation." },
  { number: "05", title: "Plan", description: "We help establish a clear path forward and prioritize security improvements." },
];

const audiences = [
  { title: "Commercial Properties", description: "Clarify physical vulnerabilities and prioritize practical improvements across commercial environments." },
  { title: "Businesses & Organizations", description: "Build a clearer understanding of security exposure, procedures, and planning priorities." },
  { title: "HOAs & Residential Communities", description: "Support boards with objective property assessments and informed security decisions." },
  { title: "Property Managers", description: "Evaluate safeguards, vendor performance, and property-specific operational risk." },
];

const socialLinks = [
  { icon: Instagram, label: "Guardian Elite on Instagram", href: "https://www.instagram.com/guardianelitefl?stkn=MWQzazZmbmRicWw0bQ==" },
  { icon: Facebook, label: "Guardian Elite on Facebook", href: "https://www.facebook.com/share/1FFrUWLMmM/" },
];

const SocialLinks = ({ compact = false }: { compact?: boolean }) => (
  <div className="flex items-center gap-2">
    {socialLinks.map(({ icon: Icon, label, href }) => (
      <Button
        key={label}
        asChild
        variant="ghost"
        size="icon"
        className={compact ? "h-9 w-9 text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-accent-gold" : "h-10 w-10 border border-primary-foreground/20 text-primary-foreground/75 hover:border-accent-gold hover:bg-transparent hover:text-accent-gold"}
      >
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </a>
      </Button>
    ))}
  </div>
);

const FloatingSocial = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {socialLinks.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary shadow-[var(--shadow-card)] transition-all duration-300 ease-out hover:border-accent-gold hover:text-accent-gold ${open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-1 scale-95 opacity-0"}`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </a>
      ))}
      <Button
        type="button"
        size="icon"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close social links" : "Follow Guardian Elite"}
        aria-expanded={open}
        className="h-11 w-11 rounded-full border border-accent-gold/40 bg-primary text-accent-gold shadow-[var(--shadow-elegant)] hover:border-accent-gold hover:bg-primary"
      >
        {open ? <X className="h-5 w-5" /> : <Share2 className="h-5 w-5" strokeWidth={1.5} />}
      </Button>
    </div>
  );
};

const Index = () => {
  const [advisoryType, setAdvisoryType] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    let successMessage = "Thank you — we'll be in touch shortly.";
    if (advisoryType === "hoa-board") {
      successMessage = "Thank you! A board advisory specialist will contact you within one business day.";
    } else if (advisoryType === "vendor-contract") {
      successMessage = "Thank you! Our vendor oversight team will reach out to review your third-party agreements.";
    } else if (advisoryType === "risk-assessment") {
      successMessage = "Thank you! A senior risk advisor will contact you to schedule your property assessment.";
    }

    try {
      const response = await fetch(
        "https://ewcwhhwdnfvowfozkrkc.supabase.co/functions/v1/smart-api",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer sb_publishable_OX0lFjhF8kwOxSFVVtHFBA_vJjmCYXB`,
          },
          body: JSON.stringify({ name, company, email, advisoryType, message }),
        }
      );

      if (!response.ok) throw new Error("Failed to send");

      toast({ title: "Request received", description: successMessage });
      form.reset();
      setAdvisoryType("");
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Something went wrong",
        description: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/10 bg-primary/95 text-primary-foreground backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-4" aria-label="Main navigation">
          <a href="#home" className="shrink-0" aria-label="Guardian Elite home">
            <img src={logoUrl} alt="Guardian Elite Risk & Advisory Services" width={1710} height={920} className="h-14 w-auto object-contain md:h-16" />
          </a>

          <div className="hidden items-center gap-5 lg:flex">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-primary-foreground/75 transition-colors hover:text-accent-gold">
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <SocialLinks compact />
            <Button asChild size="sm" className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90">
              <a href="#contact">Request a Consultation</a>
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-accent-gold md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-primary-foreground/10 bg-primary px-4 pb-6 pt-3 md:hidden">
            <div className="container mx-auto flex flex-col">
              {navigation.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="border-b border-primary-foreground/10 py-3 text-primary-foreground/80">
                  {item.label}
                </a>
              ))}
              <div className="mt-5 flex items-center justify-between gap-4">
                <SocialLinks compact />
                <Button asChild size="sm" className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90">
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Request a Consultation</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero-section relative flex min-h-[100svh] items-end pt-20 text-primary-foreground">
          <img src={heroImage} alt="Security consultant evaluating a commercial property's access points" width={1920} height={1200} className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="hero-overlay absolute inset-0" />
          <div className="container relative mx-auto px-4 pb-8 pt-8 md:pb-10 md:pt-10">
            <div className="max-w-4xl">
              <img src={logoUrl} alt="Guardian Elite Risk & Advisory Services" width={1710} height={920} className="mb-5 hidden h-auto w-72 object-contain sm:block" />
              <p className="mb-3 text-sm font-semibold uppercase text-accent-gold">Security Consulting &amp; Risk Management</p>
              <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-5xl lg:text-6xl">
                Identify Vulnerabilities.<br />Understand Your Risks.<br />Make Informed Security Decisions.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
                Guardian Elite provides professional security consulting and risk advisory services designed to help businesses, properties, and organizations identify vulnerabilities, strengthen their security posture, and make informed decisions.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90">
                  <a href="#contact">Request a Security Consultation <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-primary-foreground/35 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <a href="#services">Explore Our Services</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground md:py-20" aria-label="Guardian Elite philosophy">
          <div className="container mx-auto px-4">
            <blockquote className="mx-auto max-w-4xl border-l-2 border-accent-gold pl-6 md:pl-10">
              <p className="font-display text-3xl leading-tight md:text-5xl">“Security is not a product you buy. It's a discipline you build.”</p>
              <footer className="mt-5 text-sm text-accent-gold">— Founder &amp; Principal Advisor</footer>
            </blockquote>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 py-20 md:py-28">
          <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <p className="section-label">Our Philosophy</p>
              <h2 className="section-title">Security Is More Than a Product.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Effective security begins with understanding. Guardian Elite helps organizations evaluate their security environment, identify vulnerabilities, understand potential risks, and develop practical strategies designed around their unique needs.
              </p>
              <div className="mt-8 border-l-2 border-accent-gold pl-6 text-xl font-medium leading-relaxed text-primary md:text-2xl">
                <p>You don't need more security products.</p>
                <p className="mt-3">You need to understand the risks you actually have and what to do about them.</p>
              </div>
            </div>
            <img src={planningImage} alt="Advisors reviewing property plans during a risk planning meeting" loading="lazy" width={1600} height={1200} className="aspect-[4/3] w-full object-cover shadow-[var(--shadow-elegant)]" />
          </div>
        </section>

        <section id="services" className="scroll-mt-20 bg-secondary/60 py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="section-label">Advisory Disciplines</p>
              <h2 className="section-title">Expert Guidance. Practical Solutions.</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                We take a strategic, risk-focused approach to help organizations identify vulnerabilities, strengthen their security posture, and make informed security decisions.
              </p>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
              {services.map(({ icon: Icon, title, description }) => (
                <article key={title} className="bg-card p-7 md:p-10">
                  <Icon className="h-8 w-8 text-accent-gold" strokeWidth={1.5} />
                  <h3 className="mt-6 font-display text-2xl text-primary">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="scroll-mt-20 bg-primary py-20 text-primary-foreground md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <p className="section-label">Our Approach</p>
              <h2 className="section-title text-primary-foreground">A Clearer Path to Better Security</h2>
            </div>
            <ol className="mt-12 grid gap-0 border-y border-primary-foreground/15 lg:grid-cols-5">
              {approach.map((step) => (
                <li key={step.number} className="border-b border-primary-foreground/15 px-5 py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <span className="text-sm font-semibold text-accent-gold">{step.number}</span>
                  <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/65">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="industries" className="scroll-mt-20 py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-label">Who We Help</p>
              <h2 className="section-title">Security Consulting for Every Environment</h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map((audience, index) => (
                <Card key={audience.title} className="border-border shadow-none transition-colors hover:border-accent-gold/60">
                  <CardContent className="p-6">
                    <span className="text-sm font-semibold text-accent-gold">0{index + 1}</span>
                    <h3 className="mt-5 font-display text-2xl text-primary">{audience.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{audience.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/50 py-20 md:py-28">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="section-label">The Guardian Elite Difference</p>
              <h2 className="section-title">Independent. Practical. Risk-Focused.</h2>
              <p className="mt-6 font-display text-2xl text-primary md:text-3xl">“We don't start with a product. We start with the problem.”</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Guardian Elite focuses on understanding the security environment first, identifying vulnerabilities, and developing practical recommendations based on each client's specific needs.
              </p>
            </div>
            <ul className="grid content-center gap-3 sm:grid-cols-2">
              {["Identify security vulnerabilities", "Prioritize security improvements", "Make informed security decisions", "Improve security procedures", "Evaluate security investments", "Develop a clearer security strategy"].map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-border py-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-gold" />
                  <span className="font-medium text-primary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground md:py-20">
          <div className="container mx-auto flex flex-col items-start justify-between gap-8 px-4 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl md:text-5xl">Don't Guess Where You're Vulnerable.</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-primary-foreground/70">Let Guardian Elite help you understand your security environment, identify areas of concern, and develop a clearer path forward.</p>
            </div>
            <Button size="lg" asChild className="shrink-0 bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90">
              <a href="#contact">Request a Security Consultation <ChevronRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 py-20 md:py-28">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="section-label">Contact Guardian Elite</p>
              <h2 className="section-title">Request a Security Consultation</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">Tell us about your property, organization, or security concern. We’ll follow up to discuss the right next step.</p>
              <div className="mt-8 space-y-4 text-primary">
                <a href="mailto:Info@guardianelitefl.com" className="flex items-center gap-3 transition-colors hover:text-accent-gold"><Mail className="h-5 w-5 text-accent-gold" />Info@guardianelitefl.com</a>
                <a href="tel:+14074349782" className="flex items-center gap-3 transition-colors hover:text-accent-gold"><Phone className="h-5 w-5 text-accent-gold" />+1 (407) 434-9782</a>
                <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-accent-gold" />Florida</div>
              </div>
              <Button asChild variant="outline" size="lg" className="mt-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a href="tel:+14074349782"><Phone className="mr-2 h-4 w-4" />Call Guardian Elite</a>
              </Button>
            </div>

            <Card className="border-border shadow-[var(--shadow-elegant)]">
              <CardContent className="p-6 md:p-9">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium">Full Name</label>
                      <input id="name" required name="name" autoComplete="name" className="form-control" />
                    </div>
                    <div>
                      <label htmlFor="company" className="mb-2 block text-sm font-medium">Company / Organization</label>
                      <input id="company" name="company" autoComplete="organization" className="form-control" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                    <input id="email" type="email" required name="email" autoComplete="email" className="form-control" />
                  </div>
                  <div>
                    <label htmlFor="advisoryType" className="mb-2 block text-sm font-medium">What type of advisory do you need?</label>
                    <select id="advisoryType" required value={advisoryType} onChange={(e) => setAdvisoryType(e.target.value)} className="form-control">
                      <option value="" disabled>Select an option</option>
                      <option value="hoa-board">HOA &amp; Board Advisory</option>
                      <option value="vendor-contract">Vendor Contract Oversight</option>
                      <option value="risk-assessment">Property Risk Assessment</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">How can we help?</label>
                    <textarea id="message" rows={5} required name="message" className="form-control h-auto py-3" />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Request a Consultation</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <FloatingSocial />

      <footer className="border-t border-primary-foreground/10 bg-primary text-primary-foreground">
        <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1fr]">
          <div>
            <img src={logoUrl} alt="Guardian Elite Risk & Advisory Services" loading="lazy" width={1710} height={920} className="h-auto w-60 object-contain" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/65">Security Consulting &amp; Risk Management for organizations, properties, communities, and decision-makers.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-accent-gold">Navigation</h3>
            <div className="mt-4 flex flex-col gap-3">
              {navigation.slice(1).map((item) => <a key={item.label} href={item.href} className="text-sm text-primary-foreground/65 transition-colors hover:text-accent-gold">{item.label}</a>)}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-accent-gold">Contact</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/65">
              <a href="mailto:Info@guardianelitefl.com" className="transition-colors hover:text-accent-gold">Info@guardianelitefl.com</a>
              <a href="tel:+14074349782" className="transition-colors hover:text-accent-gold">+1 (407) 434-9782</a>
              <span>Florida</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-accent-gold">Follow Guardian Elite</h3>
            <div className="mt-3"><SocialLinks /></div>
            <Button asChild size="sm" className="mt-5 bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90">
              <a href="#contact">Request a Consultation</a>
            </Button>
          </div>
        </div>
        <div className="container mx-auto border-t border-primary-foreground/10 px-4 py-7">
          <p className="mx-auto max-w-4xl text-center text-xs leading-relaxed text-primary-foreground/45">
            <strong>Notice:</strong> Guardian Elite operates strictly as an independent management and administrative consultancy. We provide unbiased risk assessments, structural design reviews, and vendor performance audits. Guardian Elite does not provide direct physical guard placement, active patrols, or protective law enforcement services.
          </p>
          <p className="mt-5 text-center text-xs text-primary-foreground/45">© {new Date().getFullYear()} Guardian Elite Security Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;