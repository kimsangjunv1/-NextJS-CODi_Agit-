"use client";

import { motion } from "framer-motion";

interface TextScreeningProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number; // seconds
  style?: React.CSSProperties;
}

const TextScreening = ({
  children,
  as: Component = "span",
  className = "",
  style = {},
  duration = 3,
}: TextScreeningProps) => {
  const MotionComponent = motion(Component);

  return (
    <span className={`relative inline-block ${className}`} style={style}>
      {/* 기본 반투명 텍스트 */}
      <span className={`text-[#ffffff] ${ className }`}>{children}</span>

      {/* 왼쪽에서 오른쪽으로 색이 채워지는 레이어 */}
      <MotionComponent
        className={`absolute top-0 left-0 overflow-hidden ${ className }`}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration, ease: "linear" }}
        style={{
          backgroundImage: "linear-gradient(90deg, white, black, var(--color-brand-500))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          whiteSpace: "nowrap",
          display: "inline-block",
        }}
      >
        {children}
      </MotionComponent>
    </span>
  );
};

export default TextScreening;