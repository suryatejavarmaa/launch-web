import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface AITool {
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export function AIToolsVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'floating' | 'converging' | 'merged' | 'exploding'>('floating');
  const toolsRef = useRef<AITool[]>([]);
  const animationRef = useRef<number>(0);
  const phaseTimerRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Initialize AI tools with Launchpad colors
    const tools = [
      { name: 'ChatGPT', color: '#00A9FF', size: 80 },   // Blue
      { name: 'Claude', color: '#B1122C', size: 75 },    // Red
      { name: 'Gemini', color: '#00A9FF', size: 70 },    // Blue
      { name: 'Midjourney', color: '#B1122C', size: 65 }, // Red
      { name: 'DALL-E', color: '#00A9FF', size: 60 },    // Blue
      { name: 'Stable Diffusion', color: '#B1122C', size: 55 }, // Red
    ];

    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height;

    toolsRef.current = tools.map(tool => ({
      ...tool,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));

    // Animation cycle
    const cyclePhases = () => {
      const phaseSequence: Array<'floating' | 'converging' | 'merged' | 'exploding'> = [
        'floating',
        'converging',
        'merged',
        'exploding',
      ];
      let currentPhaseIndex = 0;

      const nextPhase = () => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phaseSequence.length;
        setPhase(phaseSequence[currentPhaseIndex]);

        const delays = {
          floating: 2500,
          converging: 2000,
          merged: 2500,
          exploding: 1500,
        };

        phaseTimerRef.current = window.setTimeout(nextPhase, delays[phaseSequence[currentPhaseIndex]]);
      };

      nextPhase();
    };

    cyclePhases();

    // Animation loop
    const animate = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear canvas with Launchpad dark background
      ctx.fillStyle = 'rgba(10, 5, 16, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Draw connections with Launchpad blue
      ctx.strokeStyle = 'rgba(0, 169, 255, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < toolsRef.current.length; i++) {
        for (let j = i + 1; j < toolsRef.current.length; j++) {
          const tool1 = toolsRef.current[i];
          const tool2 = toolsRef.current[j];
          const distance = Math.sqrt(Math.pow(tool2.x - tool1.x, 2) + Math.pow(tool2.y - tool1.y, 2));

          if (distance < 300) {
            const opacity = 1 - distance / 300;
            ctx.strokeStyle = `rgba(0, 169, 255, ${opacity * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(tool1.x, tool1.y);
            ctx.lineTo(tool2.x, tool2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw tools
      toolsRef.current.forEach((tool, index) => {
        // Phase-based behavior
        if (phase === 'floating') {
          tool.x += tool.vx;
          tool.y += tool.vy;
          if (tool.x < 50 || tool.x > width - 50) tool.vx *= -1;
          if (tool.y < 50 || tool.y > height - 50) tool.vy *= -1;
        } else if (phase === 'converging') {
          const dx = centerX - tool.x;
          const dy = centerY - tool.y;
          tool.x += dx * 0.05;
          tool.y += dy * 0.05;
        } else if (phase === 'merged') {
          const angle = (Date.now() / 1000 + index * Math.PI / 3) % (Math.PI * 2);
          const radius = 30 + index * 15;
          tool.x = centerX + Math.cos(angle) * radius;
          tool.y = centerY + Math.sin(angle) * radius;
        } else if (phase === 'exploding') {
          const angle = (index / toolsRef.current.length) * Math.PI * 2;
          tool.x += Math.cos(angle) * 8;
          tool.y += Math.sin(angle) * 8;
        }

        // Draw glow
        const gradient = ctx.createRadialGradient(tool.x, tool.y, 0, tool.x, tool.y, tool.size);
        gradient.addColorStop(0, tool.color + '80');
        gradient.addColorStop(0.5, tool.color + '40');
        gradient.addColorStop(1, tool.color + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(tool.x, tool.y, tool.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw tool badge
        ctx.fillStyle = tool.color;
        ctx.shadowColor = tool.color;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(tool.x, tool.y, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw text
        ctx.fillStyle = tool.color === '#B1122C' ? 'rgba(177, 18, 44, 0.95)' : 'rgba(0, 169, 255, 0.95)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const fontSize = 10;
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillText(tool.name, tool.x, tool.y);
      });

      // Draw center launchpad when merged
      if (phase === 'merged') {
        // Draw central "Launchpad" badge with gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100);
        gradient.addColorStop(0, 'rgba(177, 18, 44, 0.6)');
        gradient.addColorStop(0.5, 'rgba(0, 169, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 169, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
        ctx.fill();

        // Draw launchpad icon
        ctx.fillStyle = 'rgba(0, 169, 255, 0.95)';
        ctx.shadowColor = '#00A9FF';
        ctx.shadowBlur = 30;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🚀', centerX, centerY - 15);
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Launchpad', centerX, centerY + 15);
        ctx.shadowBlur = 0;
      }

      // Draw particles with alternating red/blue
      const particleCount = phase === 'merged' ? 50 : 20;
      for (let i = 0; i < particleCount; i++) {
        const time = Date.now() / 1000;
        const x = centerX + Math.cos(time * 2 + i) * (100 + i * 5);
        const y = centerY + Math.sin(time * 2 + i) * (100 + i * 5);
        const size = Math.sin(time * 3 + i) * 2 + 2;

        // Alternate between red and blue particles
        const isBlue = i % 2 === 0;
        ctx.fillStyle = isBlue
          ? `rgba(0, 169, 255, ${Math.sin(time * 2 + i) * 0.5 + 0.5})`
          : `rgba(177, 18, 44, ${Math.sin(time * 2 + i) * 0.5 + 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current);
      }
      window.removeEventListener('resize', updateSize);
    };
  }, [phase]);

  return (
    <div
      className="relative w-full h-full min-h-[500px] lp-bg rounded-2xl overflow-hidden"
      style={{ backgroundColor: 'var(--lp-bg-solid)' }}
    >
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        controls
        poster="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop"
      >
        <source src="YOUR_VIDEO_URL_HERE.mp4" type="video/mp4" />
        <source src="YOUR_VIDEO_URL_HERE.webm" type="video/webm" />
        <p style={{ color: 'rgba(0, 169, 255, 0.9)' }}>Your browser doesn't support HTML5 video. Here is a <a href="YOUR_VIDEO_URL_HERE.mp4" style={{ color: 'var(--lp-blue)' }} className="underline">link to the video</a> instead.</p>
      </video>

      {/* Phase indicator with Launchpad styling */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 lp-glass rounded-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm capitalize" style={{ color: 'rgba(0, 169, 255, 0.9)' }}>
          {phase === 'floating' && '🌊 AI Tools Exploring...'}
          {phase === 'converging' && '🔮 Integrating Technologies...'}
          {phase === 'merged' && '🚀 Launchpad Active!'}
          {phase === 'exploding' && '✨ Deploying Innovation...'}
        </p>
      </motion.div>

      {/* Corner badges */}
      <div
        className="absolute top-4 left-4 px-3 py-1.5 rounded-full"
        style={{
          background: 'rgba(0, 169, 255, 0.15)',
          border: '1px solid rgba(0, 169, 255, 0.3)'
        }}
      >
        <p className="text-xs" style={{ color: 'var(--lp-blue)' }}>● Live Animation</p>
      </div>

      <div
        className="absolute top-4 right-4 px-3 py-1.5 rounded-full"
        style={{
          background: 'rgba(177, 18, 44, 0.15)',
          border: '1px solid rgba(177, 18, 44, 0.3)'
        }}
      >
        <p className="text-xs" style={{ color: 'var(--lp-red)' }}>6 AI Tools Integrated</p>
      </div>
    </div>
  );
}
