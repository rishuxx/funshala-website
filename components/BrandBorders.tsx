import React from "react";

const BrandBorders: React.FC = () => {
  // Vibrant, highly saturated rainbow colors for maximum impact
  const colors = [
    "#00FF00", // Bright Green
    "#7FFF00", // Chartreuse
    "#FFFF00", // Bright Yellow
    "#FFD700", // Gold
    "#FFA500", // Orange
    "#FF6347", // Tomato Red
    "#FF1493", // Deep Pink
    "#FF00FF", // Magenta
    "#9400D3", // Violet
    "#4169E1", // Royal Blue
    "#00BFFF", // Deep Sky Blue
    "#00FFFF", // Cyan
  ];

  // Calculate width percentage for each segment
  const segmentWidth = `${100 / colors.length}%`;

  return (
    <>
      <style>{`
        @keyframes subtleGlow {
          0%, 100% {
            filter: brightness(1) saturate(1.5) drop-shadow(0 0 2px currentColor);
          }
          50% {
            filter: brightness(1.15) saturate(1.7) drop-shadow(0 0 4px currentColor);
          }
        }

        .glow-segment {
          animation: subtleGlow 3s ease-in-out infinite;
        }

        /* Stagger the animation for each segment */
        ${colors
          .map(
            (_, index) => `
          .glow-segment:nth-child(${index + 1}) {
            animation-delay: ${index * 0.2}s;
          }
        `
          )
          .join("")}
      `}</style>

      {/* Top Border */}
      <div className="fixed top-0 left-0 w-full h-2 z-[100] flex pointer-events-none shadow-lg">
        {colors.map((color, index) => (
          <div
            key={`top-${index}`}
            style={{
              backgroundColor: color,
              color: color, // For drop-shadow currentColor
              width: segmentWidth,
            }}
            className="glow-segment"
          />
        ))}
      </div>

      {/* Bottom Border */}
      <div className="fixed bottom-0 left-0 w-full h-2 z-[100] flex pointer-events-none shadow-lg">
        {colors.map((color, index) => (
          <div
            key={`bottom-${index}`}
            style={{
              backgroundColor: color,
              color: color, // For drop-shadow currentColor
              width: segmentWidth,
            }}
            className="glow-segment"
          />
        ))}
      </div>
    </>
  );
};

export default BrandBorders;
