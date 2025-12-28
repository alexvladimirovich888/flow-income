
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

interface YieldCalculatorProps {
  dailyVolume: number;
}

const FLOW_MINT = "Yq7qgvyifq9JsPZCMSLZagrvUorAGhB2uvKKv36pump";

const YieldCalculator: React.FC<YieldCalculatorProps> = ({ dailyVolume }) => {
  const [tokens, setTokens] = useState<string>('1000000');
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [rewards, setRewards] = useState({ daily: 0, monthly: 0 });

  useEffect(() => {
    const numTokens = parseFloat(tokens) || 0;
    const daily = (dailyVolume * 0.01) * (numTokens / 1000000000);
    setRewards({ daily: daily, monthly: daily * 30 });
  }, [tokens, dailyVolume]);

  return (
    <div className="relative group p-1px bg-gradient-to-br from-white/10 to-transparent">
      <div className="designer-glass p-20 flex flex-col items-start gap-16">
        <div className="w-full flex justify-between items-start">
           <div>
             <span className="text-[9px] font-bold tracking-[0.5em] text-white/20 uppercase block mb-4">Calculator_V1</span>
             <h3 className="text-4xl font-montserrat font-bold tracking-tighter uppercase">Predictive Yield</h3>
           </div>
           <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-cyan-400">
             <div className="w-1 h-1 bg-current animate-ping"></div>
           </div>
        </div>

        <div className="w-full">
          <input
            type="number"
            value={tokens}
            onChange={(e) => setTokens(e.target.value)}
            className="w-full bg-transparent border-none py-4 text-[100px] font-montserrat font-thin text-white/10 focus:text-white/90 transition-all focus:outline-none tracking-tighter"
            placeholder="0.00"
          />
          <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/20">Input token allocation quantity</span>
        </div>

        <div className="flex gap-24 border-t border-white/5 pt-16 w-full">
          <div>
             <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] block mb-4">24H Projection</span>
             <span className="text-4xl font-light text-cyan-400">${rewards.daily.toFixed(2)}</span>
          </div>
          <div>
             <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] block mb-4">Cycle Projection</span>
             <span className="text-4xl font-light text-purple-400">${rewards.monthly.toFixed(0)}</span>
          </div>
        </div>
      </div>
      
      {/* Absolute Decorative elements */}
      <div className="absolute bottom-10 right-10 text-[80px] font-black text-white/[0.01] uppercase italic pointer-events-none">CALC</div>
    </div>
  );
};

export default YieldCalculator;
