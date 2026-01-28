import { CircularTestimonials } from './ui/circular-testimonials';

export function SuccessStories() {
  const testimonials = [
    {
      quote:
        "Launchpad transformed my AI research into a funded startup. The mentorship and technical guidance were invaluable in building our medical diagnostic platform that's now helping hospitals worldwide.",
      name: "Sarah Chen",
      designation: "Founder & CEO, MediAI Diagnostics • $2.5M Series A",
      src: "https://images.unsplash.com/photo-1701760211213-4a359f9e1fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwZW50cmVwcmVuZXVyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAyMzMxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      quote:
        "The AI fundamentals I learned at Launchpad became the foundation of our language learning platform. The community support continues even after graduation, and we're now serving millions of users globally.",
      name: "Emily Watson",
      designation: "Co-founder & CTO, LangLearn AI • $1.2M Pre-Seed",
      src: "https://images.unsplash.com/photo-1632647895256-3f75c1865a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwdGVjaCUyMHN0dWRlbnR8ZW58MXx8fHwxNzYwMDIzMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      quote:
        "From idea to Series A in 18 months. Launchpad's network of investors and focus on scalable AI solutions made all the difference in our journey to revolutionize algorithmic trading.",
      name: "David Kim",
      designation: "CEO & Founder, FinBot Trading • $3.2M Series A",
      src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMG1hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MDAyMzMxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      quote:
        "The program's focus on real-world applications helped us build technology that actually makes a difference. We're now helping cities worldwide prepare for climate change with our AI-powered predictions.",
      name: "Marcus Rodriguez",
      designation: "Founder, EcoPredict Climate AI • $1.8M Seed Round",
      src: "https://images.unsplash.com/photo-1758598497628-942ad38a6dc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzdGFydHVwJTIwZm91bmRlcnxlbnwxfHx8fDE3NjAwMjMzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      quote:
        "The program taught me to think beyond just AI models to building complete solutions. Our smart farming platform is now used by thousands of farmers globally, revolutionizing agriculture with IoT and AI.",
      name: "Priya Patel",
      designation: "Co-founder & CEO, AgriSense IoT • $950K Seed Round",
      src: "https://images.unsplash.com/photo-1531539648265-33e27dc578c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGVudHJlcHJlbmV1ciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYwMDIzMzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section
      id="stories"
      className="py-12 md:py-16 lp-bg relative overflow-hidden"
      style={{ backgroundColor: 'var(--lp-bg-solid)' }}
    >
      {/* Static background accents - dual energy */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-50 lp-radial-red" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-50 lp-radial-blue" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4">
          {/* Gradient heading - ACCENT USE */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
            Success <span className="text-glow-blue">Stories</span>
          </h2>
          {/* Neutral description */}
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto px-2 text-slate-400">
            Hear from founders who transformed their AI ideas into successful, funded startups
          </p>
        </div>

        <div className="flex items-center justify-center">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "#FFFFFF",              // White for names
              designation: "#94A3B8",       // slate-400 for designation
              testimony: "#CBD5E1",         // slate-300 for testimonial text
              arrowBackground: "#B1122C",   // Red accent for arrows
              arrowForeground: "#FFFFFF",
              arrowHoverBackground: "#00A9FF", // Blue on hover
            }}
            fontSizes={{
              name: "32px",
              designation: "18px",
              quote: "20px",
            }}
          />
        </div>
      </div>
    </section>
  );
}
