import { cn } from "./utils";
import { useRef, useState, useCallback } from "react";

export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const refElement = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const rafRef = useRef<number | null>(null);

  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--duration": "300ms",
    "--opacity": "0",
    "--radius": "48px",
    "--easing": "ease-out",
  } as any;

  const updateStyles = useCallback((glareX: number, glareY: number, rotateX: number, rotateY: number) => {
    if (refElement.current) {
      refElement.current.style.setProperty("--m-x", `${glareX}%`);
      refElement.current.style.setProperty("--m-y", `${glareY}%`);
      refElement.current.style.setProperty("--r-x", `${rotateX}deg`);
      refElement.current.style.setProperty("--r-y", `${rotateY}deg`);
    }
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current) return; // Throttle to animation frame

    rafRef.current = requestAnimationFrame(() => {
      const rect = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      const percentage = {
        x: (100 / rect.width) * position.x,
        y: (100 / rect.height) * position.y,
      };
      const delta = {
        x: percentage.x - 50,
        y: percentage.y - 50,
      };

      const rotateFactor = 0.3; // Reduced rotation for smoother feel
      const rotateX = -(delta.x / 4) * rotateFactor;
      const rotateY = (delta.y / 3) * rotateFactor;

      updateStyles(percentage.x, percentage.y, rotateX, rotateY);
      rafRef.current = null;
    });
  }, [updateStyles]);

  const handlePointerEnter = useCallback(() => {
    setIsActive(true);
    if (refElement.current) {
      refElement.current.style.setProperty("--opacity", "0.5");
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsActive(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (refElement.current) {
      refElement.current.style.setProperty("--opacity", "0");
      refElement.current.style.setProperty("--r-x", "0deg");
      refElement.current.style.setProperty("--r-y", "0deg");
    }
  }, []);

  return (
    <div
      style={containerStyle}
      className="relative isolate transition-transform duration-300 ease-out will-change-transform w-full h-full"
      ref={refElement}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="h-full grid origin-center rounded-[var(--radius)] overflow-hidden"
        style={{
          transform: "rotateY(var(--r-x)) rotateX(var(--r-y))",
          transition: "transform var(--duration) var(--easing)",
          border: "1px solid rgba(0, 169, 255, 0.2)"
        }}
      >
        <div className="w-full h-full grid [grid-area:1/1] [clip-path:inset(0_0_0_0_round_var(--radius))]">
          <div
            className={cn("h-full w-full", className)}
            style={{ backgroundColor: 'var(--lp-bg-solid)' }}
          >
            {children}
          </div>
        </div>
        {/* Simplified glare effect with Launchpad blue tint */}
        <div
          className="w-full h-full grid [grid-area:1/1] [clip-path:inset(0_0_1px_0_round_var(--radius))] pointer-events-none"
          style={{
            opacity: "var(--opacity)",
            background: "radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(0,169,255,0.4) 10%, rgba(0,169,255,0.2) 20%, rgba(0,169,255,0) 80%)",
            transition: "opacity var(--duration) var(--easing)",
            mixBlendMode: "soft-light"
          }}
        />
      </div>
    </div>
  );
};
