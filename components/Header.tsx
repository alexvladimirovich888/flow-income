
import React from 'react';
import { motion } from 'framer-motion';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl"
    >
      <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-full h-16 px-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-lg font-black text-lg">F</div>
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
          <span className="text-xs font-montserrat font-black uppercase tracking-[0.4em] hidden sm:block">flow.income</span>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
          <a href="#" className="hover:text-white transition-all hover:tracking-[0.5em]">Terminal</a>
          <a href="#" className="hover:text-white transition-all hover:tracking-[0.5em]">Network</a>
          <a href="#" className="hover:text-white transition-all hover:tracking-[0.5em]">Governance</a>
        </nav>

        <div className="flex items-center gap-4">
          <WalletMultiButton />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
