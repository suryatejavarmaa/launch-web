"use client";

import React from "react";
import { motion } from "motion/react";
import { Folder, HeartHandshakeIcon, SparklesIcon } from "lucide-react";
import { cn } from "./utils";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth?: string;
    sixth?: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className
      )}
    >
      {/* SVG Paths  */}
      <svg
        className="h-full sm:w-full text-indigo-400/30"
        width="100%"
        height="100%"
        viewBox="0 0 390 100"
      >
        <g
          stroke="url(#path-gradient)"
          fill="none"
          strokeWidth="0.5"
          strokeDasharray="100 100"
          pathLength="100"
        >
          <path d="M 33 10 v 15 q 0 5 5 5 h 147 q 5 0 5 5 v 10" />
          <path d="M 98 10 v 10 q 0 5 5 5 h 82 q 5 0 5 5 v 10" />
          <path d="M 155.5 10 v 10 q 0 5 5 5 h 24.5 q 5 0 5 5 v 10" />
          <path d="M 205.5 10 v 10 q 0 5 -5 5 h -5.5 q -5 0 -5 5 v 10" />
          <path d="M 273 10 v 10 q 0 5 -5 5 h -78 q -5 0 -5 5 v 10" />
          <path d="M 347 10 v 15 q 0 5 -5 5 h -152 q -5 0 -5 5 v 10" />
          {/* Animation For Path Starting */}
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        </g>
        {/* Blue Lights */}
        <g mask="url(#db-mask-1)">
          <circle
            className="database db-light-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-2)">
          <circle
            className="database db-light-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-3)">
          <circle
            className="database db-light-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-4)">
          <circle
            className="database db-light-4"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-5)">
          <circle
            className="database db-light-5"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-6)">
          <circle
            className="database db-light-6"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        {/* Buttons */}
        <g stroke="url(#button-border-gradient)" fill="none" strokeWidth="0.5">
          {/* First Button - OpenAI */}
          <g>
            <rect
              fill="url(#button-bg-gradient-1)"
              x="8"
              y="3"
              width="50"
              height="14"
              rx="7"
            ></rect>
            <DatabaseIcon x="11.5" y="6.5"></DatabaseIcon>
            <text
              x="33"
              y="12.5"
              fill="white"
              stroke="none"
              fontSize="4.5"
              fontWeight="600"
              textAnchor="middle"
            >
              {badgeTexts?.first || "GET"}
            </text>
          </g>
          {/* Second Button - Google DeepMind */}
          <g>
            <rect
              fill="url(#button-bg-gradient-2)"
              x="63"
              y="3"
              width="70"
              height="14"
              rx="7"
            ></rect>
            <DatabaseIcon x="66.5" y="6.5"></DatabaseIcon>
            <text
              x="98"
              y="12.5"
              fill="white"
              stroke="none"
              fontSize="4.5"
              fontWeight="600"
              textAnchor="middle"
            >
              {badgeTexts?.second || "POST"}
            </text>
          </g>
          {/* Third Button - IBM */}
          <g>
            <rect
              fill="url(#button-bg-gradient-3)"
              x="138"
              y="3"
              width="35"
              height="14"
              rx="7"
            ></rect>
            <DatabaseIcon x="141.5" y="6.5"></DatabaseIcon>
            <text
              x="155.5"
              y="12.5"
              fill="white"
              stroke="none"
              fontSize="4.5"
              fontWeight="600"
              textAnchor="middle"
            >
              {badgeTexts?.third || "PUT"}
            </text>
          </g>
          {/* Fourth Button - LLM Arena */}
          <g>
            <rect
              fill="url(#button-bg-gradient-4)"
              x="178"
              y="3"
              width="55"
              height="14"
              rx="7"
            ></rect>
            <DatabaseIcon x="181.5" y="6.5"></DatabaseIcon>
            <text
              x="205.5"
              y="12.5"
              fill="white"
              stroke="none"
              fontSize="4.5"
              fontWeight="600"
              textAnchor="middle"
            >
              {badgeTexts?.fourth || "PATCH"}
            </text>
          </g>
          {/* Fifth Button - Microsoft Azure */}
          {badgeTexts?.fifth && (
            <g>
              <rect
                fill="url(#button-bg-gradient-5)"
                x="238"
                y="3"
                width="70"
                height="14"
                rx="7"
              ></rect>
              <DatabaseIcon x="241.5" y="6.5"></DatabaseIcon>
              <text
                x="273"
                y="12.5"
                fill="white"
                stroke="none"
                fontSize="4.5"
                fontWeight="600"
                textAnchor="middle"
              >
                {badgeTexts.fifth}
              </text>
            </g>
          )}
          {/* Sixth Button - Hugging Face */}
          {badgeTexts?.sixth && (
            <g>
              <rect
                fill="url(#button-bg-gradient-6)"
                x="313"
                y="3"
                width="68"
                height="14"
                rx="7"
              ></rect>
              <DatabaseIcon x="316.5" y="6.5"></DatabaseIcon>
              <text
                x="347"
                y="12.5"
                fill="white"
                stroke="none"
                fontSize="4.5"
                fontWeight="600"
                textAnchor="middle"
              >
                {badgeTexts.sixth}
              </text>
            </g>
          )}
        </g>
        <defs>
          {/* 1 - OpenAI */}
          <mask id="db-mask-1">
            <path
              d="M 33 10 v 15 q 0 5 5 5 h 147 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 2 - Google DeepMind */}
          <mask id="db-mask-2">
            <path
              d="M 98 10 v 10 q 0 5 5 5 h 82 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 3 - IBM */}
          <mask id="db-mask-3">
            <path
              d="M 155.5 10 v 10 q 0 5 5 5 h 24.5 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 4 - LLM Arena */}
          <mask id="db-mask-4">
            <path
              d="M 205.5 10 v 10 q 0 5 -5 5 h -5.5 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 5 - Microsoft Azure */}
          <mask id="db-mask-5">
            <path
              d="M 273 10 v 10 q 0 5 -5 5 h -78 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 6 - Hugging Face */}
          <mask id="db-mask-6">
            <path
              d="M 347 10 v 15 q 0 5 -5 5 h -152 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* Light Particles Gradient */}
          <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#a855f7"} />
            <stop offset="50%" stopColor={lightColor ? `${lightColor}80` : "#ec4899"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          
          {/* Path Gradient */}
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          
          {/* Button Border Gradient */}
          <linearGradient id="button-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
          </linearGradient>
          
          {/* Button Background Gradients */}
          <linearGradient id="button-bg-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          
          <linearGradient id="button-bg-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#581c87" />
            <stop offset="100%" stopColor="#6b21a8" />
          </linearGradient>
          
          <linearGradient id="button-bg-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#701a75" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
          
          <linearGradient id="button-bg-gradient-4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#831843" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          
          <linearGradient id="button-bg-gradient-5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          
          <linearGradient id="button-bg-gradient-6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Main Box */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        {/* bottom shadow */}
        <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-purple-500/20 blur-xl" />
        {/* box title */}
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border border-purple-500/30 bg-gradient-to-r from-indigo-950 via-purple-950 to-pink-950 px-2 py-1 sm:-top-4 sm:py-1.5 shadow-lg shadow-purple-500/20">
          <SparklesIcon className="size-3 text-purple-400" />
          <span className="ml-2 text-[10px] text-purple-200">
            {title ? title : "Data exchange using a customized REST API"}
          </span>
        </div>
        {/* box outter circle */}
        <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-2 border-purple-500/40 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 font-semibold text-xs text-purple-200 shadow-lg shadow-purple-500/30">
          {circleText ? circleText : "SVG"}
        </div>
        {/* box content */}
        <div className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg border border-purple-500/20 bg-gradient-to-br from-slate-950 via-indigo-950/50 to-purple-950/50 shadow-xl shadow-purple-500/10">
          {/* Badges */}
          <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 z-10 h-6 sm:h-7 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-2 sm:px-3 text-[10px] sm:text-xs border border-indigo-400/30 flex items-center gap-1 sm:gap-2 shadow-lg shadow-indigo-500/30">
            <HeartHandshakeIcon className="size-3 sm:size-4 text-indigo-200" />
            <span className="text-white font-medium">{buttonTexts?.first || "LegionDev"}</span>
          </div>
          <div className="absolute bottom-8 right-4 sm:right-12 md:right-16 z-10 h-6 sm:h-7 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-2 sm:px-3 text-[10px] sm:text-xs flex border border-purple-400/30 items-center gap-1 sm:gap-2 shadow-lg shadow-purple-500/30">
            <Folder className="size-3 sm:size-4 text-purple-200" />
            <span className="text-white font-medium">{buttonTexts?.second || "v2_updates"}</span>
          </div>
          {/* Circles */}
          <motion.div
            className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t border-indigo-500/30 bg-indigo-500/5"
            animate={{
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t border-purple-500/30 bg-purple-500/5"
            animate={{
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t border-pink-500/30 bg-pink-500/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t border-fuchsia-500/30 bg-fuchsia-500/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;

const DatabaseIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="6.5"
      height="6.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
};
