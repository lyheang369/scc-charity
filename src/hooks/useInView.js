import { useEffect, useRef, useState } from 'react';

/**
 * @param {number} threshold - 0–1, how much of the element must be visible
 * @param {{ once?: boolean }} options
 *   once: true  → fires once and disconnects (default, used by ScrollReveal)
 *   once: false → fires on every enter AND exit (used by count-up animations)
 */
export function useInView(threshold = 0.15, { once = true } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isInView };
}
