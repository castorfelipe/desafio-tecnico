import { MotionProps } from "framer-motion";

const fadeInOut = (duration?: number): MotionProps => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: duration ? { duration } : undefined
});

const animations = { fadeInOut };

export default animations;
