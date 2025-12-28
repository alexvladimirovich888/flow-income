
import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-[#020205]">
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-purple-900/30 blur-[150px] rounded-full"
      />
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-cyan-900/20 blur-[150px] rounded-full"
      />
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[15%] w-[600px] h-[600px] bg-indigo-900/20 blur-[150px] rounded-full"
      />
      
      {/* HUD Grid Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }}></div>
    </div>
  );
};

export default Background;
