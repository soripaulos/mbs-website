import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export default function DynamicIcon({ name, size = 24, className = '', color }: DynamicIconProps) {
  // Get the icon component from Lucide icons
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[name];

  if (!IconComponent) {
    // Fallback to a default icon if the name doesn't match
    const FallbackIcon = LucideIcons.Circle;
    return <FallbackIcon size={size} className={className} color={color} />;
  }

  return <IconComponent size={size} className={className} color={color} />;
}
