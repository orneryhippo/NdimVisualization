
import React from 'react';

export const DIMENSION_COLORS = [
  '#ef4444', // red-500
  '#22c55e', // green-500
  '#3b82f6', // blue-500
  '#a855f7', // purple-500
  '#f59e0b', // amber-500
  '#ec4899', // pink-500
  '#06b6d4', // cyan-500
  '#84cc16', // lime-500
  '#6366f1', // indigo-500
  '#f97316', // orange-500
];

export const DIMENSION_LABELS = ['X', 'Y', 'Z', 'W', 'P', 'Q', 'R', 'S', 'T', 'U'];

export const INITIAL_4D_PLANES = [
  { idx1: 0, idx2: 1, label: 'XY', angle: 0, active: true, speed: 0.01 },
  { idx1: 0, idx2: 2, label: 'XZ', angle: 0, active: false, speed: 0.015 },
  { idx1: 0, idx2: 3, label: 'XW', angle: 0, active: true, speed: 0.008 },
  { idx1: 1, idx2: 2, label: 'YZ', angle: 0, active: false, speed: 0.012 },
  { idx1: 1, idx2: 3, label: 'YW', angle: 0, active: false, speed: 0.005 },
  { idx1: 2, idx2: 3, label: 'ZW', angle: 0, active: true, speed: 0.02 },
];
