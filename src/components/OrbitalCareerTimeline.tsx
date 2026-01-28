import { Lightbulb, Layers, Code, Users, Rocket, TrendingUp } from 'lucide-react';
import RadialOrbitalTimeline from './ui/radial-orbital-timeline';
import { motion } from 'motion/react';

export function OrbitalCareerTimeline() {
  // Reversed order for clockwise rotation to display phases 1→2→3→4→5→6
  const timelineData = [
    {
      id: 6,
      title: 'Execution & Growth',
      date: 'Phase 6',
      content: 'Scale your operations and achieve sustainable growth. Optimize processes, expand market reach, analyze key metrics, secure funding rounds, and execute strategies that transform your startup into a market leader with lasting impact.',
      category: 'Growth',
      icon: TrendingUp,
      relatedIds: [5, 1],
      status: 'pending' as const,
      energy: 70,
    },
    {
      id: 5,
      title: 'Promotion & Launch',
      date: 'Phase 5',
      content: 'Launch your product with maximum impact through strategic marketing and brand building. Develop compelling messaging, execute multi-channel campaigns, generate buzz, and create a powerful market presence that attracts early adopters.',
      category: 'Marketing',
      icon: Rocket,
      relatedIds: [4, 6],
      status: 'pending' as const,
      energy: 75,
    },
    {
      id: 4,
      title: 'Team & Partners',
      date: 'Phase 4',
      content: 'Build your dream team and forge strategic partnerships. Recruit top talent, establish advisor relationships, cultivate investor connections, and create a network of mentors who will accelerate your startup\'s success.',
      category: 'People',
      icon: Users,
      relatedIds: [3, 5],
      status: 'in-progress' as const,
      energy: 80,
    },
    {
      id: 3,
      title: 'Development',
      date: 'Phase 3',
      content: 'Build cutting-edge AI solutions through hands-on coding and implementation. Master modern development frameworks, implement machine learning algorithms, and create robust applications that solve real-world problems with innovative technology.',
      category: 'Technical',
      icon: Code,
      relatedIds: [2, 4],
      status: 'in-progress' as const,
      energy: 85,
    },
    {
      id: 2,
      title: 'Program Design',
      date: 'Phase 2',
      content: 'Architect your product\'s foundation with user-centric design principles. Create wireframes, define technical requirements, establish system architecture, and build a scalable framework that brings your vision to life.',
      category: 'Design',
      icon: Layers,
      relatedIds: [1, 3],
      status: 'in-progress' as const,
      energy: 90,
    },
    {
      id: 1,
      title: 'Idea & Planning',
      date: 'Phase 1',
      content: 'The foundation of Students Launchpad begins with defining a clear vision and purpose. The central idea is to create a learning ecosystem where students can explore skills in technology, innovation, and entrepreneurship. The purpose of this initiative is to bridge the gap between academic learning and real-world applications by offering mentorship, hands-on projects\'.',
      category: 'Strategy',
      icon: Lightbulb,
      relatedIds: [2, 6],
      status: 'completed' as const,
      energy: 95,
    },
  ];

  return (
    <motion.section
      className="bg-slate-950 py-12 md:py-14"
      initial={{ 
        opacity: 0, 
        scale: 0.9,
        rotateX: 15,
        filter: "blur(12px)",
        y: 100
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        y: 0
      }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ 
        duration: 1.2,
        type: "spring",
        stiffness: 60,
        damping: 20,
        delay: 0.2
      }}
      style={{ 
        perspective: '2000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8,
          delay: 0.3,
          type: "spring",
          stiffness: 100
        }}
      >
        <RadialOrbitalTimeline timelineData={timelineData} />
      </motion.div>
    </motion.section>
  );
}
