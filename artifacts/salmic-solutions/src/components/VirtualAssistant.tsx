import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "assistant" | "user";
  text: string;
}

const QA: Record<string, string> = {
  "What services do you offer?":
    "We offer three core services:\n\n• **Business Consultancy** — Strategic guidance to streamline operations and drive growth.\n• **AI Services** — Custom AI solutions including automation, predictive analytics, and LLM-powered products.\n• **Mobile App Development** — High-performance iOS and Android apps built from concept to launch.",
  "How do I get started?":
    "Getting started is simple! Scroll down to our **Contact** section and fill in the form — or click the button below. We'll respond within one business day with a free initial consultation to understand your goals.",
  "How long does a project take?":
    "Project timelines vary by scope:\n\n• **Consultancy engagements** — 2 to 6 weeks for a full strategy report.\n• **AI solutions** — 6 to 16 weeks depending on complexity.\n• **Mobile apps** — 8 to 20 weeks from design to App Store launch.\n\nWe'll give you a clear timeline before we begin.",
  "Do you work with startups?":
    "Absolutely! We work with businesses of all sizes — from early-stage startups looking to build their first product, to established enterprises seeking digital transformation. Our pricing models are flexible to suit every stage.",
  "What technologies do you use?":
    "Our team works across a modern stack:\n\n• **AI/ML** — OpenAI, TensorFlow, Python\n• **Mobile** — React Native, Flutter\n• **Web** — React, Node.js, TypeScript\n• **Cloud** — AWS, PostgreSQL, Docker\n\nWe choose the right tool for each project, not the trendiest one.",
  "How much does it cost?":
    "We offer two engagement models:\n\n• **Fixed-price** — Ideal for well-defined projects with a clear scope.\n• **Flexible retainer** — Best for ongoing consultancy or evolving products.\n\nAll engagements start with a **free consultation** where we'll discuss your budget and recommend the right approach.",
  "Do you offer post-launch support?":
    "Yes — we don't disappear after launch. We offer ongoing support packages covering:\n\n• Bug fixes and performance optimisation\n• Feature iterations and updates\n• 24/7 monitoring for critical systems\n\nOur team stays close so your product keeps improving.",
  "Where are you based?":
    "Almic Solutions operates remotely with a globally distributed team, allowing us to serve clients worldwide. We're comfortable working across time zones and can accommodate your preferred communication style — async or real-time.",
};

const suggestions = Object.keys(QA);

function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    const formatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/^•\s/, "");
    const isBullet = line.startsWith("•");
    return (
      <p key={i} className={`${isBullet ? "flex gap-2 items-start" : ""} ${line === "" ? "mt-2" : ""}`}>
        {isBullet && <span className="text-primary mt-0.5 flex-shrink-0">›</span>}
        <span dangerouslySetInnerHTML={{ __html: formatted }} />
      </p>
    );
  });
}

export default function VirtualAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm the Almic Solutions virtual assistant. Choose a question below or ask me anything about our services.",
    },
  ]);
  const [asked, setAsked] = useState<Set<string>>(new Set());
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function ask(question: string) {
    if (asked.has(question)) return;
    const answer = QA[question];
    setMessages(prev => [
      ...prev,
      { role: "user", text: question },
      { role: "assistant", text: answer },
    ]);
    setAsked(prev => new Set([...prev, question]));
  }

  function reset() {
    setMessages([
      {
        role: "assistant",
        text: "Hi! I'm the Almic Solutions virtual assistant. Choose a question below or ask me anything about our services.",
      },
    ]);
    setAsked(new Set());
  }

  const remaining = suggestions.filter(q => !asked.has(q));

  return (
    <>
      {/* Floating button */}
      <motion.button
        data-testid="button-open-assistant"
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_rgba(41,182,246,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open virtual assistant"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[560px] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-border bg-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm tracking-wide">Almic Assistant</p>
                  <p className="text-xs opacity-75 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                    Online now
                  </p>
                </div>
              </div>
              <button
                data-testid="button-reset-assistant"
                onClick={reset}
                className="opacity-70 hover:opacity-100 transition-opacity"
                title="Restart conversation"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2.5 rounded-xl text-sm leading-relaxed space-y-0.5 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm border border-border"
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Suggested questions */}
            {remaining.length > 0 && (
              <div className="px-4 pb-3 flex-shrink-0 border-t border-border pt-3">
                <p className="text-xs text-muted-foreground font-heading tracking-wide uppercase mb-2">Suggested questions</p>
                <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto">
                  {remaining.map(q => (
                    <button
                      key={q}
                      data-testid={`button-question-${q.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                      onClick={() => ask(q)}
                      className="text-left text-xs px-3 py-2 rounded-lg border border-border bg-background hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-between gap-2 group"
                    >
                      <span>{q}</span>
                      <ArrowRight className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer CTA */}
            <div className="px-4 pb-4 pt-2 flex-shrink-0">
              <Button
                size="sm"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-heading tracking-widest uppercase text-xs h-9"
                onClick={() => { setOpen(false); document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" }); }}
                data-testid="button-assistant-contact"
              >
                Talk to a Human <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
