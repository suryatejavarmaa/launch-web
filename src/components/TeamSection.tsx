import { AnimatedTeamSection } from './ui/animated-team-section';

export function TeamSection() {
  const teamMembers = [
    {
      name: 'Alex Javed',
      image: 'https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjAxNjA0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Jenny William',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDc2Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Alex Joseph',
      image: 'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjAxNTU4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Jessica Lauren',
      image: 'https://images.unsplash.com/photo-1610251064409-8d94b0939629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjB3b21hbnxlbnwxfHx8fDE3NjAxOTMwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1752859951149-7d3fc700a7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDkxNzUzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'David Martinez',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZXxlbnwxfHx8fDE3NjAxNzY4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Emma Rodriguez',
      image: 'https://images.unsplash.com/photo-1668112262164-56e782a6e07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZm91bmRlcnxlbnwxfHx8fDE3NjAxMjI3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <AnimatedTeamSection
      title="Meet Our Expert Team"
      description="World-class mentors, researchers, and innovators dedicated to your Launchpad success"
      members={teamMembers}
    />
  );
}
