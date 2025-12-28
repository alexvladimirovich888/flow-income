
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

interface YieldCalculatorProps {
  dailyVolume: number;
}

// Custom hook for ticking numbers
const useAnimatedNumber = (value: number) => {
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const display = useTransform(spring, (current) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(current)
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return display;
};

const YieldCalculator: React.FC<YieldCalculatorProps> = ({ dailyVolume }) => {
  const [tokens, setTokens] = useState<string>('1000000');
  const [rewards, setRewards] = useState({ daily: 0, monthly: 0 });

  useEffect(() => {
    const inputTokens = parseFloat(tokens) || 0;
    const volume = dailyVolume || 50000;
    
    // Formula: (Volume * 5% Share) * (Token Ratio) * 2.5x Growth Multiplier
    const dailyEst = (volume * 0.05) * (inputTokens / 1000000000) * 2.5;
    
    setRewards({ 
      daily: dailyEst, 
      monthly: dailyEst * 30 
    });
  }, [tokens, dailyVolume]);

  const animatedDaily = useAnimatedNumber(rewards.daily);
  const animatedMonthly = useAnimatedNumber(rewards.monthly);

  return (
    <div className="relative group p-[1px] bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]">
      <div className="designer-glass p-12 flex flex-col items-start gap-12 rounded-[3rem]">
        <div className="w-full flex justify-between items-start">
           <div>
             <div className="flex items-center gap-3 mb-4">
                <span className="text-[9px] font-bold tracking-[0.5em] text-white/20 uppercase block">Calculator_V2.5</span>
                <span className="bg-cyan-500/10 text-cyan-400 text-[8px] font-black px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest">
                  2.5x Growth Multiplier Active
                </span>
             </div>
             <h3 className="text-4xl font-montserrat font-black tracking-tighter uppercase leading-none">
               Estimated<br/>
               <span className="text-white/40 italic font-light">Protocol Yield</span>
             </h3>
           </div>
           <div className="w-14 h-14 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-cyan-400 shadow-inner">
             <div className="w-2 h-2 bg-current animate-ping rounded-full"></div>
           </div>
        </div>

        <div className="w-full relative">
          <input
            type="number"
            value={tokens}
            onChange={(e) => setTokens(e.target.value)}
            onFocus={(e) => e.target.select()}
            className="w-full bg-transparent border-none py-6 text-[8vw] lg:text-[100px] font-montserrat font-thin text-white/5 focus:text-white/95 transition-all focus:outline-none tracking-tighter"
            placeholder="1,000,000"
          />
          <div className="absolute left-0 bottom-0 flex items-center gap-4">
             <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">Your $FLOW Allocation</span>
             <div className="h-[1px] w-20 bg-white/10"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full mt-8">
          <div className="p-8 bg-white/[0.02] rounded-[2rem] border border-white/5 hover:border-cyan-500/30 transition-all group/stat">
             <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] block mb-4">24H Estimated Gain</span>
             <motion.span className="text-4xl font-light text-cyan-400 block tabular-nums">
               {animatedDaily}
             </motion.span>
             <p className="text-[8px] text-white/10 uppercase tracking-widest mt-4 font-bold">Includes automated buyback weight</p>
          </div>
          <div className="p-8 bg-white/[0.02] rounded-[2rem] border border-white/5 hover:border-purple-500/30 transition-all group/stat">
             <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] block mb-4">30-Day Growth Forecast</span>
             <motion.span className="text-4xl font-light text-purple-400 block tabular-nums">
               {animatedMonthly}
             </motion.span>
             <p className="text-[8px] text-white/10 uppercase tracking-widest mt-4 font-bold">Recursive compounding simulation</p>
          </div>
        </div>
        
        <div className="w-full flex justify-center pt-4">
           <p className="text-[9px] text-center text-white/20 font-medium max-w-sm leading-relaxed uppercase tracking-widest">
             *Calculations are based on current volume and assume 2.5x asset appreciation from protocol-enforced deflationary cycles.
           </p>
        </div>
      </div>
      
      {/* Absolute Decorative elements */}
      <div className="absolute -bottom-4 -right-4 text-[120px] font-black text-white/[0.02] uppercase italic pointer-events-none select-none">GROWTH</div>
    </div>
  );
};

export default YieldCalculator;
