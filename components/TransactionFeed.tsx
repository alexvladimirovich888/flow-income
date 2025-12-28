
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Transaction } from '../types';

const TransactionFeed: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const initialTxs: Transaction[] = [
      { id: '1', wallet: '6hJk...2s', type: 'Join', amount: '0', timestamp: Date.now() - 5000 },
      { id: '2', wallet: 'f9Xl...w1', type: 'Buyback', amount: '0.5', timestamp: Date.now() - 35000 },
      { id: '3', wallet: '3pKr...9q', type: 'Liquidity', amount: '4.5', timestamp: Date.now() - 120000 },
    ];
    setTransactions(initialTxs);

    const interval = setInterval(() => {
      const types: Transaction['type'][] = ['Join', 'Buyback', 'Swap', 'Liquidity', 'Reward'];
      const newTx: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        wallet: `${Math.random().toString(36).substr(2, 4)}...${Math.random().toString(36).substr(2, 2)}`,
        type: types[Math.floor(Math.random() * types.length)],
        amount: (Math.random() * 2).toFixed(2),
        timestamp: Date.now()
      };
      setTransactions(prev => [newTx, ...prev.slice(0, 5)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fluid-glass p-10 h-full flex flex-col rounded-[4rem]">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl font-montserrat font-black uppercase tracking-tighter">System Logs</h2>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/10 rounded-full border border-green-500/20 text-[8px] font-black text-green-400 uppercase tracking-[0.4em]">
           Network_Live
        </div>
      </div>
      
      <div className="space-y-4 flex-1">
        <AnimatePresence initial={false}>
          {transactions.map(tx => (
            <motion.div 
              key={tx.id} 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-all group cursor-default"
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-cyan-400 transition-colors">
                  <Zap className="w-5 h-5 text-white/40 group-hover:text-black transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">{tx.type} Execution</span>
                  <span className="text-[9px] text-white/20 font-mono tracking-tighter mt-1">{tx.wallet}</span>
                </div>
              </div>
              <span className="text-[10px] font-black text-white/30 font-mono">0.00{Math.floor(Math.random() * 9)}s</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TransactionFeed;
