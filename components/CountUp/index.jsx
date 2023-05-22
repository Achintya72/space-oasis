import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

export default function CountUp({ children, number }) {
  const count = useMotionValue("0");
  const rounded = useTransform(count, (latest) =>
    (Math.round(latest * 100) / 100).toLocaleString()
  );

  useEffect(() => {
    const animation = animate(count, number, {
      duration: 0.5,
      ease: "easeInOut",
    });

    return animation.stop;
  });

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <motion.h2>{rounded}</motion.h2>
      {children}
    </div>
  );
}
