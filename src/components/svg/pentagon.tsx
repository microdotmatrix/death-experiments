"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "motion/react";

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 4.5, bounce: 0.2 },
        opacity: { delay, duration: 0.05 },
      },
    };
  },
};

export const Pentagon = ({ className, ...props }: { className?: string }) => {
  return (
    <motion.svg
      viewBox="0 0 125 116"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "fill-current stroke-foreground [&_path]:fill-current [&_path]:stroke-current",
        className
      )}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {" "}
      <motion.path
        variants={draw}
        style={shape}
        custom={1}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63.3549 114.536L125 70.7495L101.336 0.857422H23.6642L0 70.7495L0.892857 71.3837V71.603H1.2016L62.5 115.143L63.3398 114.547L63.3502 114.55L63.3549 114.536ZM62.0875 112.723L75.8753 71.603H4.19614L62.0875 112.723ZM2.1661 69.8955H46.8502L24.5311 3.84057L2.1661 69.8955ZM25.9767 2.56487H98.3082L39.6379 42.9964L25.9767 2.56487ZM100.288 3.3054L64.0269 28.2939L122.359 68.4922L100.288 3.3054ZM122.288 70.5485L64.291 111.744L86.3975 45.8149L122.288 70.5485ZM40.2148 44.7036L48.7268 69.8955H76.4478L84.8742 44.7651L62.4998 29.3462L40.2148 44.7036Z"
      />{" "}
      <motion.path
        variants={draw}
        style={shape}
        custom={2}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63.3549 114.536L125 70.7495L101.336 0.857422H23.6642L0 70.7495L0.892857 71.3837V71.603H1.2016L62.5 115.143L63.3398 114.547L63.3502 114.55L63.3549 114.536ZM62.0875 112.723L75.8753 71.603H4.19614L62.0875 112.723ZM2.1661 69.8955H46.8502L24.5311 3.84057L2.1661 69.8955ZM25.9767 2.56487H98.3082L39.6379 42.9964L25.9767 2.56487ZM100.288 3.3054L64.0269 28.2939L122.359 68.4922L100.288 3.3054ZM122.288 70.5485L64.291 111.744L86.3975 45.8149L122.288 70.5485ZM40.2148 44.7036L48.7268 69.8955H76.4478L84.8742 44.7651L62.4998 29.3462L40.2148 44.7036Z"
      />
    </motion.svg>
  );
};

const shape: React.CSSProperties = {
  strokeWidth: 1,
  strokeLinecap: "round",
  fill: "transparent",
};
