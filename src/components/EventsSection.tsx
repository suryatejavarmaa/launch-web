import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';
import { GlareCard } from './ui/glare-card';

export function EventsSection() {
  // Alternating event gradient between Red and Blue
  const events = [
    {
      type: 'Showcase',
      title: 'AI Innovation Showcase',
      description: 'Demo night featuring breakthrough AI projects from our current cohort',
      date: 'October 15, 2025',
      time: '6:00 PM PST',
      location: 'Virtual Event',
      attendees: '500 attendees',
      gradient: 'from-[#00A9FF] to-[#4AD4FF]', // Blue
      pathType: 'career'
    },
    {
      type: 'Networking',
      title: 'Founder Fireside Chat',
      description: 'Q&A with successful AI startup founders who graduated from our program',
      date: 'March 22, 2025',
      time: '7:00 PM PST',
      location: 'San Francisco, CA',
      attendees: '150 attendees',
      gradient: 'from-[#B1122C] to-[#FF3A4A]', // Red
      pathType: 'entrepreneur'
    },
    {
      type: 'Workshop',
      title: 'Technical Deep Dive: LLMs',
      description: 'Advanced workshop on Large Language Models and their applications',
      date: 'March 29, 2025',
      time: '5:00 PM PST',
      location: 'Virtual Event',
      attendees: '300 attendees',
      gradient: 'from-[#00A9FF] to-[#4AD4FF]', // Blue
      pathType: 'career'
    }
  ];

  return (
    <section
      id="events"
      className="py-12 md:py-16 lp-bg overflow-hidden"
      style={{ backgroundColor: 'var(--lp-bg-solid)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Gradient heading - ACCENT USE */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4 leading-tight text-white">
            Upcoming <span className="text-glow-blue">Events</span>
          </h2>
          {/* Neutral description */}
          <p className="text-lg sm:text-xl px-4 text-slate-400">
            Join our community events and connect with fellow innovators
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="group h-full transform hover:-translate-y-2 transition-transform duration-300 ease-out cursor-pointer"
            >
              <GlareCard className="flex flex-col h-full">
                {/* Accent color strip on top - path specific */}
                <div className={`h-2 bg-gradient-to-r ${event.gradient}`} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Badge with accent color */}
                  <Badge
                    className="mb-4 w-fit"
                    style={{
                      background: event.pathType === 'entrepreneur'
                        ? 'rgba(177, 18, 44, 0.15)'
                        : 'rgba(0, 169, 255, 0.15)',
                      color: event.pathType === 'entrepreneur'
                        ? 'var(--lp-red)'
                        : 'var(--lp-blue)',
                      border: `1px solid ${event.pathType === 'entrepreneur'
                        ? 'rgba(177, 18, 44, 0.3)'
                        : 'rgba(0, 169, 255, 0.3)'}`
                    }}
                  >
                    {event.type}
                  </Badge>

                  {/* White heading */}
                  <h3 className="text-xl mb-3 text-white font-semibold">
                    {event.title}
                  </h3>

                  {/* Neutral description */}
                  <p className="mb-6 line-clamp-2 text-slate-400">
                    {event.description}
                  </p>

                  <div className="space-y-3 mb-6 flex-1">
                    {[
                      { icon: Calendar, text: event.date },
                      { icon: MapPin, text: event.location },
                      { icon: Users, text: event.attendees },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-400">
                        <item.icon size={16} />
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                    {/* Accent color for time */}
                    <div className="text-sm" style={{ color: 'var(--lp-blue)' }}>
                      {event.time}
                    </div>
                  </div>

                  {/* CTA Button - gradient accent */}
                  <Button className="w-full lp-btn-primary text-white transition-colors duration-200">
                    Join Event
                  </Button>
                </div>
              </GlareCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
