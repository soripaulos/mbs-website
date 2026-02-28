import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export default function DynamicIcon({ name, size = 24, className = '', color }: DynamicIconProps) {
  // Guard against null/undefined icon names from CMS (prevents "Cannot read properties of null (reading 'replace')")
  if (!name || typeof name !== 'string') {
    const FallbackIcon = LucideIcons.Circle;
    return <FallbackIcon size={size} className={className} color={color} />;
  }
  // Convert kebab-case or lowercase to PascalCase (e.g. "map-pin" -> "MapPin", "laptop" -> "Laptop")
  const formattedName = name
    .replace(/(^\w|-\w)/g, (clearAndUpper) => clearAndUpper.replace(/-/, "").toUpperCase());

  // Get the icon component from Lucide icons
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[formattedName];

  if (!IconComponent) {
    // Fallback to a default icon if the name doesn't match
    const FallbackIcon = LucideIcons.Circle;
    return <FallbackIcon size={size} className={className} color={color} />;
  }

  return <IconComponent size={size} className={className} color={color} />;
}
