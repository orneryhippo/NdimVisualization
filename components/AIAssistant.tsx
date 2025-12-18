
import React, { useState } from 'react';
import { explainHighDimensions } from '../services/geminiService';
import { RotationPlane } from '../types';

interface AIAssistantProps {
  n: number;
  activePlanes: RotationPlane[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ n, activePlanes }) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState<any[]>([]);

  const handleExplain = async () => {
    setLoading(true);
    const activeLabels = activePlanes.filter(p => p.active).map(p => p.label).join(', ') || 'None';
    const result = await explainHighDimensions(n, activeLabels);
    setExplanation(result.text);
    setSources(result.sources);
    setLoading(false);
  };

  return (
    <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden mt-8 shadow-xl">
      <div className="bg-indigo-600/10 p-4 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2 text-indigo-400">
          <i className="fas fa-brain"></i>
          Gemini Mathematical Assistant
        </h3>
        <button
          onClick={handleExplain}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 text-white text-xs px-4 py-2 rounded-lg font-bold transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <i className="fas fa-circle-notch animate-spin"></i> Analyzing...
            </span>
          ) : 'Explain Current Geometry'}
        </button>
      </div>
      
      <div className="p-6">
        {explanation ? (
          <div className="space-y-4">
            <div className="prose prose-invert prose-indigo max-w-none text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </div>
            {sources.length > 0 && (
              <div className="pt-4 border-t border-zinc-800">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Grounding Sources</p>
                <div className="flex flex-wrap gap-2">
                  {sources.map((s, i) => (
                    <a 
                      key={i} 
                      href={s.web?.uri} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                    >
                      {s.web?.title || 'External Reference'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-zinc-500 text-sm italic flex flex-col items-center justify-center py-8">
            <i className="fas fa-chart-line text-4xl mb-4 opacity-20"></i>
            Click "Explain Current Geometry" to get insights into {n}D rotations from Gemini.
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
