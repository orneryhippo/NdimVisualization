
import React from 'react';
import { RotationPlane } from '../types';
import { DIMENSION_COLORS } from '../constants';

interface ControlPanelProps {
  n: number;
  setN: (n: number) => void;
  planes: RotationPlane[];
  togglePlane: (index: number) => void;
  updateSpeed: (index: number, speed: number) => void;
  isPaused: boolean;
  setIsPaused: (p: boolean) => void;
  resetRotation: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  n,
  setN,
  planes,
  togglePlane,
  updateSpeed,
  isPaused,
  setIsPaused,
  resetRotation
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800">
      <div className="space-y-6">
        <section>
          <h3 className="text-zinc-400 uppercase text-xs font-bold tracking-widest mb-4">Core Settings</h3>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Dimensions (n):</label>
            <input
              type="range"
              min="2"
              max="10"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
              className="accent-indigo-500 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer flex-grow"
            />
            <span className="mono bg-zinc-800 px-3 py-1 rounded border border-zinc-700 w-12 text-center">{n}</span>
          </div>
        </section>

        <section>
          <h3 className="text-zinc-400 uppercase text-xs font-bold tracking-widest mb-4">Playback</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`flex-grow py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                isPaused 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-100'
              }`}
            >
              <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'}`}></i>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={resetRotation}
              className="px-6 py-3 rounded-xl font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-all"
            >
              <i className="fas fa-undo"></i>
            </button>
          </div>
        </section>
      </div>

      <div className="space-y-4">
        <h3 className="text-zinc-400 uppercase text-xs font-bold tracking-widest">Active Rotation Planes</h3>
        <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-48 pr-2 custom-scrollbar">
          {planes.map((plane, idx) => (
            <div 
              key={plane.label}
              className={`p-3 rounded-xl border transition-all ${
                plane.active 
                ? 'bg-indigo-500/10 border-indigo-500/50' 
                : 'bg-zinc-800/30 border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="mono text-sm font-bold flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DIMENSION_COLORS[plane.idx1] }}></span>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DIMENSION_COLORS[plane.idx2] }}></span>
                  </div>
                  {plane.label}
                </span>
                <input
                  type="checkbox"
                  checked={plane.active}
                  onChange={() => togglePlane(idx)}
                  className="w-4 h-4 rounded text-indigo-500 bg-zinc-700 border-zinc-600 focus:ring-indigo-600"
                />
              </div>
              <input
                type="range"
                min="0"
                max="0.05"
                step="0.001"
                value={plane.speed}
                onChange={(e) => updateSpeed(idx, parseFloat(e.target.value))}
                disabled={!plane.active}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-400 disabled:opacity-30"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
