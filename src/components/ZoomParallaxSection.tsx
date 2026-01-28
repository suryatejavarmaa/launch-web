import { ZoomParallax } from './ui/zoom-parallax';

export function ZoomParallaxSection() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1623715537851-8bc15aa8c145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MDI1ODc5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Modern technology workspace with AI tools',
    },
    {
      src: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGF0YXxlbnwxfHx8fDE3NjAyNjU0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Artificial intelligence and data visualization',
    },
    {
      src: 'https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYwMjA1MTkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Startup team collaboration and innovation',
    },
    {
      src: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzYwMjk1NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Abstract innovation and technology concepts',
    },
    {
      src: 'https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NjAzMDA1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Coding and programming interface',
    },
    {
      src: 'https://images.unsplash.com/photo-1575029645663-d8faa1ac2880?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMG5ldHdvcmtpbmd8ZW58MXx8fHwxNzYwMjUyNzc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Tech conference and networking events',
    },
    {
      src: 'https://images.unsplash.com/photo-1644325349124-d1756b79dd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb258ZW58MXx8fHwxNzYwMjk2MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Digital transformation and future technology',
    },
  ];

  return (
    <section id="innovation" className="relative lp-bg" style={{ backgroundColor: 'var(--lp-bg-solid)' }}>
      {/* Introduction Section */}
      <div className="relative flex min-h-[40vh] items-center justify-center px-4 py-12 md:py-16 lp-dual-energy">
        {/* Static radial spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full opacity-50"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.05), transparent 50%)"
          }}
        />

        <div className="relative z-10 text-center">
          {/* Gradient heading - ACCENT USE */}
          <h2 className="mb-6 font-bold text-4xl sm:text-5xl md:text-6xl text-white">
            Explore Our <span className="text-glow-blue">Innovation Journey</span>
          </h2>
          {/* Neutral description */}
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-400">
            Scroll down to discover how Launchpad transforms ideas into reality through cutting-edge AI technology and collaborative innovation
          </p>
        </div>
      </div>

      {/* Zoom Parallax Effect */}
      <ZoomParallax images={images} />
    </section>
  );
}
