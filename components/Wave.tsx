
import React from 'react';

interface WaveProps {
  fill: string; // Should be a Tailwind color class (e.g., 'text-school-blue')
  position?: 'top' | 'bottom';
  variant?: 1 | 2 | 3; // Different wave shapes
  className?: string;
  flip?: boolean; // If true, flips the wave vertically (good for hanging waves)
}

const Wave: React.FC<WaveProps> = ({ fill, position = 'bottom', variant = 1, className = '', flip = false }) => {
  // Default logic for transform based on props
  // If specific logic is needed for "cutout" style, usually just className is enough to handle margins/z-index
  // But we need to ensure rotation logic doesn't conflict.

  const isTop = position === 'top';
  let transformClass = '';
  
  // Standard top wave usually needs 180deg to look like a cutout from top? 
  // Or standard bottom wave of PREVIOUS section looks like top wave of THIS section.
  // Let's stick to simple logic: if flip, rotate. 
  if (isTop) transformClass = 'rotate-180'; 
  if (flip) transformClass = transformClass === 'rotate-180' ? '' : 'rotate-180';

  // If className contains 'absolute', we assume caller handles positioning fully.
  // Otherwise we might add defaults. But for now, we just pass className.

  const paths = {
    1: "M0,24L48,26.7C96,29.3,192,34.7,288,33.3C384,32,480,24,576,21.3C672,18.7,768,21.3,864,24C960,26.7,1056,29.3,1152,29.3C1248,29.3,1344,26.7,1392,25.3L1440,24V54H1392C1344,54,1248,54,1152,54C1056,54,960,54,864,54C768,54,672,54,576,54C480,54,384,54,288,54C192,54,96,54,48,54H0V24Z",
    2: "M0,10L40,13.3C80,16.7,160,23.3,240,23.3C320,23.3,400,16.7,480,15C560,13.3,640,16.7,720,18.3C800,20,880,20,960,18.3C1040,16.7,1120,13.3,1200,13.3C1280,13.3,1360,16.7,1400,18.3L1440,20V54H1400C1360,54,1280,54,1200,54C1120,54,1040,54,960,54C880,54,800,54,720,54C640,54,560,54,480,54C400,54,320,54,240,54C160,54,80,54,40,54H0V10Z",
    3: "M0,30L60,28.3C120,26.7,240,23.3,360,23.3C480,23.3,600,26.7,720,26.7C840,26.7,960,23.3,1080,21.7C1200,20,1320,20,1380,20L1440,20V54H1380C1320,54,1200,54,1080,54C960,54,840,54,720,54C600,54,480,54,360,54C240,54,120,54,60,54H0V30Z"
  };

  return (
    <div 
      className={`absolute w-full overflow-hidden leading-[0] z-10 pointer-events-none ${fill} ${className}`}
      style={{ transform: transformClass ? transformClass : undefined }}
    >
      <svg 
        className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" 
        viewBox="0 24 150 28" 
        preserveAspectRatio="none" 
        shapeRendering="auto"
      >
        <defs>
          <path id={`gentle-wave-${variant}`} d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className="wave-parallax">
          <use xlinkHref={`#gentle-wave-${variant}`} x="48" y="0" className="fill-current opacity-70" />
          <use xlinkHref={`#gentle-wave-${variant}`} x="48" y="3" className="fill-current opacity-50" />
          <use xlinkHref={`#gentle-wave-${variant}`} x="48" y="5" className="fill-current opacity-30" />
          <use xlinkHref={`#gentle-wave-${variant}`} x="48" y="7" className="fill-current" />
        </g>
      </svg>
    </div>
  );
};

export default Wave;