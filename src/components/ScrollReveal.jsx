import { useInView } from '../hooks/useInView';

export default function ScrollReveal({ children, className = '', delay = '' }) {
  const { ref, isInView } = useInView(0.12);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${delay} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}
