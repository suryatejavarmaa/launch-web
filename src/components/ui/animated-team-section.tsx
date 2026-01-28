import * as React from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

// Define the type for each team member
interface TeamMember {
  name: string;
  image: string;
}

// Define the props for the component
export interface AnimatedTeamSectionProps {
  title: string;
  description: string;
  members: TeamMember[];
  className?: string;
}

// Helper function to calculate the final transform values for each card
const getCardState = (index: number, total: number) => {
  const centerIndex = (total - 1) / 2;
  const distanceFromCenter = index - centerIndex;

  // Horizontal spread to ensure cards are wide apart
  const x = distanceFromCenter * 90;
  // Vertical lift to form the curve
  const y = Math.abs(distanceFromCenter) * -30;
  // Rotation for the fanned effect
  const rotate = distanceFromCenter * 12;

  return { x, y, rotate };
};

const AnimatedTeamSection = React.forwardRef<
  HTMLDivElement,
  AnimatedTeamSectionProps
>(({ title, description, members, className, ...props }, ref) => {
  // Animation for the container to stagger children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // REBUILT ANIMATION LOGIC: Integrated positioning directly into motion
  const itemVariants = {
    // All cards start at the center, scaled down
    hidden: { opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 },
    // Animate to the final calculated position
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      x: getCardState(i, members.length).x,
      y: getCardState(i, members.length).y,
      rotate: getCardState(i, members.length).rotate,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    }),
  };

  return (
    <section
      ref={ref}
      id="team"
      className={cn("w-full py-12 md:py-16 overflow-hidden lp-bg", className)}
      style={{ backgroundColor: 'var(--lp-bg-solid)' }}
      {...props}
    >
      <div className="container mx-auto flex flex-col items-center text-center px-4">
        {/* Section Header with Launchpad gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl lp-text-gradient font-bold mb-4">
            {title}
          </h2>
          <p className="max-w-3xl text-xl" style={{ color: 'rgba(0, 169, 255, 0.75)' }}>
            {description}
          </p>
        </motion.div>

        {/* Sized container for the absolute positioning */}
        <motion.div
          className="relative mt-20 flex items-center justify-center"
          style={{ minHeight: "250px" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="absolute w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-2xl overflow-hidden shadow-lg"
              style={{
                zIndex: members.length - Math.abs(index - (members.length - 1) / 2),
                boxShadow: "0 10px 40px rgba(0, 169, 255, 0.3)",
                border: "2px solid rgba(0, 169, 255, 0.3)"
              }}
              custom={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                zIndex: 99,
                boxShadow: "0 20px 60px rgba(0, 169, 255, 0.5)",
                border: "2px solid rgba(0, 169, 255, 0.8)",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay on hover - Red to Blue */}
              <motion.div
                className="absolute inset-0 opacity-0 flex items-end p-3"
                style={{
                  background: 'linear-gradient(to top, rgba(177, 18, 44, 0.8), rgba(0, 169, 255, 0.4), transparent)'
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{ color: 'rgba(0, 169, 255, 0.95)' }} className="text-sm md:text-base font-medium">{member.name}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

AnimatedTeamSection.displayName = "AnimatedTeamSection";

export { AnimatedTeamSection };
