
import React from 'react';
import { Vector } from '../types';
import { DIMENSION_COLORS, DIMENSION_LABELS } from '../constants';

interface ArrowVisualizerProps {
  vector: Vector;
}

const ArrowVisualizer: React.FC<ArrowVisualizerProps> = ({ vector }) => {
  const padding = 60;
  const width = Math.max(800, vector.length * 120 + padding * 2);
  const height = 500;
  const centerY = height / 2;
  const spacing = (width - padding * 2) / (vector.length - 1 || 1);
  const scale = 180; // pixels per unit (max 1 unit)

  return (
    <div className="w-full overflow-x-auto bg-zinc-900/50 rounded-2xl border border-zinc-800 p-8 shadow-2xl backdrop-blur-sm">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto"
      >
        {/* Horizontal Zero Baseline */}
        <line
          x1={padding - 40}
          y1={centerY}
          x2={width - padding + 40}
          y2={centerY}
          stroke="#3f3f46"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {vector.map((val, i) => {
          const x = padding + i * spacing;
          const color = DIMENSION_COLORS[i % DIMENSION_COLORS.length];
          const arrowLength = val * scale;
          const tipY = centerY - arrowLength;
          const isPositive = val >= 0;

          return (
            <g key={i} className="transition-all duration-75">
              {/* Axis Line */}
              <line
                x1={x}
                y1={centerY - scale}
                x2={x}
                y2={centerY + scale}
                stroke="#27272a"
                strokeWidth="2"
              />

              {/* Arrow Line */}
              <line
                x1={x}
                y1={centerY}
                x2={x}
                y2={tipY}
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Arrow Head */}
              <path
                d={`M ${x - 10} ${tipY + (isPositive ? 12 : -12)} L ${x} ${tipY} L ${x + 10} ${tipY + (isPositive ? 12 : -12)}`}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Label Circle */}
              <circle cx={x} cy={centerY} r="5" fill={color} />

              {/* Dimension Label */}
              <text
                x={x}
                y={centerY + scale + 30}
                fill={color}
                textAnchor="middle"
                className="text-lg font-bold mono"
              >
                {DIMENSION_LABELS[i] || `X${i}`}
              </text>

              {/* Value Label */}
              <text
                x={x}
                y={tipY + (isPositive ? -20 : 30)}
                fill="white"
                textAnchor="middle"
                className="text-xs mono opacity-80"
              >
                {val.toFixed(3)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ArrowVisualizer;
