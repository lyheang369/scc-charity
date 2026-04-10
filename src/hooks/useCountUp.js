import { useState, useEffect } from 'react';

/**
 * Animates a number from 0 to `target` each time `started` flips to true.
 * Resets to 0 when `started` becomes false so the animation replays on re-entry.
 */
export function useCountUp(target, { duration = 1800, started = false } = {}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) {
      setCount(0);
      return;
    }

    let frameId;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [started, target, duration]);

  return count;
}
