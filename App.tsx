
import React, { useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from './components/Header';
import MetricsBoard from './components/MetricsBoard';
import MainEngine from './components/MainEngine';
import TransactionFeed from './components/TransactionFeed';
import YieldCalculator from './components/YieldCalculator';
import ReferralSection from './components/ReferralSection';
import InfoSections from './components/InfoSections';
import Background from './components/Background';
import { DexPair } from './types';

// Solana Imports
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

const AppContent: React.FC = () => {
  const [tokenData, setTokenData] = useState<DexPair | null>(null);
  const { publicKey, connected } = useWallet();
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <div className="relative min-h-screen text-white/90">
      <Background />
      <Header />
      
      <main className="relative z-10 pt-48 pb-64 px-8 max-w-[1800px] mx-auto">
        
        {/* HERO SECTION - Asymmetric */}
        <div className="relative mb-64 flex flex-col lg:flex-row items-end justify-between">
          <motion.div style={{ y: y1 }} className="lg:max-w-4xl">
            <InfoSections blockType="hero" />
          </motion.div>
          <motion.div 
            style={{ y: y2 }}
            className="mt-20 lg:mt-0 lg:mr-20"
          >
            <MetricsBoard onDataUpdate={setTokenData} />
          </motion.div>
        </div>

        {/* THE TERMINAL - Float Mode */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-80"
        >
          <MainEngine />
        </motion.div>

        {/* UTILITY LAYER - Overlapping */}
        <div className="relative flex flex-col xl:flex-row gap-32 mb-80 items-start">
           <motion.div className="flex-1 xl:mt-40">
              <YieldCalculator dailyVolume={tokenData?.volume?.h24 || 50000} />
           </motion.div>
           <motion.div className="w-full xl:w-[600px] xl:sticky xl:top-48">
              <ReferralSection isConnected={connected} walletAddress={publicKey?.toBase58() || ''} />
           </motion.div>
        </div>

        {/* DATA & LOGS - Deep Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-stretch mb-80">
          <div className="lg:col-span-7">
            <InfoSections blockType="benefits" />
          </div>
          <div className="lg:col-span-5">
            <TransactionFeed />
          </div>
        </div>

        {/* FINAL ACCENT */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <InfoSections blockType="roadmap" />
        </motion.div>

      </main>
      
      <footer className="relative z-10 py-20 px-8 border-t border-white/5 flex justify-between items-center text-[8px] font-bold uppercase tracking-[1em] text-white/10">
        <span>© 2024 Kinetic Infra</span>
        <div className="flex gap-10">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AppContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
