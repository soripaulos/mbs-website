/** Skeleton shimmer block shown while Sanity data is in flight. */
export default function Shimmer({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return <div className={`shimmer rounded-2xl ${className}`} style={style} aria-hidden="true" />;
}
