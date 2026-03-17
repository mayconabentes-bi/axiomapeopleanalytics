import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  skill: string;
  current: number;
  target: number;
}

interface DevelopmentMapProps {
  skills: Skill[];
  brandColor?: string;
}

export const DevelopmentMap: React.FC<DevelopmentMapProps> = ({ skills, brandColor = '#D4AF37' }) => {
  return (
    <div className="space-y-6">
      {skills.map((s, i) => (
        <div key={i} className="relative">
          <div className="flex justify-between text-[10px] uppercase tracking-widest mb-2">
            <span className="text-zinc-400">{s.skill}</span>
            <span className="text-white font-bold">{s.current}% <span className="text-zinc-600">→</span> {s.target}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-900 overflow-hidden relative">
            {/* Target Bar (ghost) */}
            <div 
              className="absolute inset-y-0 left-0 bg-white/5 border-r border-white/20"
              style={{ width: `${s.target}%` }}
            />
            {/* Current Bar */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${s.current}%` }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="absolute inset-y-0 left-0"
              style={{ backgroundColor: brandColor }}
            />
          </div>
        </div>
      ))}
      <p className="text-[9px] text-zinc-500 italic mt-4">
        *O gap cinza representa sua zona de oportunidade para o biênio 2025-2027.
      </p>
    </div>
  );
};
