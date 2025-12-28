
export interface DexPair {
  priceUsd: string;
  fdv: number;
  marketCap: number;
  volume: {
    h24: number;
  };
  liquidity: {
    usd: number;
  };
  priceChange: {
    h24: number;
  };
}

export interface Transaction {
  id: string;
  wallet: string;
  type: 'Join' | 'Buyback' | 'Swap' | 'Liquidity' | 'Reward';
  amount: string;
  timestamp: number;
}
