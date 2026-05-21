import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Activity, Zap, Cpu, Smartphone, Brain, ChevronRight, Users, X, Menu, Star, Search, Lightbulb, Rocket, HeartHandshake, CheckCircle2, Mail, Building2, MessageSquare, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/ThemeProvider";
import VirtualAssistant from "@/components/VirtualAssistant";

import heroBg from "@/assets/images/hero-bg.png";
import serviceCloud from "@/assets/images/service-cloud.png";
import serviceEngineering from "@/assets/images/service-engineering.png";
import serviceSecurity from "@/assets/images/service-security.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

function useCountUp(target: number, duration = 1800, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

const stats = [
  { end: 150, suffix: "+", label: "Projects Delivered" },
  { end: 98, suffix: "%", label: "Client Satisfaction" },
  { end: 12, suffix: "+", label: "Years of Expertise" },
  { end: 24, suffix: "/7", label: "Ongoing Support" },
];

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, ref } = useCountUp(stat.end);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center px-4"
    >
      <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-primary tracking-wider uppercase font-medium">{stat.label}</div>
    </motion.div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const services = [
    "Business Consultancy",
    "AI Services",
    "Mobile App Development",
    "Digital Transformation",
    "Other",
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.service || !form.message) return;
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-primary/30 bg-primary/5 rounded-sm p-12 text-center"
      >
        <div className="h-16 w-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-white mb-3">Message Received</h3>
        <p className="text-muted-foreground mb-8">
          Thank you, <span className="text-white font-medium">{form.name}</span>. We'll be in touch within one business day.
        </p>
        <Button
          variant="outline"
          className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground rounded-sm font-heading tracking-widest uppercase text-sm"
          onClick={() => { setStatus("idle"); setForm({ name: "", email: "", company: "", service: "", message: "" }); }}
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-card/50 backdrop-blur rounded-sm p-8 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-heading tracking-wide text-muted-foreground uppercase">
            Full Name <span className="text-accent">*</span>
          </Label>
          <Input
            id="name"
            data-testid="input-name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
            className="bg-background/50 border-border focus:border-primary rounded-sm h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-heading tracking-wide text-muted-foreground uppercase">
            Email <span className="text-accent">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            data-testid="input-email"
            placeholder="jane@company.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
            className="bg-background/50 border-border focus:border-primary rounded-sm h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="text-sm font-heading tracking-wide text-muted-foreground uppercase flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5" /> Company
        </Label>
        <Input
          id="company"
          data-testid="input-company"
          placeholder="Your company name (optional)"
          value={form.company}
          onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
          className="bg-background/50 border-border focus:border-primary rounded-sm h-12"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-heading tracking-wide text-muted-foreground uppercase">
          Service Interested In <span className="text-accent">*</span>
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {services.map(s => (
            <button
              key={s}
              type="button"
              data-testid={`button-service-${s.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setForm(f => ({ ...f, service: s }))}
              className={`text-xs font-heading tracking-wide px-3 py-2.5 rounded-sm border transition-all duration-200 text-left ${
                form.service === s
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background/30 text-muted-foreground hover:border-primary/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-heading tracking-wide text-muted-foreground uppercase flex items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5" /> Message <span className="text-accent">*</span>
        </Label>
        <Textarea
          id="message"
          data-testid="input-message"
          placeholder="Tell us about your project, goals, or challenges..."
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          required
          rows={5}
          className="bg-background/50 border-border focus:border-primary rounded-sm resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-4 py-3">{error}</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        data-testid="button-submit-contact"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 rounded-sm font-heading tracking-widest uppercase text-sm shadow-[0_0_30px_rgba(255,167,38,0.2)] disabled:opacity-60"
      >
        {status === "submitting" ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
            Sending...
          </span>
        ) : (
          <>Send Message <ArrowRight className="ml-2 h-4 w-4" /></>
        )}
      </Button>
    </form>
  );
}

const techStack = [
  { name: "OpenAI" },
  { name: "React" },
  { name: "Node.js" },
  { name: "React Native" },
  { name: "Python" },
  { name: "TensorFlow" },
  { name: "AWS" },
  { name: "TypeScript" },
  { name: "Flutter" },
  { name: "PostgreSQL" },
];

const processSteps = [
  { step: "01", title: "Discover", icon: Search, desc: "We start by understanding your business — your goals, challenges, users, and competitive landscape." },
  { step: "02", title: "Strategise", icon: Lightbulb, desc: "We design a clear roadmap with the right technology choices, priorities, and measurable outcomes." },
  { step: "03", title: "Build", icon: Rocket, desc: "Our team delivers your solution in focused sprints with full transparency at every milestone." },
  { step: "04", title: "Support", icon: HeartHandshake, desc: "Post-launch, we stay close — iterating, optimising, and scaling alongside your business." },
];

const testimonials = [
  {
    quote: "Almic Solutions transformed how we use data. Their AI consultancy work gave us insights we hadn't imagined possible, and the implementation was seamless.",
    name: "Rachel O.",
    role: "Head of Operations, FinServ Group",
    stars: 5,
  },
  {
    quote: "The mobile app they built for us exceeded expectations. Clean, fast, and delivered on time. Our users love it and our download ratings speak for themselves.",
    name: "James T.",
    role: "Founder, RetailEdge",
    stars: 5,
  },
  {
    quote: "Their consultancy team quickly identified the bottlenecks we'd been wrestling with for months. Practical, decisive, and genuinely invested in our success.",
    name: "Amara D.",
    role: "CEO, LogiStream",
    stars: 5,
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#process" },
    { label: "Why Us", href: "#expertise" },
    { label: "Contact", href: "#cta" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? "bg-background/90 backdrop-blur-md border-border py-2 shadow-lg shadow-black/50" : "bg-transparent py-4"
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <img
            src="/almic-logo.png"
            alt="Almic Solutions"
            className="h-20 object-contain mix-blend-lighten contrast-125"
          />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="hover:text-primary transition-colors">{link.label}</a>
            ))}
            <button
              data-testid="button-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-sm font-heading tracking-wider">
              Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button
              data-testid="button-theme-toggle-mobile"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              data-testid="button-mobile-menu"
              className="text-foreground hover:text-primary transition-colors p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-card border-l border-border z-50 flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-10">
                <img src="/almic-logo.png" alt="Almic Solutions" className="h-12 object-contain mix-blend-lighten contrast-125" />
                <button
                  data-testid="button-close-menu"
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-xl text-foreground hover:text-primary transition-colors tracking-wide"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto">
                <Button className="w-full bg-primary text-primary-foreground rounded-sm font-heading tracking-widest uppercase" onClick={() => setMobileOpen(false)}>
                  Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Circuit Background"
            className={`w-full h-full object-cover transition-all duration-500 ${
              theme === "dark" ? "opacity-30 mix-blend-screen" : "opacity-10 mix-blend-multiply"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-accent font-heading font-semibold tracking-widest text-sm uppercase">Strategy. Technology. Growth.</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 text-foreground">
                Smart Solutions <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Powered by AI.</span> <br />
                Built for You.
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-light">
                Almic Solutions delivers expert consultancy, cutting-edge AI services, and bespoke mobile app development — helping businesses move faster, think smarter, and scale further.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 rounded-sm font-heading tracking-widest uppercase text-sm group" data-testid="button-start-project">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-white/5 h-14 px-8 rounded-sm font-heading tracking-widest uppercase text-sm" data-testid="button-explore-services">
                  Explore Services
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
      </section>

      {/* Stats — Animated Counters */}
      <section className="border-y border-border/50 bg-card/30 backdrop-blur-sm relative z-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-border/0 md:divide-border/50">
            {stats.map((stat, i) => (
              <StatItem key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Core Capabilities</h2>
              <p className="text-muted-foreground max-w-xl text-lg">Strategy to execution — our services cover every dimension of modern business transformation.</p>
            </div>
            <Button variant="link" className="text-accent hover:text-accent/80 font-heading tracking-widest uppercase p-0 group">
              View All Services <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Business Consultancy", desc: "Strategic guidance to help your business identify opportunities, streamline operations, and make confident, data-driven decisions.", img: serviceCloud, icon: Users },
              { title: "AI Services", desc: "Custom AI solutions — from intelligent automation and predictive analytics to LLM-powered products that give your business a real edge.", img: serviceEngineering, icon: Brain },
              { title: "Mobile App Development", desc: "Polished, high-performance mobile applications for iOS and Android, crafted from concept to deployment with your users in mind.", img: serviceSecurity, icon: Smartphone },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group border border-border bg-card rounded-sm overflow-hidden hover:border-primary/50 transition-colors duration-500"
                data-testid={`card-service-${i}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur border border-border p-3 rounded-sm">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
                  <a href="#cta" className="inline-flex items-center text-sm font-heading tracking-widest text-primary uppercase hover:text-white transition-colors group/link">
                    Get Started <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section id="process" className="py-32 bg-secondary/30 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="h-px w-10 bg-accent" />
              <span className="text-accent font-heading font-semibold tracking-widest text-sm uppercase">Our Process</span>
              <div className="h-px w-10 bg-accent" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl font-bold text-white mb-6"
            >
              How We Work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              A structured, transparent process designed to deliver results you can rely on — every time.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
                data-testid={`card-process-${i}`}
              >
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors z-10 relative">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 font-heading text-xs font-bold text-accent bg-background border border-accent/30 rounded-full w-6 h-6 flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="expertise" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Almic Solutions</h2>
            <p className="text-muted-foreground text-lg">We partner with businesses at every stage — from early-stage startups to established enterprises — delivering solutions that are practical, scalable, and built to last.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Strategic Insight", icon: Zap, desc: "We analyse your business deeply before recommending a path, ensuring every solution aligns with your goals." },
              { title: "AI-First Thinking", icon: Brain, desc: "Artificial intelligence is embedded into our approach — not bolted on — so you benefit from smarter outputs at every stage." },
              { title: "End-to-End Delivery", icon: Cpu, desc: "From scoping and design through to launch and support, we stay with you for the full journey." },
              { title: "Dedicated Support", icon: Activity, desc: "Our team is always reachable. Post-launch care, iterations, and ongoing improvements are built into our process." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-8 rounded-sm hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-sm flex items-center justify-center mb-6 border border-primary/20">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="h-px w-10 bg-accent" />
              <span className="text-accent font-heading font-semibold tracking-widest text-sm uppercase">Client Stories</span>
              <div className="h-px w-10 bg-accent" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl font-bold text-white"
            >
              Trusted by Businesses
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border rounded-sm p-8 flex flex-col hover:border-primary/40 transition-colors duration-300"
                data-testid={`card-testimonial-${i}`}
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-1 italic">"{t.quote}"</p>
                <div className="border-t border-border pt-6">
                  <div className="font-heading font-bold text-white">{t.name}</div>
                  <div className="text-sm text-primary">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 border-b border-border overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm font-heading tracking-widest text-muted-foreground uppercase mb-12"
          >
            Technologies We Work With
          </motion.p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 w-max"
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-card border border-border rounded-sm px-6 py-4 whitespace-nowrap hover:border-primary/40 transition-colors cursor-default"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-heading font-semibold text-sm text-foreground tracking-wide">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="cta" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/20 to-accent/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

            {/* Left — info panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-accent font-heading font-semibold tracking-widest text-sm uppercase">Get in Touch</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Great Together</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Whether you need strategic advice, an AI-powered product, or a polished mobile app — tell us about your project and we'll come back to you within one business day.
              </p>

              <div className="space-y-6">
                {[
                  { icon: CheckCircle2, text: "Free initial consultation, no strings attached" },
                  { icon: CheckCircle2, text: "Response within 1 business day" },
                  { icon: CheckCircle2, text: "Tailored proposal based on your specific needs" },
                  { icon: CheckCircle2, text: "Fixed-price or flexible engagement models" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <item.icon className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 p-6 border border-primary/20 bg-primary/5 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="font-heading font-bold text-white text-sm tracking-wide">Email Us Directly</span>
                </div>
                <a href="mailto:hello@almicsolutions.com" className="text-primary hover:text-primary/80 transition-colors">
                  hello@almicsolutions.com
                </a>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <img src="/almic-logo.png" alt="Almic Solutions" className="h-20 object-contain mix-blend-lighten contrast-125 mb-6" />
              <p className="text-muted-foreground max-w-sm mb-6">
                Strategy, AI, and mobile technology — delivered by a team that cares about your outcomes as much as you do.
              </p>
              <div className="flex gap-4 text-sm font-mono text-muted-foreground">
                <span className="flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Always Available</span>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-white font-bold mb-6 tracking-wide">Services</h4>
              <ul className="space-y-4 text-muted-foreground text-sm">
                <li><a href="#services" className="hover:text-primary transition-colors">Business Consultancy</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">AI Services</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Mobile App Development</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Digital Transformation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-white font-bold mb-6 tracking-wide">Company</h4>
              <ul className="space-y-4 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#cta" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Almic Solutions. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <VirtualAssistant />

    </div>
  );
}
