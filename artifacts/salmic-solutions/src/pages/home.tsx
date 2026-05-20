import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Activity, Shield, Zap, Cpu, Smartphone, Brain, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? "bg-background/80 backdrop-blur-md border-border py-4 shadow-lg shadow-black/50" : "bg-transparent py-6"
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* The logo has a gray background, mix-blend-screen with dark background makes it pop */}
            <img 
              src="/salmic-logo.png" 
              alt="Salmic Solutions" 
              className="h-20 object-contain mix-blend-lighten contrast-125"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#expertise" className="hover:text-primary transition-colors">Why Us</a>
            <a href="#cta" className="hover:text-primary transition-colors">Contact</a>
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-sm font-heading tracking-wider">
              Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroBg} 
            alt="Circuit Background" 
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-accent"></div>
                <span className="text-accent font-heading font-semibold tracking-widest text-sm uppercase">Strategy. Technology. Growth.</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 text-white">
                Smart Solutions <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Powered by AI.</span> <br />
                Built for You.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-light">
                Salmic Solutions delivers expert consultancy, cutting-edge AI services, and bespoke mobile app development — helping businesses move faster, think smarter, and scale further.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 rounded-sm font-heading tracking-widest uppercase text-sm group">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-white/5 h-14 px-8 rounded-sm font-heading tracking-widest uppercase text-sm">
                  Explore Services
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Glowing orb effect */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
      </section>

      {/* Stats Ticker */}
      <section className="border-y border-border/50 bg-card/30 backdrop-blur-sm relative z-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-border/0 md:divide-border/50">
            {[
              { value: "150+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "12+", label: "Years of Expertise" },
              { value: "24/7", label: "Ongoing Support" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center px-4"
              >
                <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-primary tracking-wider uppercase font-medium">{stat.label}</div>
              </motion.div>
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
              <p className="text-muted-foreground max-w-xl text-lg">Engineered for resilience. Designed for velocity. Our capabilities cover the entire spectrum of modern technical infrastructure.</p>
            </div>
            <Button variant="link" className="text-accent hover:text-accent/80 font-heading tracking-widest uppercase p-0 group">
              View All Services <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Business Consultancy",
                desc: "Strategic guidance to help your business identify opportunities, streamline operations, and make confident, data-driven decisions.",
                img: serviceCloud,
                icon: Users
              },
              {
                title: "AI Services",
                desc: "Custom AI solutions — from intelligent automation and predictive analytics to LLM-powered products that give your business a real edge.",
                img: serviceEngineering,
                icon: Brain
              },
              {
                title: "Mobile App Development",
                desc: "Polished, high-performance mobile applications for iOS and Android, crafted from concept to deployment with your users in mind.",
                img: serviceSecurity,
                icon: Smartphone
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group border border-border bg-card rounded-sm overflow-hidden hover:border-primary/50 transition-colors duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur border border-border p-3 rounded-sm">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
                  <a href="#" className="inline-flex items-center text-sm font-heading tracking-widest text-primary uppercase hover:text-white transition-colors group/link">
                    Explore Node <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise / Features Section */}
      <section id="expertise" className="py-32 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Salmic Solutions</h2>
            <p className="text-muted-foreground text-lg">We partner with businesses at every stage — from early-stage startups to established enterprises — delivering solutions that are practical, scalable, and built to last.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Strategic Insight", icon: Zap, desc: "We analyse your business deeply before recommending a path, ensuring every solution aligns with your goals." },
              { title: "AI-First Thinking", icon: Brain, desc: "Artificial intelligence is embedded into our approach — not bolted on — so you benefit from smarter outputs at every stage." },
              { title: "End-to-End Delivery", icon: Cpu, desc: "From scoping and design through to launch and support, we stay with you for the full journey." },
              { title: "Dedicated Support", icon: Activity, desc: "Our team is always reachable. Post-launch care, iterations, and ongoing improvements are built into our process." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-8 rounded-sm hover:bg-card/80 transition-colors"
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

      {/* CTA Section */}
      <section id="cta" className="py-32 relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/20 to-accent/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center border border-border/50 bg-background/50 backdrop-blur-xl p-12 md:p-20 rounded-sm shadow-2xl">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Whether you need strategic consultancy, an AI-powered product, or a polished mobile app — let's talk about what we can build together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-10 rounded-sm font-heading tracking-widest uppercase text-sm shadow-[0_0_30px_rgba(255,167,38,0.3)]">
                Book a Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground h-14 px-10 rounded-sm font-heading tracking-widest uppercase text-sm">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <img 
                src="/salmic-logo.png" 
                alt="Salmic Solutions" 
                className="h-20 object-contain mix-blend-lighten contrast-125 mb-6"
              />
              <p className="text-muted-foreground max-w-sm mb-6">
                Strategy, AI, and mobile technology — delivered by a team that cares about your outcomes as much as you do.
              </p>
              <div className="flex gap-4 text-sm font-mono text-muted-foreground">
                <span className="flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Systems Nominal</span>
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
              &copy; {new Date().getFullYear()} Salmic Solutions. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security Disclosures</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
