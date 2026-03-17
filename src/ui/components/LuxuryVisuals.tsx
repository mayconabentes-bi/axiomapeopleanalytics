import React from 'react';
import { motion } from 'framer-motion';
import { DadosBioArc, DadosOndas, DadosTaleb } from '../../types/contratos';

// ════════════════════════════════════════
// BIO ARC (Arco de Sentênios)
// ════════════════════════════════════════
export const BioArc: React.FC<{ dados: DadosBioArc }> = ({ dados }) => {
  return (
    <div className="relative w-full max-w-[240px] mx-auto aspect-[2/1]">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Background Arc */}
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M 20 90 A 80 80 0 0 1 180 90" 
          fill="none" 
          stroke="rgba(255,255,255,0.05)" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        {/* Progress Arc */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          d="M 20 90 A 80 80 0 0 1 180 90" 
          fill="none" 
          stroke="url(#goldGradient)" 
          strokeWidth="2" 
          strokeDasharray="251"
          strokeDashoffset={251 * (1 - (180 - dados.angulo)/180)}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A6E2F" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6E2F" />
          </linearGradient>
        </defs>
        
        {/* Marker */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, x: dados.cx - 100, y: dados.cy - 90 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 80, damping: 10 }}
        >
          <circle cx="100" cy="90" r="5" fill="#D4AF37" className="shadow-lg" />
          <circle cx="100" cy="90" r="8" fill="none" stroke="#D4AF37" strokeWidth="1">
            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </motion.g>

        {/* Labels */}
        <text x="20" y="98" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle">21</text>
        <text x="180" y="98" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle">70+</text>
      </svg>
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-0 left-0 w-full text-center mt-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
           {dados.fase}
        </span>
      </motion.div>
    </div>
  );
};

// ════════════════════════════════════════
// ULTRADIAN WAVES (Cronobiologia)
// ════════════════════════════════════════
export const UltradianWaves: React.FC<{ dados: DadosOndas }> = ({ dados }) => {
  return (
    <div className="w-full h-32 bg-zinc-900/20 rounded-xl p-4 border border-zinc-800/50 relative overflow-hidden">
      <svg viewBox="0 0 240 80" className="w-full h-full overflow-visible">
        {/* Baseline curve */}
        <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M 0 60 Q 30 20, 60 50 T 120 40 T 180 60 T 240 40" 
            fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="1" 
        />
        
        {/* Peak Highlight */}
        <motion.path 
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "circOut" }}
          d={dados.path}
          fill="url(#peakGradient)"
          className="drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        />

        <defs>
          <linearGradient id="peakGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.5)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0)" />
          </linearGradient>
        </defs>

        {/* Now Line */}
        <motion.line 
          initial={{ y2: 81, opacity: 0 }}
          animate={{ x1: dados.agoraX, x2: dados.agoraX, y2: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      </svg>
      <motion.div 
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="absolute top-2 right-4 text-right"
      >
        <p className="text-[8px] uppercase tracking-widest text-zinc-500">Pico Identificado</p>
        <p className="text-xs font-bold text-[#D4AF37]">{dados.picoTexto}</p>
      </motion.div>
    </div>
  );
};

// ════════════════════════════════════════
// TALEB GAUGE (Antifragilidade)
// ════════════════════════════════════════
export const TalebGauge: React.FC<{ dados: DadosTaleb }> = ({ dados }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-24 mb-4">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Zones */}
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
            d="M 10 45 A 40 40 0 0 1 40 10" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" opacity="0.2" 
          />
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            d="M 45 8 A 40 40 0 0 1 55 8" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" opacity="0.2" 
          />
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            d="M 60 10 A 40 40 0 0 1 90 45" fill="none" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" opacity="0.2" 
          />
          
          {/* Active Needle */}
          <motion.g
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: dados.angulo, opacity: 1 }}
            style={{ originX: '50px', originY: '45px' }}
            transition={{ type: 'spring', damping: 12, stiffness: 60, delay: 1.5 }}
          >
            <line x1="50" y1="45" x2="50" y2="10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="50" cy="45" r="3" fill="#fff" />
          </motion.g>
        </svg>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="text-center"
      >
        <h4 className={`text-sm font-bold uppercase tracking-widest mb-1 ${
          dados.status === 'Antifrágil' ? 'text-[#D4AF37]' : dados.status === 'Frágil' ? 'text-red-500' : 'text-zinc-400'
        }`}>
          {dados.status}
        </h4>
        <p className="text-[10px] text-zinc-500 max-w-[200px] leading-relaxed">
          {dados.convexidade}
        </p>
      </motion.div>
    </div>
  );
};
