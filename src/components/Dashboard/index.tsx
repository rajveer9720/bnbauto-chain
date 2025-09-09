import { useState, useEffect } from "react";
import { Container, Card, Button} from "react-bootstrap";
import { useContractData } from "../context/DataContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import { showSuccessAlert, showFailedAlert } from "../../utils/SweetAlertUtils";
import StatCard from "../StatCard";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import abi from "../../utils/abi.json";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { getWalletChainId, getWalletSymbol } from "../../utils/ProviderUtils";


const Dashboard = () => {
  const { userData, refetch, contractData } = useContractData();
  const {isConnected } = useAccount();
  const symbol = getWalletSymbol();
  const { openConnectModal } = useConnectModal();
  const {
    data: hash,
    writeContract,
    error: withdrawError,
  } = useWriteContract();
  const { isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [toastShown, setToastShown] = useState(false);
  const TransactionURL = import.meta.env.VITE_APP_SUCCESS_MESSAGE_URL || "/";
  const contractAddress = import.meta.env.VITE_APP_INFURA_CONTRACT_ADDRESS;

  const EXPECTED_CHAIN_ID = getWalletChainId().toString();

  const chainId = useChainId();

  const getCurrentChainId = async (): Promise<number> => {
    if (window.ethereum) {
      try {
        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        return parseInt(currentChainId, 16);
      } catch (error) {
        console.error("Error fetching chain ID:", error);
        return chainId;
      }
    }
    return chainId;
  };

  const stats = {
    withdrawable: userData?.userInfo.forWithdraw || 0,
    totalInvested: userData?.userInfo.totalInvested || 0,
    totalWithdrawal: userData?.userInfo.totalWithdrawn || 0,
    totalReferralReward: userData?.userInfo.totalMatchBonus || 0,
    levels: userData?.userInfo?.structure || [],
  };
  const successLink = `${TransactionURL}${hash}`;

  useEffect(() => {
    if (isTransactionSuccess && hash && !toastShown) {
      refetch();
      showSuccessAlert(
        `Your withdrawal has been processed successfully. 
    <br>To view the transaction <a href=${successLink} target="_blank">click here</a>.`,
      );

      setToastShown(true);
    }
  }, [isTransactionSuccess, hash, refetch, toastShown, successLink]);

  useEffect(() => {
    if (!isTransactionSuccess) {
      setToastShown(false);
    }
  }, [isTransactionSuccess]);

  useEffect(() => {
    if (withdrawError) {
      showFailedAlert("Something went wrong. Please try again.");
    }
  }, [withdrawError]);

  const handleWithdraw = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
    const currentChainId = await getCurrentChainId();

    if (currentChainId !== parseInt(EXPECTED_CHAIN_ID)) {
      showFailedAlert("Wrong network active.");
      return;
    }

    if (stats.withdrawable === 0) {
      showFailedAlert("No funds available to withdraw!");
      return;
    }
    if (contractData.contractBalance === 0) {
      showFailedAlert("The contract has no funds available for withdrawal!");
      return;
    }

    if (contractData.contractBalance < stats.withdrawable) {
      if (
        !window.confirm(
          "Your withdrawable balance is more than the contract balance. Partial withdrawal may occur. Do you want to continue?",
        )
      ) {
        return;
      }
    }
    try {
      await writeContract({
        address: contractAddress,
        abi,
        functionName: "withdraw",
        args: [],
      });
    } catch (error) {
      console.error("Transaction failed:", error);

      let errorMsg = "Transaction failed!";
      const typedError = error as { reason?: string; message?: string };
      if (typedError.reason) {
        errorMsg += ` Reason: ${typedError.reason}`;
      } else if (typedError.message) {
        errorMsg += ` ${typedError.message}`;
      }

      showFailedAlert(errorMsg);
    } finally {
      refetch();
    }
  };


  return (
    <div className="dark-bg-cal">
      <Container className="col-lg-12 ">
        <div >
          <Card.Body>
            <h2 className="text-center mb-4 py-5 text-white">
              User Data Overview
            </h2>
            <div className="row g-3">
              <div className="col-12 col-sm-6 col-lg-3">
                <StatCard
                  icon={<i className="bi bi-wallet2"></i>}
                  title="Total Withdrawable Balance"
                  value={`${stats.withdrawable.toFixed(6)} ${symbol}`}
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <StatCard
                  icon={<i className="bi bi-cash-coin"></i>}
                  title="Total Invested"
                  value={`${stats.totalInvested.toFixed(6)} ${symbol}`}
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <StatCard
                  icon={<i className="bi bi-currency-exchange"></i>}
                  title="Total Withdrawn"
                  value={`${stats.totalWithdrawal.toFixed(6)} ${symbol}`}
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <StatCard
                  icon={<i className="bi bi-people-fill"></i>}
                  title="Total Referral Reward"
                  value={`${stats.totalReferralReward.toFixed(6)} ${symbol}`}
                />
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center gap-3 py-5">
              <Button
                style={{            
                  width: "250px",
                  border: "none",
                }}
                className="custom-btn"
                onClick={handleWithdraw}
              >
                Withdraw
              </Button>
            </div>

          </Card.Body>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
