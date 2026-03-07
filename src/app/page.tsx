import FadeUp from "@/components/FadeUp";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent-blue/15 blur-[150px] animate-float-slow" />
        <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full bg-accent-violet/15 blur-[150px] animate-float-slower" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-accent-gold/8 blur-[130px] animate-float-slowest" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center">
            <span className="font-playfair text-sm font-bold text-white">N</span>
          </div>
          <span className="font-outfit font-semibold text-lg tracking-tight">Nexus</span>
        </div>
        <a
          href="#how-it-works"
          className="text-silver hover:text-foreground transition-colors text-sm"
        >
          How It Works
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-32 md:pt-36 md:pb-44 max-w-5xl mx-auto">
        <FadeUp>
          <p className="text-silver text-sm tracking-[0.25em] uppercase mb-6 font-outfit">
            By Invitation. By Design.
          </p>
        </FadeUp>
        <FadeUp delay={150}>
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
            Where Capital
            <br />
            Meets{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-blue bg-clip-text text-transparent">
              Vision
            </span>
          </h1>
        </FadeUp>
        <FadeUp delay={300}>
          <p className="text-silver text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            A curated marketplace connecting vetted startups with accredited investors
            through intelligent matching. No noise. Just signal.
          </p>
        </FadeUp>
        <FadeUp delay={450} className="flex flex-col sm:flex-row gap-4">
          <a
            href="#"
            className="glass-btn-gold px-8 py-4 rounded-xl font-outfit font-medium text-accent-gold transition-all duration-500 hover:scale-[1.02]"
          >
            Apply as Investor
          </a>
          <a
            href="#"
            className="glass-btn px-8 py-4 rounded-xl font-outfit font-medium text-foreground transition-all duration-500 hover:scale-[1.02]"
          >
            Apply as Startup
          </a>
        </FadeUp>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-center mb-4">
            How It Works
          </h2>
        </FadeUp>
        <FadeUp delay={100}>
          <p className="text-silver text-center mb-16 max-w-xl mx-auto">
            Three steps from application to handshake. We handle the vetting so you can focus on the deal.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              step: "01",
              title: "Apply & Get Vetted",
              description:
                "Submit your profile. Our team reviews every application against strict quality benchmarks before you ever enter the marketplace.",
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
            },
            {
              step: "02",
              title: "Get Matched Daily",
              description:
                "Our algorithm surfaces high-fit connections based on sector, stage, thesis, and check size. New matches land in your inbox every morning.",
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              ),
            },
            {
              step: "03",
              title: "Take Chemistry Calls",
              description:
                "When both sides signal interest, we set up an introductory call. No cold outreach. Every conversation starts warm.",
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 6v4.5m0-4.5h4.5m-4.5 0l6-6M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0l6-6m-6-6V3.75m0 4.5h-4.5m4.5 0L3.75 3.75" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <FadeUp key={item.step} delay={i * 150}>
              <div className="glass glass-hover rounded-2xl p-8 md:p-10 transition-all duration-500 group h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-accent-blue group-hover:text-accent-violet transition-colors duration-500">
                    {item.icon}
                  </div>
                  <span className="text-silver/40 font-outfit text-sm font-mono">{item.step}</span>
                </div>
                <h3 className="font-playfair text-xl md:text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-silver leading-relaxed text-sm md:text-base">{item.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 py-24 md:py-32 max-w-5xl mx-auto">
        <FadeUp>
          <div className="glass rounded-3xl p-10 md:p-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-center mb-16">
              The Numbers Speak
            </h2>
            <div className="grid md:grid-cols-3 gap-10 md:gap-6 text-center">
              {[
                { value: "500+", label: "Vetted Startups" },
                { value: "$2.1B+", label: "in Deal Flow" },
                { value: "89%", label: "Call-to-Follow-Up Rate" },
              ].map((stat, i) => (
                <FadeUp key={stat.label} delay={i * 150}>
                  <div>
                    <p className="font-playfair text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent-blue to-accent-violet bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </p>
                    <p className="text-silver text-sm md:text-base">{stat.label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-24 md:py-32 max-w-4xl mx-auto text-center">
        <FadeUp>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-6">
            Ready to Enter the Room?
          </h2>
        </FadeUp>
        <FadeUp delay={150}>
          <p className="text-silver text-lg mb-12 max-w-xl mx-auto">
            Nexus is not for everyone. That is the point. Apply today and join a network built on quality, not quantity.
          </p>
        </FadeUp>
        <FadeUp delay={300} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="glass-btn-gold px-8 py-4 rounded-xl font-outfit font-medium text-accent-gold transition-all duration-500 hover:scale-[1.02]"
          >
            Apply as Investor
          </a>
          <a
            href="#"
            className="glass-btn px-8 py-4 rounded-xl font-outfit font-medium text-foreground transition-all duration-500 hover:scale-[1.02]"
          >
            Apply as Startup
          </a>
        </FadeUp>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center">
              <span className="font-playfair text-[10px] font-bold text-white">N</span>
            </div>
            <span className="font-outfit font-medium text-sm">Nexus</span>
          </div>
          <p className="text-silver/50 text-xs">
            &copy; {new Date().getFullYear()} Nexus. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
