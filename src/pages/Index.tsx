import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, FileSearch, Users, AlertTriangle, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-security.jpg";

const services = [
  { icon: Shield, title: "Risk Assessment", desc: "Comprehensive evaluation of physical and operational vulnerabilities across your organization." },
  { icon: Eye, title: "Surveillance Strategy", desc: "Design and audit of CCTV, access control, and monitoring systems tailored to your environment." },
  { icon: FileSearch, title: "Security Audits", desc: "Independent reviews of policies, procedures, and compliance with industry standards." },
  { icon: Users, title: "Personnel Training", desc: "Training programs for security staff, executives, and employees on threat awareness and response." },
  { icon: AlertTriangle, title: "Crisis Response Planning", desc: "Emergency protocols, business continuity, and incident response frameworks." },
  { icon: Lock, title: "Executive Protection Advisory", desc: "Strategic guidance for high-profile individuals and corporate leadership protection programs." },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "400+", label: "Clients Protected" },
  { value: "30+", label: "Countries Served" },
  { value: "24/7", label: "Advisory Support" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <nav className="container mx-auto flex items-center justify-between h-16 px-4">
          <a href="#home" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-primary">Guardian Elite</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#why" className="text-muted-foreground hover:text-primary transition-colors">Why Us</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <Button asChild size="sm">
            <a href="#contact">Get a Consultation</a>
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center pt-16">
        <img
          src={heroImage}
          alt="Security consultant overlooking city skyline"
          width={1920}
          height={1088}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container relative mx-auto px-4 py-24 text-primary-foreground">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full border border-accent-gold/40 text-accent-gold text-xs font-medium tracking-wider uppercase mb-6">
              Trusted Security Advisory
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Protecting What Matters Most
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-2xl">
              Strategic security consulting for businesses, executives, and institutions. We turn risk into resilience with expertise refined over decades in the field.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90">
                <a href="#contact">Request a Consultation</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href="#services">Explore Services</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-accent-gold text-sm font-semibold tracking-wider uppercase">Our Services</span>
            <h2 className="text-3xl md:text-5xl mt-3 mb-4">Comprehensive Security Solutions</h2>
            <p className="text-muted-foreground text-lg">
              From risk assessments to crisis response, we deliver tailored advisory services that meet the highest standards.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="border-border hover:border-accent-gold/50 transition-all hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-accent-gold text-sm font-semibold tracking-wider uppercase">About Us</span>
            <h2 className="text-3xl md:text-5xl mt-3 mb-6">Experience You Can Trust</h2>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Guardian Elite Security Services brings together former law enforcement, military, and corporate security leaders with decades of combined frontline experience.
            </p>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              We don't sell hardware. We don't push products. We provide independent, vendor-neutral guidance designed to protect your people, assets, and reputation.
            </p>
            <ul className="space-y-3">
              {[
                "Independent, vendor-neutral expertise",
                "Confidential and discreet engagements",
                "Customized strategies, not templates",
                "Global reach with local insight",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-primary p-10 flex flex-col justify-between text-primary-foreground" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
              <Shield className="h-16 w-16 text-accent-gold" />
              <div>
                <p className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
                  "Security is not a product you buy. It's a discipline you build."
                </p>
                <p className="text-primary-foreground/70 text-sm">— Founder & Principal Advisor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-accent-gold text-sm font-semibold tracking-wider uppercase">Why Choose Us</span>
            <h2 className="text-3xl md:text-5xl mt-3 mb-4">A Different Kind of Security Firm</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Discretion", desc: "Every engagement is handled with the utmost confidentiality and professionalism." },
              { num: "02", title: "Expertise", desc: "Our advisors have led security operations for Fortune 500s, governments, and private clients." },
              { num: "03", title: "Results", desc: "Practical, actionable recommendations — not theoretical reports that sit on a shelf." },
            ].map((b) => (
              <div key={b.num} className="border-l-2 border-accent-gold pl-6">
                <div className="text-accent-gold font-bold text-sm mb-2">{b.num}</div>
                <h3 className="text-2xl mb-3">{b.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-28 bg-primary text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-accent-gold text-sm font-semibold tracking-wider uppercase">Get in Touch</span>
            <h2 className="text-3xl md:text-5xl mt-3 mb-6">Ready to Strengthen Your Security?</h2>
            <p className="text-primary-foreground/85 text-lg mb-8">
              Schedule a confidential consultation with one of our senior advisors. We respond within one business day.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent-gold" />
                <span>contact@guardianelitesecurity.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent-gold" />
                <span>+1 (555) 010-2025</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent-gold" />
                <span>Global offices · Headquartered in New York</span>
              </div>
            </div>
          </div>
          <Card className="bg-background text-foreground">
            <CardContent className="p-6 md:p-8">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thank you — we'll be in touch shortly."); }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                    <input required className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Company</label>
                    <input className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <input type="email" required className="w-full h-10 px-3 rounded-md border border-input bg-background" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">How can we help?</label>
                  <textarea rows={4} required className="w-full px-3 py-2 rounded-md border border-input bg-background" />
                </div>
                <Button type="submit" size="lg" className="w-full">Request Consultation</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground/70 border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent-gold" />
            <span className="font-semibold text-primary-foreground">Guardian Elite Security Services</span>
          </div>
          <p>© {new Date().getFullYear()} Guardian Elite Security Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
