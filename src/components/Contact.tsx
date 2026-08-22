"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/apurbahalderr", icon: "https://cdn.simpleicons.org/github/ffffff" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/apurba-halder-457a81319/", icon: "https://api.iconify.design/simple-icons:linkedin.svg?color=%23ffffff" },
  { label: "Instagram", href: "https://www.instagram.com/apurbahalderr", icon: "https://cdn.simpleicons.org/instagram/ffffff" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submissionState, setSubmissionState] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll(".contact-animate");
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionState("sending");

    try {
      await emailjs.send(
        "service_slrp3uv",
        "template_pa3gibn",
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
          title: `Portfolio inquiry from ${formState.name}`,
        },
        { publicKey: "qP6VtkD6Z9ecRkt1e" }
      );
      setSubmissionState("success");
      setFormState({ name: "", email: "", message: "" });
    } catch {
      setSubmissionState("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-48"
      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-iron to-transparent"
        aria-hidden="true"
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(252,107,47,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Section Heading styled in Poppins */}
        <div className="mb-16 md:mb-24 text-center">
          <span
            className="text-ember text-xs font-semibold tracking-[0.25em] uppercase block mb-4"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Get in Touch
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Let&apos;s Create Something Extraordinary
          </h2>
          <p
            className="mt-4 md:mt-6 text-base md:text-lg text-ash max-w-xl mx-auto leading-relaxed font-normal"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s build something amazing together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact info card */}
          <div
            className="contact-animate glass-card p-8 md:p-10 flex flex-col justify-between"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            <div>
              <h3
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Contact Details
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center text-ember mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-ash uppercase tracking-wider mb-1 font-semibold">Email</p>
                    <a
                      href="mailto:apurbahalder.rnc@gmail.com"
                      className="text-sm text-white hover:text-ember transition-colors font-medium"
                      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                    >
                      apurbahalder.rnc@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center text-ember mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-ash uppercase tracking-wider mb-1 font-semibold">Location</p>
                    <p className="text-sm text-white font-medium">Bhubaneswar, Odisha / Ranchi, Jharkhand</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mt-0.5 shrink-0 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="absolute inset-1 rounded-full border border-emerald-400/50 animate-ping" />
                  </span>
                  <div>
                    <p className="text-xs text-ash uppercase tracking-wider mb-1 font-semibold">Currently Learning</p>
                    <p className="text-sm text-green-400 font-medium">DSA with Java, ML, Docker & Deployment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-xs text-ash uppercase tracking-wider mb-4 font-semibold">Socials</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-ember/40 hover:bg-white/10 transition-all duration-300 group"
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                    data-magnetic
                    title={link.label}
                  >
                    <img
                      src={link.icon}
                      alt={link.label}
                      className="w-4 h-4 object-contain opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-animate glass-card p-8 md:p-10 space-y-6"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            <div>
              <label htmlFor="contact-name" className="text-xs text-ash uppercase tracking-wider block mb-2 font-semibold">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={formState.name}
                onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-iron focus:outline-none focus:border-ember/50 transition-colors"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="text-xs text-ash uppercase tracking-wider block mb-2 font-semibold">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={formState.email}
                onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-iron focus:outline-none focus:border-ember/50 transition-colors"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="text-xs text-ash uppercase tracking-wider block mb-2 font-semibold">
                Message
              </label>
              <textarea
                id="contact-message"
                value={formState.message}
                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-iron focus:outline-none focus:border-ember/50 transition-colors resize-none"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <MagneticButton type="submit" variant="primary" className="w-full !py-3.5 group">
              <span style={{ fontFamily: "var(--font-poppins), sans-serif" }} className="flex items-center justify-center gap-2.5 font-semibold text-sm tracking-wide text-white">
                {submissionState === "sending" ? "Sending..." : "Send Message"}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M14 2L7 9M14 2L10 14L7 9M14 2L2 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </MagneticButton>
            {submissionState === "success" && (
              <p className="text-sm text-green-400 text-center" role="status">Thanks! Your message has been sent.</p>
            )}
            {submissionState === "error" && (
              <p className="text-sm text-red-400 text-center" role="alert">Message could not be sent. Please email me directly at apurbahalder.rnc@gmail.com.</p>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div
        className="section-container relative z-10"
        style={{
          marginTop: "160px",
          paddingTop: "36px",
          paddingBottom: "40px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          fontFamily: "var(--font-poppins), sans-serif",
        }}
      >
        <div className="flex items-center justify-start text-left">
          <p className="text-xs text-ash" suppressHydrationWarning>
            © {new Date().getFullYear()} Apurba Halder. Crafted with passion.
          </p>
        </div>
      </div>
    </section>
  );
}
