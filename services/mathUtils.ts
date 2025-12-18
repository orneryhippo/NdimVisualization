
import { Vector, RotationPlane } from '../types';

/**
 * Applies a 2D rotation in the plane defined by two indices.
 */
export const rotateVectorInPlane = (v: Vector, plane: RotationPlane): Vector => {
  const { idx1, idx2, angle } = plane;
  if (idx1 >= v.length || idx2 >= v.length) return v;

  const newV = [...v];
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const x = v[idx1];
  const y = v[idx2];

  newV[idx1] = x * cos - y * sin;
  newV[idx2] = x * sin + y * cos;

  return newV;
};

/**
 * Rotates a vector through multiple active planes.
 */
export const rotateVector = (v: Vector, planes: RotationPlane[]): Vector => {
  let currentV = [...v];
  for (const plane of planes) {
    if (plane.active) {
      currentV = rotateVectorInPlane(currentV, plane);
    }
  }
  return currentV;
};

/**
 * Generates an initial unit vector for N dimensions.
 */
export const createInitialVector = (n: number): Vector => {
  const v = new Array(n).fill(0);
  if (n > 0) v[0] = 1.0; // Point starts on X axis
  return v;
};
