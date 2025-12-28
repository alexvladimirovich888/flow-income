
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DexPair } from '../types';

const MetricNode: React.FC<{ title: string; value: string; index: number }> = ({ title, value, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.15, duration: 1 }}
    className="relative pl-10 py-4 group"
  >
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-white/10 group-hover:h-12 group-hover:bg-cyan-500 transition-all duration-700"></div>
    <span className="text-[7px] font-bold tracking-[0.6em] text-white/20 uppercase block mb-2">{title}</span>
    <div className="text-3xl font-montserrat font-normal tracking-[-0.05em] group-hover:tracking-wider transition-all duration-700">
      {value}
    </div>
  </motion.div>
);

interface MetricsBoardProps {
  onDataUpdate?: (data: DexPair) => void;
}

const MetricsBoard: React.FC<MetricsBoardProps> = ({ onDataUpdate }) => {
  const [data, setData] = useState<DexPair | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.dexscreener.com/latest/dex/tokens/Yq7qgvyifq9JsPZCMSLZagrvUorAGhB2uvKKv36pump');
        const json = await res.json();
        if (json.pairs?.[0]) {
          setData(json.pairs[0]);
          onDataUpdate?.(json.pairs[0]);
        }
      } catch (e) {}
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (val?: number) => val ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(val) : '---';

  return (
    <div className="flex flex-col gap-10">
      <MetricNode title="Protocol Valuation" value={formatCurrency(data?.marketCap)} index={0} />
      <MetricNode title="Index Price" value={`$${parseFloat(data?.priceUsd || '0').toFixed(6)}`} index={1} />
      <MetricNode title="Kinetic Volume" value={formatCurrency(data?.volume?.h24)} index={2} />
      <MetricNode title="Asset Reserves" value={formatCurrency(data?.liquidity?.usd)} index={3} />
    </div>
  );
};

export default MetricsBoard;
