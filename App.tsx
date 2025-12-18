
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ArrowVisualizer from './components/ArrowVisualizer';
import ControlPanel from './components/ControlPanel';
import AIAssistant from './components/AIAssistant';
import { Vector, RotationPlane } from './types';
import { INITIAL_4D_PLANES, DIMENSION_LABELS } from './constants';
import { createInitialVector, rotateVector } from './services/mathUtils';

const App: React.FC = () => {
  const [n, setN] = useState(4);
  const [vector, setVector] = useState<Vector>(createInitialVector(4));
  const [planes, setPlanes] = useState<RotationPlane[]>(INITIAL_4D_PLANES);
  const [isPaused, setIsPaused] = useState(false);
  
  const animationRef = useRef<number>();
  const lastUpdateRef = useRef<number>(performance.now());

  // Generate planes when N changes
  useEffect(() => {
    const newPlanes: RotationPlane[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const label = `${DIMENSION_LABELS[i] || `X${i}`}${DIMENSION_LABELS[j] || `X${j}`}`;
        const existing = planes.find(p => p.label === label);
        newPlanes.push({
          idx1: i,
          idx2: j,
          label,
          angle: existing?.angle || 0,
          active: existing?.active || (i === 0 && j === 1), // Default XY active
          speed: existing?.speed || 0.01 + Math.random() * 0.01
        });
      }
    }
    setPlanes(newPlanes);
    setVector(createInitialVector(n));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  const updateAnimation = useCallback((time: number) => {
    if (!isPaused) {
      setPlanes(prevPlanes => {
        const updatedPlanes = prevPlanes.map(p => ({
          ...p,
          angle: p.active ? p.angle + p.speed : p.angle
        }));
        
        // Calculate new vector based on initial reference to avoid drift
        // or just incrementally rotate. To keep it simple and smooth:
        const baseV = createInitialVector(n);
        const newV = rotateVector(baseV, updatedPlanes);
        setVector(newV);
        
        return updatedPlanes;
      });
    }
    animationRef.current = requestAnimationFrame(updateAnimation);
  }, [isPaused, n]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateAnimation);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [updateAnimation]);

  const togglePlane = (idx: number) => {
    setPlanes(prev => prev.map((p, i) => i === idx ? { ...p, active: !p.active } : p));
  };

  const updateSpeed = (idx: number, speed: number) => {
    setPlanes(prev => prev.map((p, i) => i === idx ? { ...p, speed } : p));
  };

  const resetRotation = () => {
    setPlanes(prev => prev.map(p => ({ ...p, angle: 0 })));
    setVector(createInitialVector(n));
  };

  return (
    <div className="min-h-screen p-4 md:p-10 max-w-7xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            N-DIMENSIONAL
          </h1>
          <p className="text-zinc-500 font-medium tracking-wide flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 bg-zinc-800 rounded text-xs border border-zinc-700 text-zinc-300">ORTHOGONAL ARROW VISUALIZER</span>
            Exploring high-dimensional geometry and rotations.
          </p>
        </div>
        <div className="flex gap-2 text-xs mono text-zinc-500 uppercase font-bold bg-zinc-900/50 p-3 rounded-xl border border-zinc-800 shadow-inner">
          <div className="flex flex-col">
            <span className="text-zinc-600">Active Dim</span>
            <span className="text-indigo-400 text-lg">{n}</span>
          </div>
          <div className="w-px bg-zinc-800 mx-2"></div>
          <div className="flex flex-col">
            <span className="text-zinc-600">Possible Planes</span>
            <span className="text-cyan-400 text-lg">{(n * (n-1)) / 2}</span>
          </div>
        </div>
      </header>

      <main className="space-y-8">
        <ArrowVisualizer vector={vector} />
        
        <ControlPanel 
          n={n} 
          setN={setN}
          planes={planes}
          togglePlane={togglePlane}
          updateSpeed={updateSpeed}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          resetRotation={resetRotation}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AIAssistant n={n} activePlanes={planes} />
          </div>
          <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6 shadow-xl flex flex-col justify-center mt-8">
            <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <i className="fas fa-info-circle text-indigo-500"></i>
              How it works
            </h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex gap-3">
                <span className="text-indigo-500 mt-1">•</span>
                <span>Each vertical arrow represents an <strong>orthogonal dimension</strong> ($x_1, x_2, \dots, x_n$).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-500 mt-1">•</span>
                <span>The <strong>length</strong> and <strong>direction</strong> of the arrow indicates the coordinate value in that dimension, ranging from -1 to 1.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-500 mt-1">•</span>
                <span>A "point" in $N$-dimensional space is represented by the <strong>set of all arrow heights</strong> at once.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-500 mt-1">•</span>
                <span>Rotations occur within <strong>planes</strong> defined by pairs of dimensions (e.g., the $XY$ plane rotates values between the first two arrows).</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="text-center py-12 text-zinc-600 text-xs border-t border-zinc-900 mt-20">
        <p className="flex items-center justify-center gap-2 uppercase tracking-widest font-bold">
          High-Dimensional Euclidean Engine &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;
