import { motion } from "framer-motion";

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [1, 1, 1, 1]
    }
  }
};

function CursorBlinker() {
  return (
    <motion.div
      variants={cursorVariants}
      animate="blinking"
      className={`inline-block h-7 w-0.5 translate-y-1 bg-blue-500 font-bold overflow-hidden relative`}
    />
  );
}

export default CursorBlinker;
