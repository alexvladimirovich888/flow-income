
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Share2, Copy, Check, Users } from 'lucide-react';

interface ReferralSectionProps {
  isConnected: boolean;
  walletAddress: string;
}

const ReferralSection: React.FC<ReferralSectionProps> = ({ isConnected, walletAddress }) => {
  const [copied, setCopied] = React.useState(false);
  const refLink = `flowincome.io/ref?id=${walletAddress || 'NODE_ID'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={false}
      animate={{ 
        backgroundColor: isConnected ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
      }}
      className="fluid-glass rounded-[5rem] p-12 relative overflow-hidden h-full flex flex-col justify-between group border-purple-500/10"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
             <div className="bg-white/5 p-4 rounded-3xl border border-white/10 group-hover:border-purple-400 transition-colors">
               <Share2 className="text-purple-400 w-7 h-7" />
             </div>
             <div>
               <h2 className="text-2xl font-montserrat font-black uppercase tracking-tighter leading-none">Scale Network</h2>
               <span className="text-[8px] font-black text-white/20 tracking-[0.5em] uppercase mt-2 block">Recursive Growth</span>
             </div>
          </div>
        </div>

        <p className="text-white/40 text-[13px] font-medium leading-relaxed mb-12 max-w-sm">
          Protocol scalability is built on recursive participation. Authorize your node to generate a unique scaling link.
        </p>

        <AnimatePresence mode="wait">
          {isConnected ? (
            <motion.div 
              key="connected"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-5 font-mono text-xs text-purple-300 overflow-hidden text-ellipsis whitespace-nowrap">
                  {refLink}
                </div>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopy}
                  className="bg-white text-black h-14 w-14 rounded-full flex items-center justify-center shrink-0 hover:bg-purple-400 transition-colors shadow-xl"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              </div>
              <div className="flex items-center gap-4 px-2">
                 <Users className="w-4 h-4 text-purple-400" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Tier 01 Scaling: 5% Rewards</span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="locked"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center rounded-[3rem] bg-black/40 border border-white/5 backdrop-blur-3xl"
            >
               <motion.div 
                 animate={{ y: [0, -5, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
               >
                 <Lock className="w-6 h-6 text-white/40" />
               </motion.div>
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">Connect Wallet to Authorize Link</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Background Sphere */}
      <div className="absolute bottom-[-15%] right-[-5%] w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
    </motion.div>
  );
};

export default ReferralSection;
