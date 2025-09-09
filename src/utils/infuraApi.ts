import { ethers } from "ethers";
import { INFURA_API_URL, CONTRACT_ADDRESS, ABI } from "./constants";

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000,
): Promise<T> {
  try {
    return await fn();
  } catch (error: unknown) {
    if (
      (error as { code?: string })?.code === "SERVER_ERROR" &&
      maxRetries > 0
    ) {
      // Simple check for 429 or general server error code
      console.warn(`Retrying... attempts left: ${maxRetries}`);
      await new Promise((r) => setTimeout(r, delay));
      return withRetry(fn, maxRetries - 1, delay * 2);
    }
    throw error;
  }
}

// Types
export interface ContractGlobalData {
  totalDeposits: number;
  refRewards: number;
  contractBalance: number;
}

export interface UserSpecificData {
  userInfo: {
    forWithdraw: number;
    totalInvested: number;
    totalWithdrawn: number;
    totalMatchBonus: number;
    structure: number[];
  };

  userDownlineCountArray: number[];
}

export interface ContractData extends ContractGlobalData {
  userData: UserSpecificData | null;
}

export interface PlayerInfo {
  upline: string;
  dividends: bigint;
  match_bonus: bigint;
  last_payout: number;
  total_invested: bigint;
  total_withdrawn: bigint;
  total_match_bonus: bigint;
}

// Function to fetch global contract data
export const fetchGlobalContractData =
  async (): Promise<ContractGlobalData> => {
    return withRetry(async () => {
      const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const [totalDeposits, refRewards, contractBalance] = await Promise.all([
        contract.invested(),
        contract.match_bonus(),
        contract.getContractBalance(),
      ]);
      return {
        totalDeposits: Number(ethers.formatEther(totalDeposits)),
        refRewards: Number(ethers.formatEther(refRewards)),
        contractBalance: Number(ethers.formatEther(contractBalance)),
      };
    });
  };

// Function to fetch user-specific data
export const fetchUserData = async (
  address: string,
): Promise<UserSpecificData> => {
  return withRetry(async () => {
    const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    const [userInfoResult] = await Promise.all([
      contract.userInfo(address),
      contract.players(address),
      contract.payoutOf(address),
    ]);

    return {
      userInfo: {
        forWithdraw: Number(ethers.formatEther(userInfoResult[0])),
        totalInvested: Number(ethers.formatEther(userInfoResult[1])),
        totalWithdrawn: Number(ethers.formatEther(userInfoResult[2])),
        totalMatchBonus: Number(ethers.formatEther(userInfoResult[3])),

        structure: userInfoResult[4].map((count: bigint) => Number(count)),
      },

      userDownlineCountArray: userInfoResult[4].map((count: bigint) =>
        Number(count),
      ),
    };
  });
};
