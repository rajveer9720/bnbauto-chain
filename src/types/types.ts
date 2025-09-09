// Types
interface InvestmentStats {
  totalInvested: number;
  totalWithdrawal: number;
  withdrawable: number;
  totalReferralReward: number;
}

interface ReferralLevel {
  level: number;
  referralparcentage: string;
  downlinecount: string;
  color?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
}
type ProfitCalculatorProps = {
  minDeposit: number;
  maxDeposit: number;
  dailyROI: number;
};

export type {
  InvestmentStats,
  ReferralLevel,
  StatCardProps,
  ProfitCalculatorProps,
};
