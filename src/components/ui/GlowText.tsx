import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface GlowTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  glowColor?: string;
  glowIntensity?: 'soft' | 'medium' | 'strong';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  once?: boolean;
}

const glowIntensities = {
  soft: { blur: '20px', opacity: 0.3 },
  medium: { blur: '40px', opacity: 0.5 },
  strong: { blur: '60px', opacity: 0.7 }
};

export function GlowText({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  glowColor = 'rgba(255, 200, 100, 1)',
  glowIntensity = 'medium',
  as = 'div',
  once = true
}: GlowTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '0px 0px -100px 0px', amount: 0.3 });
  const intensity = glowIntensities[glowIntensity];

  // Use motion.div as wrapper with dynamic styling based on 'as' prop
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ display: as === 'span' ? 'inline' : 'block' }}
      initial={{ opacity: 0, filter: 'blur(10px)', textShadow: '0 0 0px transparent' }}
      animate={isInView ? {
        opacity: 1,
        filter: 'blur(0px)',
        textShadow: `0 0 ${intensity.blur} ${glowColor}`,
        transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      } : {}}
    >
      {children}
    </motion.div>
  );
}

interface GlowTextCharByCharProps extends Omit<GlowTextProps, 'children'> {
  text: string;
  charDelay?: number;
}

export function GlowTextCharByChar({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  charDelay = 0.03,
  glowColor = 'rgba(255, 200, 100, 1)',
  glowIntensity = 'medium',
  as = 'div',
  once = true
}: GlowTextCharByCharProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '0px 0px -100px 0px', amount: 0.3 });
  const intensity = glowIntensities[glowIntensity];

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ display: as === 'span' ? 'inline' : 'block' }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: charDelay, delayChildren: delay } }
      }}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          variants={{
            hidden: { opacity: 0.1, textShadow: '0 0 0px transparent' },
            visible: {
              opacity: 1,
              textShadow: `0 0 ${intensity.blur} ${glowColor}`,
              transition: { duration, ease: 'easeOut' }
            }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface GlowTextLineByLineProps extends Omit<GlowTextProps, 'children' | 'as'> {
  lines: string[];
  lineDelay?: number;
}

export function GlowTextLineByLine({
  lines,
  className = '',
  delay = 0,
  duration = 0.6,
  lineDelay = 0.15,
  glowColor = 'rgba(255, 200, 100, 1)',
  glowIntensity = 'medium',
  once = true
}: GlowTextLineByLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '0px 0px -100px 0px', amount: 0.2 });
  const intensity = glowIntensities[glowIntensity];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: lineDelay, delayChildren: delay } }
      }}
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(8px)', textShadow: '0 0 0px transparent' },
            visible: {
              opacity: 1, y: 0, filter: 'blur(0px)',
              textShadow: `0 0 ${intensity.blur} ${glowColor}`,
              transition: { duration, ease: [0.25, 0.46, 0.45, 0.94] }
            }
          }}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default GlowText;
