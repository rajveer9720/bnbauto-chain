import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  fetchGlobalContractData,
  fetchUserData,
  ContractGlobalData,
  UserSpecificData,
} from "../../utils/infuraApi";

interface ContractDataContextType {
  contractData: ContractGlobalData;
  userData: UserSpecificData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const defaultContractData: ContractGlobalData = {
  totalDeposits: 0,
  refRewards: 0,
  contractBalance: 0,
};

const ContractDataContext = createContext<ContractDataContextType | undefined>(
  undefined,
);

export const ContractDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const [contractData, setContractData] =
    useState<ContractGlobalData>(defaultContractData);
  const [userData, setUserData] = useState<UserSpecificData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Always fetch global contract data
      const globalData = await fetchGlobalContractData();
      setContractData(globalData);
      if (address) {
        const userSpecificData = await fetchUserData(address);
        setUserData(userSpecificData);
      } else {
        setUserData(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch data"));
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data on mount and wallet changes
  useEffect(() => {
    fetchData();
  }, [address, isConnected]);

  const refetch = async () => {
    await fetchData();
  };

  return (
    <ContractDataContext.Provider
      value={{
        contractData,
        userData,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </ContractDataContext.Provider>
  );
};

export const useContractData = () => {
  const context = useContext(ContractDataContext);
  if (!context) {
    throw new Error(
      "useContractData must be used within a ContractDataProvider",
    );
  }
  return context;
};
