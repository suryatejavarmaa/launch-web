"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { motion, AnimatePresence } from "motion/react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const animationFrameRef = useRef<number>();
  const lastAutoExpandedId = useRef<number | null>(null);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive radius based on screen size
  const orbitRadius = useMemo(() => {
    if (isMobile) return 120;
    return 220;
  }, [isMobile]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
      setUserInteracted(false);
    }
  };

  const toggleItem = useCallback((id: number, isManual = false) => {
    if (isManual) {
      setUserInteracted(true);
    }

    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        if (isManual) {
          setAutoRotate(false);
          centerViewOnNode(id);
        }

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
      } else {
        setActiveNodeId(null);
        if (isManual) {
          setAutoRotate(true);
        }
        setPulseEffect({});
      }

      return newState;
    });
  }, []);

  const getRelatedItems = useCallback((itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  }, [timelineData]);

  // Calculate which node is at the display position (top-center at 270°)
  const getNodeAtDisplayPosition = useCallback(() => {
    const displayAngle = 270; // Top-center position
    const threshold = 25; // Degrees of tolerance

    for (let i = 0; i < timelineData.length; i++) {
      const nodeAngle = ((i / timelineData.length) * 360 + rotationAngle) % 360;

      // Calculate the smallest angular difference
      let diff = Math.abs(nodeAngle - displayAngle);
      if (diff > 180) {
        diff = 360 - diff;
      }

      if (diff < threshold) {
        return timelineData[i].id;
      }
    }

    return null;
  }, [rotationAngle, timelineData]);

  // Auto-expand node at display position
  useEffect(() => {
    if (!autoRotate || userInteracted) return;

    const nodeAtDisplay = getNodeAtDisplayPosition();

    if (nodeAtDisplay !== null && nodeAtDisplay !== lastAutoExpandedId.current) {
      lastAutoExpandedId.current = nodeAtDisplay;

      // Auto-expand the node at display position
      setExpandedItems({ [nodeAtDisplay]: true });
      setActiveNodeId(nodeAtDisplay);

      const relatedItems = getRelatedItems(nodeAtDisplay);
      const newPulseEffect: Record<number, boolean> = {};
      relatedItems.forEach((relId) => {
        newPulseEffect[relId] = true;
      });
      setPulseEffect(newPulseEffect);
    }
  }, [rotationAngle, autoRotate, userInteracted, getNodeAtDisplayPosition, getRelatedItems]);

  // Smooth rotation using requestAnimationFrame
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (autoRotate && viewMode === "orbital") {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        setRotationAngle((prev) => {
          // Slow down when displaying content for better readability
          const baseSpeed = isMobile ? 0.15 : 0.2;
          const displaySpeed = activeNodeId && !userInteracted ? 0.08 : baseSpeed;
          // Clockwise rotation (to the right)
          const newAngle = (prev + (displaySpeed * deltaTime / 16.67)) % 360;
          return Number(newAngle.toFixed(2));
        });

        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (autoRotate && viewMode === "orbital") {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoRotate, viewMode, isMobile, activeNodeId, userInteracted]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = useCallback((index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = orbitRadius * Math.cos(radian) + centerOffset.x;
    const y = orbitRadius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.5,
      Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
    );

    const scale = Math.max(0.8, Math.min(1, 0.8 + 0.2 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, angle, zIndex, opacity, scale };
  }, [rotationAngle, orbitRadius, centerOffset]);

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-gradient-to-r from-indigo-600 to-purple-600 border-white";
      case "in-progress":
        return "text-black bg-gradient-to-r from-blue-400 to-cyan-400 border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-950 overflow-hidden py-12 md:py-0"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Title Section - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 md:mb-8 px-4 relative z-20"
      >
        <h2 className="text-3xl md:text-5xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Career Journey Map
        </h2>
        <p className="text-indigo-300/70 text-sm md:text-base">
          {isMobile ? "Tap nodes to explore your path" : "Click any node to explore your career path"}
        </p>
      </motion.div>

      <div className="relative w-full max-w-5xl h-[600px] md:h-[700px] flex items-center justify-center px-4">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1500px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Enhanced Central Core */}
          <motion.div
            className="absolute rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 flex items-center justify-center z-10"
            style={{
              width: isMobile ? '48px' : '64px',
              height: isMobile ? '48px' : '64px',
            }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(139, 92, 246, 0.5)',
                '0 0 40px rgba(59, 130, 246, 0.7)',
                '0 0 20px rgba(139, 92, 246, 0.5)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Static rings - no animation */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-white/20"
                style={{
                  width: isMobile ? `${64 + i * 20}px` : `${80 + i * 28}px`,
                  height: isMobile ? `${64 + i * 20}px` : `${80 + i * 28}px`,
                  opacity: 0.4 - i * 0.1,
                }}
              />
            ))}

            {/* Static core glow */}
            <div
              className="rounded-full bg-white/90"
              style={{
                width: isMobile ? '24px' : '32px',
                height: isMobile ? '24px' : '32px',
              }}
            />
          </motion.div>

          {/* Static orbit ring */}
          <div
            className="absolute rounded-full border border-indigo-400/20"
            style={{
              width: `${orbitRadius * 2}px`,
              height: `${orbitRadius * 2}px`,
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.15)',
            }}
          />

          {/* Display position indicator - Top center */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: `calc(50% - ${orbitRadius + (isMobile ? 20 : 30)}px)`,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            animate={{
              opacity: autoRotate && !userInteracted ? [0.4, 0.8, 0.4] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-indigo-400/60" />
              <div className={`${isMobile ? 'text-[9px]' : 'text-xs'} text-indigo-400/60 font-mono whitespace-nowrap`}>
                DISPLAY ZONE
              </div>
            </div>
          </motion.div>

          {/* Connection lines for active node */}
          {activeNodeId && (
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{
                width: '100%',
                height: '100%',
                zIndex: 5,
              }}
            >
              {getRelatedItems(activeNodeId).map((relatedId) => {
                const activeIndex = timelineData.findIndex(item => item.id === activeNodeId);
                const relatedIndex = timelineData.findIndex(item => item.id === relatedId);
                const activePos = calculateNodePosition(activeIndex, timelineData.length);
                const relatedPos = calculateNodePosition(relatedIndex, timelineData.length);

                const centerX = orbitRef.current ? orbitRef.current.offsetWidth / 2 : 0;
                const centerY = orbitRef.current ? orbitRef.current.offsetHeight / 2 : 0;

                return (
                  <motion.line
                    key={`line-${activeNodeId}-${relatedId}`}
                    x1={centerX + activePos.x}
                    y1={centerY + activePos.y}
                    x2={centerX + relatedPos.x}
                    y2={centerY + relatedPos.y}
                    stroke="url(#gradient-line)"
                    strokeWidth={isMobile ? "1.5" : "2"}
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                );
              })}
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute cursor-pointer"
                style={{
                  zIndex: isExpanded ? 200 : position.zIndex,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  x: position.x,
                  y: position.y,
                  scale: isExpanded ? 1 : position.scale,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  mass: 0.8,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id, true);
                }}
              >
                {/* Static energy glow effect */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, rgba(99, 102, 241, ${isPulsing ? 0.35 : 0.2}) 0%, rgba(139, 92, 246, 0) 70%)`,
                    width: isMobile ? `${item.energy * 0.35 + 30}px` : `${item.energy * 0.5 + 40}px`,
                    height: isMobile ? `${item.energy * 0.35 + 30}px` : `${item.energy * 0.5 + 40}px`,
                    left: isMobile ? `-${(item.energy * 0.35 + 30 - 32) / 2}px` : `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: isMobile ? `-${(item.energy * 0.35 + 30 - 32) / 2}px` : `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    opacity: isPulsing ? 0.8 : 0.5,
                    transition: 'opacity 0.3s ease-out',
                  }}
                />

                {/* Node circle */}
                <motion.div
                  className={`
                    rounded-full flex items-center justify-center relative overflow-hidden
                    ${isExpanded
                      ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white"
                      : isRelated
                        ? "bg-gradient-to-br from-blue-400 to-cyan-400 text-black"
                        : "bg-slate-900/90 backdrop-blur-sm text-white"
                    }
                    border-2 
                    ${isExpanded
                      ? "border-white"
                      : isRelated
                        ? "border-blue-400"
                        : "border-indigo-400/40"
                    }
                  `}
                  style={{
                    width: isMobile ? '32px' : '40px',
                    height: isMobile ? '32px' : '40px',
                  }}
                  animate={{
                    scale: isExpanded ? (isMobile ? 1.3 : 1.5) : 1,
                    boxShadow: isExpanded
                      ? '0 0 30px rgba(99, 102, 241, 0.6)'
                      : isRelated
                        ? '0 0 20px rgba(59, 130, 246, 0.4)'
                        : '0 0 10px rgba(99, 102, 241, 0.2)',
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: isExpanded ? (isMobile ? 1.3 : 1.5) : (isMobile ? 1.1 : 1.2),
                  }}
                >
                  <Icon size={isMobile ? 14 : 16} />
                </motion.div>

                {/* Node label */}
                <motion.div
                  className={`
                    absolute whitespace-nowrap pointer-events-none
                    font-semibold tracking-wider text-center
                    ${isExpanded ? "text-indigo-200" : "text-indigo-300/70"}
                  `}
                  style={{
                    top: isMobile ? '36px' : '48px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: isMobile ? '10px' : '12px',
                  }}
                  animate={{
                    scale: isExpanded ? (isMobile ? 1.1 : 1.25) : 1,
                    opacity: isExpanded ? 1 : 0.8,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  {item.title}
                </motion.div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{
                        top: isMobile ? '50px' : '70px',
                      }}
                    >
                      <Card className={`bg-slate-900/95 backdrop-blur-lg border-indigo-500/30 shadow-xl shadow-indigo-500/20 overflow-visible ${isMobile ? 'w-[280px]' : 'w-72'}`}>
                        <motion.div
                          className="absolute -top-3 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-indigo-400 to-transparent"
                          style={{ height: isMobile ? '12px' : '12px' }}
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <CardHeader className={isMobile ? "pb-2 p-4" : "pb-2"}>
                          <div className="flex justify-between items-center gap-2">
                            <Badge
                              className={`px-2 ${isMobile ? 'text-[10px]' : 'text-xs'} ${getStatusStyles(
                                item.status
                              )}`}
                            >
                              {item.status === "completed"
                                ? "MASTERED"
                                : item.status === "in-progress"
                                  ? "LEARNING"
                                  : "UPCOMING"}
                            </Badge>
                            <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-mono text-indigo-300/50`}>
                              {item.date}
                            </span>
                          </div>
                          <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} mt-2 text-white`}>
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className={`${isMobile ? 'text-[11px] p-4 pt-0' : 'text-xs'} text-indigo-100/80`}>
                          <p className="leading-relaxed">{item.content}</p>

                          <motion.div
                            className="mt-4 pt-3 border-t border-indigo-500/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className={`flex justify-between items-center ${isMobile ? 'text-[10px]' : 'text-xs'} mb-1`}>
                              <span className="flex items-center text-indigo-200">
                                <Zap size={isMobile ? 8 : 10} className="mr-1" />
                                Impact Level
                              </span>
                              <span className="font-mono text-indigo-300">{item.energy}%</span>
                            </div>
                            <div className={`w-full ${isMobile ? 'h-1.5' : 'h-1'} bg-indigo-950/50 rounded-full overflow-hidden`}>
                              <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${item.energy}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 0.3,
                                  ease: "easeOut"
                                }}
                              />
                            </div>
                          </motion.div>

                          {item.relatedIds.length > 0 && (
                            <motion.div
                              className="mt-4 pt-3 border-t border-indigo-500/10"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="flex items-center mb-2">
                                <Link size={isMobile ? 8 : 10} className="text-indigo-300/70 mr-1" />
                                <h4 className={`${isMobile ? 'text-[10px]' : 'text-xs'} uppercase tracking-wider font-medium text-indigo-300/70`}>
                                  Related Paths
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {item.relatedIds.map((relatedId, idx) => {
                                  const relatedItem = timelineData.find(
                                    (i) => i.id === relatedId
                                  );
                                  return (
                                    <motion.div
                                      key={relatedId}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.4 + idx * 0.1 }}
                                    >
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className={`flex items-center ${isMobile ? 'h-6 px-2 text-[10px]' : 'h-6 px-2 text-xs'} rounded-md border-indigo-400/20 bg-transparent hover:bg-indigo-500/10 text-indigo-200/80 hover:text-indigo-100 transition-all hover:border-indigo-400/40`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleItem(relatedId);
                                        }}
                                      >
                                        {relatedItem?.title}
                                        <ArrowRight
                                          size={isMobile ? 7 : 8}
                                          className="ml-1 text-indigo-400/60"
                                        />
                                      </Button>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
