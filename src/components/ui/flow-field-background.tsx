import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlowFieldBackgroundProps {
    className?: string;
    color?: string;
    trailOpacity?: number;
    particleCount?: number;
    speed?: number;
}

export default function FlowFieldBackground({
    className,
    color = "#6366f1",
    trailOpacity = 0.15,
    particleCount = 600,
    speed = 1,
}: FlowFieldBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = container.clientWidth;
        let height = container.clientHeight;
        let animationFrameId: number;

        // Pre-allocated TypedArrays for smooth performance
        const px = new Float32Array(particleCount);
        const py = new Float32Array(particleCount);
        const vx = new Float32Array(particleCount);
        const vy = new Float32Array(particleCount);
        const age = new Float32Array(particleCount);
        const life = new Float32Array(particleCount);

        const initParticles = () => {
            for (let i = 0; i < particleCount; i++) {
                px[i] = Math.random() * width;
                py[i] = Math.random() * height;
                vx[i] = 0;
                vy[i] = 0;
                life[i] = Math.random() * 200 + 100; // Original: 100-300 frames
                age[i] = Math.random() * life[i]; // Stagger to prevent mass respawn
            }
        };

        const init = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            initParticles();
        };

        const animate = () => {
            // Trail fade - exactly like original
            ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = color;

            for (let i = 0; i < particleCount; i++) {
                // ORIGINAL FLOW FIELD MATH - exact same as your reference code
                const angle = (Math.cos(px[i] * 0.005) + Math.sin(py[i] * 0.005)) * Math.PI;

                // Original force application
                vx[i] += Math.cos(angle) * 0.2 * speed;
                vy[i] += Math.sin(angle) * 0.2 * speed;

                // Move particle
                px[i] += vx[i];
                py[i] += vy[i];

                // Original friction
                vx[i] *= 0.95;
                vy[i] *= 0.95;

                // Aging with respawn - keeps particles distributed
                age[i]++;
                if (age[i] > life[i]) {
                    px[i] = Math.random() * width;
                    py[i] = Math.random() * height;
                    vx[i] = 0;
                    vy[i] = 0;
                    age[i] = 0;
                    life[i] = Math.random() * 200 + 100;
                }

                // Wrap around screen - original behavior
                if (px[i] < 0) px[i] = width;
                if (px[i] > width) px[i] = 0;
                if (py[i] < 0) py[i] = height;
                if (py[i] > height) py[i] = 0;

                // Original fade in/out based on age
                const alpha = 1 - Math.abs((age[i] / life[i]) - 0.5) * 2;
                ctx.globalAlpha = alpha;
                ctx.fillRect(px[i], py[i], 1.5, 1.5);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            init();
        };

        init();
        animate();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, trailOpacity, particleCount, speed]);

    return (
        <div ref={containerRef} className={cn("relative w-full h-full bg-black overflow-hidden", className)}>
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
