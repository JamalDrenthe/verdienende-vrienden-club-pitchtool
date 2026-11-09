import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'magenta' | 'gold' | 'emerald' | 'cyan' | 'none';
  maxTilt?: number;
  scale?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glowColor = 'magenta',
  maxTilt = 8,
  scale = 1.02,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  }, [maxTilt, scale]);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  const glowStyles = {
    magenta: 'hover:border-[#e6007e]/60 hover:shadow-[0_12px_40px_-10px_rgba(230,0,126,0.35)]',
    gold: 'hover:border-amber-400/60 hover:shadow-[0_12px_40px_-10px_rgba(251,191,36,0.35)]',
    emerald: 'hover:border-emerald-500/60 hover:shadow-[0_12px_40px_-10px_rgba(16,185,129,0.35)]',
    cyan: 'hover:border-cyan-400/60 hover:shadow-[0_12px_40px_-10px_rgba(6,182,212,0.35)]',
    none: '',
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.12s ease-out, border-color 0.2s ease, box-shadow 0.2s ease',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden transition-all ${glowStyles[glowColor]} ${className}`}
      {...props}
    >
      {/* Dynamic 3D Glare Light Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.25) 0%, rgba(230, 0, 126, 0.1) 40%, transparent 70%)`,
          opacity: glarePos.opacity,
        }}
      />
      <div style={{ transform: 'translateZ(12px)' }}>
        {children}
      </div>
    </div>
  );
};
