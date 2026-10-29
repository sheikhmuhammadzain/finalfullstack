import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const FadeIn = ({ children, className, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={twMerge(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, className, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={twMerge(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const SlideIn = ({ children, className, direction = "left", delay = 0, ...props }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5, delay }}
      className={twMerge(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const BackgroundGradient = ({ children, className, ...props }) => {
  return (
    <div className={twMerge("relative group", className)} {...props}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-900 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
      <div className="relative">{children}</div>
    </div>
  );
};
