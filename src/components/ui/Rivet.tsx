/**
 * Tactile rivet dot — used for corner accents on cards, badges, and surfaces.
 * Matches the FeaturesSection / tactile-design "bevel" look.
 */
export function Rivet({ className = '', size = 7 }: { className?: string; size?: number }) {
  return (
    <div
      className={`absolute rounded-full z-10 pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.5), rgba(0,0,0,0.06))',
        boxShadow: 'inset 0 0.5px 1.5px rgba(0,0,0,0.2), 0 0.5px 0 rgba(255,255,255,0.5)',
      }}
    />
  );
}
