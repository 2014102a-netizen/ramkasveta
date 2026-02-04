import { useEffect, useRef, useState } from 'react';

interface UseGlowOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useGlowOnScroll(options: UseGlowOnScrollOptions = {}) {
  const {
    threshold = 0.2,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [glowProgress, setGlowProgress] = useState(0);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerOnce && hasTriggered.current) return;
            hasTriggered.current = true;

            setTimeout(() => {
              setIsVisible(true);
              let start: number | null = null;
              const duration = 800;

              const animate = (timestamp: number) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setGlowProgress(eased);
                if (progress < 1) requestAnimationFrame(animate);
              };

              requestAnimationFrame(animate);
            }, delay);
          } else if (!triggerOnce) {
            setIsVisible(false);
            setGlowProgress(0);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { ref: ref as React.RefObject<HTMLElement>, isVisible, glowProgress };
}

export default useGlowOnScroll;
