import { Variants } from 'framer-motion';

/**
 * Glitch animation variants for text and logos
 */
export const glitchVariants: Variants = {
  initial: {
    x: 0,
    y: 0,
    filter: 'hue-rotate(0deg)',
  },
  animate: {
    x: [0, -2, 2, -2, 2, 0],
    y: [0, 2, -2, 2, -2, 0],
    filter: [
      'hue-rotate(0deg)',
      'hue-rotate(90deg)',
      'hue-rotate(180deg)',
      'hue-rotate(270deg)',
      'hue-rotate(360deg)',
      'hue-rotate(0deg)',
    ],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

/**
 * Window animation variants for opening and closing
 */
export const windowVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Boot sequence animation variants
 */
export const bootVariants: Variants = {
  bios: {
    opacity: 0,
  },
  biosVisible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  glitch: {
    opacity: [0, 1, 0, 1],
    scale: [1, 1.1, 0.9, 1],
    filter: [
      'hue-rotate(0deg)',
      'hue-rotate(90deg)',
      'hue-rotate(180deg)',
      'hue-rotate(0deg)',
    ],
    transition: {
      duration: 1.5,
      times: [0, 0.3, 0.6, 1],
    },
  },
  login: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  desktop: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

/**
 * Notification/Toast animation variants
 */
export const notificationVariants: Variants = {
  initial: {
    opacity: 0,
    y: -50,
    x: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Page transition variants
 */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Fade variants
 */
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Slide from bottom variants
 */
export const slideUpVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * CRT turn on effect
 */
export const crtTurnOnVariants: Variants = {
  initial: {
    scaleY: 0.001,
    scaleX: 2,
    filter: 'brightness(4)',
  },
  animate: {
    scaleY: [0.001, 0.5, 1],
    scaleX: [2, 1.5, 1],
    filter: ['brightness(4)', 'brightness(2)', 'brightness(1)'],
    transition: {
      duration: 0.6,
      times: [0, 0.5, 1],
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/**
 * Pixel fade in effect
 */
export const pixelFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

/**
 * Stagger children animation
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Stagger child item
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};
