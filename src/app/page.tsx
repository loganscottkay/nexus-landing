import Navbar from "@/components/Navbar";
import FadeUp from "@/components/FadeUp";
import CountUp from "@/components/CountUp";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent-blue/15 blur-[150px] animate-float-slow" />
        <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full bg-accent-violet/15 blur-[150px] animate-float-slower" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-accent-gold/8 blur-[130px] animate-float-slowest" />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen max-w-5xl mx-auto">
        <FadeUp>
          <p className="font-outfit text-silver text-xs md:text-sm tracking-[0.2em] md:tracking-[0.25em] uppercase mb-6">
            The Curated Investment Marketplace
          </p>
        </FadeUp>
        <FadeUp delay={150}>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
            Where Capital
            <br />
            Meets{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-blue bg-clip-text text-transparent">
              Vision
            </span>
          </h1>
        </FadeUp>
        <FadeUp delay={300}>
          <p className="font-outfit text-silver text-base md:text-lg max-w-[500px] mb-10 leading-relaxed">
            Nexus connects vetted startups with accredited investors through intelligent
            daily matching. No cold emails. No noise. Just high-signal connections that
            lead to real conversations.
          </p>
        </FadeUp>
        <FadeUp delay={450} className="flex flex-col sm:flex-row gap-4">
          <a href="#" className="btn-gold px-8 py-4 rounded-xl font-outfit text-sm md:text-base font-semibold">
            Apply as Investor
          </a>
          <a href="#" className="btn-glass px-8 py-4 rounded-xl font-outfit text-sm md:text-base font-medium">
            Apply as Startup
          </a>
        </FadeUp>
        <FadeUp delay={550}>
          <p className="font-outfit text-silver/50 text-xs mt-8 tracking-wide">
            By invitation only. Currently accepting applications.
          </p>
        </FadeUp>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-center mb-16">
            How It Works
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              num: "01",
              title: "Apply & Get Vetted",
              desc: "Submit your profile for review by our curation team. We accept fewer than 25% of applicants to maintain network quality.",
            },
            {
              num: "02",
              title: "Get Matched Daily",
              desc: "Our algorithm delivers 3-5 highly compatible matches to your feed each morning. No endless scrolling, just signal.",
            },
            {
              num: "03",
              title: "Take Chemistry Calls",
              desc: "When interest is mutual, we schedule a structured 20-minute intro call automatically. No scheduling back-and-forth.",
            },
          ].map((card, i) => (
            <FadeUp key={card.num} delay={i * 150}>
              <div className="glass glass-hover rounded-2xl p-8 md:p-10 h-full relative overflow-hidden">
                <span className="font-playfair text-[48px] md:text-[56px] font-bold text-white/[0.04] absolute top-4 right-6 leading-none select-none">
                  {card.num}
                </span>
                <div className="relative">
                  <h3 className="font-outfit text-lg md:text-xl font-semibold mb-3 text-foreground">
                    {card.title}
                  </h3>
                  <p className="font-outfit text-silver text-sm md:text-base leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
        <FadeUp>
          <div className="glass rounded-3xl px-6 py-12 md:px-16 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
              {[
                { target: 500, prefix: "", suffix: "+", label: "Vetted Startups", decimals: 0 },
                { target: 2.1, prefix: "$", suffix: "B+", label: "In Deal Flow", decimals: 1 },
                { target: 89, prefix: "", suffix: "%", label: "Call-to-Follow-Up Rate", decimals: 0 },
                { target: 4.8, prefix: "", suffix: "", label: "Average Match Rating", decimals: 1 },
              ].map((stat, i) => (
                <FadeUp key={stat.label} delay={i * 100}>
                  <div>
                    <p className="font-playfair text-3xl sm:text-4xl md:text-[48px] font-bold text-foreground leading-none mb-2">
                      <CountUp
                        target={stat.target}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    </p>
                    <p className="font-outfit text-silver text-xs md:text-sm">{stat.label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* For Investors / For Startups */}
      <section className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <FadeUp>
            <div id="for-investors" className="glass glass-hover rounded-2xl p-8 md:p-10 h-full flex flex-col">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-8">For Investors</h3>
              <ul className="flex flex-col gap-4 flex-1">
                {[
                  "Pre-vetted deal flow matched to your thesis",
                  "No more sorting through hundreds of cold pitches",
                  "Structured intro calls save you 10+ hours per week",
                  "See engagement data on every startup",
                  "First-look advantage on emerging companies",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-blue mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="font-outfit text-silver text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="btn-gold-outline px-6 py-3 rounded-xl font-outfit text-sm font-medium mt-8 text-center">
                Apply Now
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={150}>
            <div id="for-startups" className="glass glass-hover rounded-2xl p-8 md:p-10 h-full flex flex-col">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-8">For Startups</h3>
              <ul className="flex flex-col gap-4 flex-1">
                {[
                  "Direct access to investors actively looking for you",
                  "Know exactly who viewed your deck",
                  "72-hour response guarantee on every match",
                  "Structured calls that actually lead to follow-ups",
                  "Join a network that signals credibility",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-violet mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="font-outfit text-silver text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="btn-gold-outline px-6 py-3 rounded-xl font-outfit text-sm font-medium mt-8 text-center">
                Apply Now
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 py-24 md:py-32 max-w-4xl mx-auto text-center">
        <FadeUp>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-6">
            Ready to Join?
          </h2>
        </FadeUp>
        <FadeUp delay={150}>
          <p className="font-outfit text-silver text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Nexus is built for people who value quality over quantity. Apply today and get access to a network that actually moves the needle.
          </p>
        </FadeUp>
        <FadeUp delay={300}>
          <a href="#" className="btn-gold px-10 py-4 rounded-xl font-outfit text-sm md:text-base font-semibold inline-block">
            Apply for Access
          </a>
          <p className="font-outfit text-silver/40 text-xs mt-6">
            Applications reviewed within 48 hours.
          </p>
        </FadeUp>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-12">
        <div className="glass-nav border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <a href="#" className="font-playfair text-sm font-bold tracking-[0.25em] text-foreground">
              NEXUS
            </a>
            <p className="font-outfit text-silver/40 text-xs">
              &copy; 2025 Nexus. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {/* X / Twitter */}
              <a href="#" className="text-silver/40 hover:text-silver transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-silver/40 hover:text-silver transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
