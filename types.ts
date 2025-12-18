
export type Vector = number[];

export interface RotationPlane {
  idx1: number;
  idx2: number;
  label: string;
  angle: number;
  active: boolean;
  speed: number;
}

export interface DimensionMetadata {
  label: string;
  color: string;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}
