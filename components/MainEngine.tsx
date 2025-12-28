
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Command } from 'lucide-react';

const MainEngine: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  return (
    <div className="relative">
      {/* Abstract Background for Terminal */}
      <div className="absolute inset-0 bg-white/[0.01] skew-y-1 -z-10 blur-3xl"></div>
      
      <div className="flex flex-col gap-12">
        <div className="flex justify-between items-end border-b border-white/5 pb-10">
          <div className="flex items-center gap-6">
             <div className="w-10 h-10 border border-white/10 flex items-center justify-center rotate-45 group hover:rotate-90 transition-transform duration-700">
                <Command className="w-4 h-4 text-white/40 -rotate-45" />
             </div>
             <div>
               <h2 className="text-sm font-bold tracking-[0.4em] uppercase">Visual Node / Live_Stream</h2>
               <p className="text-[10px] text-white/20 mt-1 uppercase font-light">Data visualization of real-time flow</p>
             </div>
          </div>
          <div className="text-[9px] font-bold text-white/20 flex gap-10">
            <span>TX_STABILITY: 100%</span>
            <span>CORE_LATENCY: 0.04MS</span>
          </div>
        </div>

        <div className="relative aspect-video w-full designer-glass overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
          <iframe 
            src="https://dexscreener.com/solana/9VPd93DcA73aveEXs1jPJGk2QgZVAQMPVhwQRfWApump?embed=1&theme=dark&trades=0&info=0" 
            className="w-full h-full border-none opacity-80"
          ></iframe>
          
          {/* Overlays to hide DEX elements and add depth */}
          <div className="absolute inset-0 pointer-events-none border-[40px] border-[#030307]/80 blur-md"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#030307] via-transparent to-transparent opacity-60"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 justify-between">
           <div className="flex gap-20">
              <div className="group">
                 <span className="text-[8px] font-bold text-white/20 block mb-2 uppercase tracking-widest">Buyback Force</span>
                 <span className="text-xl font-light text-cyan-400 group-hover:tracking-widest transition-all duration-500">DYNAMIC_v2</span>
              </div>
              <div className="group">
                 <span className="text-[8px] font-bold text-white/20 block mb-2 uppercase tracking-widest">Protocol Fee</span>
                 <span className="text-xl font-light text-purple-400">0.00% NET</span>
              </div>
           </div>
           
           <motion.button 
             whileHover={{ letterSpacing: "0.5em", paddingLeft: "60px", paddingRight: "60px" }}
             whileTap={{ scale: 0.98 }}
             onClick={() => { setIsOptimizing(true); setTimeout(() => setIsOptimizing(false), 2000); }}
             className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 flex items-center gap-4"
           >
             <Zap className={`w-3 h-3 ${isOptimizing ? 'animate-spin' : ''}`} />
             {isOptimizing ? 'Recalibrating...' : 'Trigger Optimization'}
           </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MainEngine;
