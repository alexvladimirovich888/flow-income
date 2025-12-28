
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, BarChart2, Shield } from 'lucide-react';

interface InfoSectionsProps {
  blockType: 'hero' | 'benefits' | 'roadmap';
}

const InfoSections: React.FC<InfoSectionsProps> = ({ blockType }) => {
  if (blockType === 'hero') {
    return (
      <div className="relative select-none">
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-[10px] font-bold tracking-[1.2em] text-cyan-400 block mb-10 uppercase"
        >
          // Autonomic Protocol Access
        </motion.span>
        <h1 className="text-[12vw] lg:text-[10vw] font-montserrat font-black leading-[0.8] uppercase tracking-[-0.08em] mix-blend-difference">
          Flow<br/>
          <span className="text-white/10 italic">Income</span><br/>
          Engine
        </h1>
        <div className="mt-16 flex items-start gap-12 max-w-xl">
          <div className="w-12 h-[1px] bg-white/20 mt-3"></div>
          <p className="text-white/40 text-sm md:text-base font-light leading-relaxed tracking-wide italic">
            We have reimagined liquidity as a living ecosystem. The Kinetic Engine protocol automatically absorbs market fluctuations, creating stable yields through deflationary cycles.
          </p>
        </div>
      </div>
    );
  }

  if (blockType === 'benefits') {
    return (
      <div className="space-y-40">
        <div className="flex flex-col md:flex-row gap-20 items-start">
          <div className="text-[150px] font-black text-white/[0.02] leading-none select-none">01</div>
          <div className="md:mt-20 max-w-md">
            <Shield className="w-8 h-8 text-cyan-500 mb-8" />
            <h3 className="text-3xl font-montserrat font-bold uppercase tracking-tight mb-6">Immune LP Layer</h3>
            <p className="text-white/30 font-light leading-loose">
              Unlike standard tokens, our liquidity is protected by the "Kinetic Shield" layer. Every sell strengthens the pool's foundation instead of weakening it.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse gap-20 items-start">
          <div className="text-[150px] font-black text-white/[0.02] leading-none select-none">02</div>
          <div className="md:mt-20 max-w-md">
            <BarChart2 className="w-8 h-8 text-purple-500 mb-8" />
            <h3 className="text-3xl font-montserrat font-bold uppercase tracking-tight mb-6">Recursive Volume</h3>
            <p className="text-white/30 font-light leading-loose">
              Trading volume turns into fuel. The protocol buybacks its own assets and locks them in "Reserve Bank" smart contracts.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-40 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/5 blur-[150px]"></div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <Rocket className="w-12 h-12 text-yellow-500 mb-12 animate-pulse" />
        <h2 className="text-6xl lg:text-8xl font-montserrat font-black uppercase tracking-tighter mb-10">Ascension</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5">
           {[
             {p: "01", t: "Genesis", d: "Launch of Kinetic Core and formation of the primary reserve."},
             {p: "02", t: "Expansion", d: "Integration with DeFi aggregators and cross-chain bridges."},
             {p: "03", t: "Dominance", d: "Full decentralization of governance through DAO."}
           ].map(i => (
             <div key={i.p} className="p-16 bg-[#030307] hover:bg-white/[0.02] transition-colors group text-left">
                <span className="text-[10px] font-bold text-white/20 group-hover:text-cyan-400 transition-colors tracking-[0.5em] block mb-10 uppercase">Stage {i.p}</span>
                <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">{i.t}</h4>
                <p className="text-white/30 text-xs font-light leading-relaxed">{i.d}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSections;
