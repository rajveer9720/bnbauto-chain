import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

import {
  useAccount,
  useBalance,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { showSuccessAlert, showFailedAlert } from "../../utils/SweetAlertUtils";
import { parseEther } from "viem";
import abi from "../../utils/abi.json";
import { useContractData } from "../context/DataContext";
import { getWalletChainId, getWalletSymbol } from "../../utils/ProviderUtils";

import "./style.css";

const RANGE_START = Number(import.meta.env.VITE_APP_RANGE_START) || 70;
const RANGE_END = Number(import.meta.env.VITE_APP_RANGE_END) || 100;
const DEFAULT_DEPOSIT_PERIOD =
  Number(import.meta.env.VITE_APP_DEFAULT_DEPOSIT_PERIOD) || 85;
const BASE_TOTAL_PROFIT =
  Number(import.meta.env.VITE_APP_BASE_TOTAL_PROFIT) || 140;
const DAILY_PROFIT_INCREASE =
  Number(import.meta.env.VITE_APP_DAILY_PROFIT_INCREASE) || 3;
const minDeposit = Number(import.meta.env.VITE_APP_MIN_DEPOSIT) || 0.02;
const maxDeposit = Number(import.meta.env.VITE_APP_MAX_DEPOSIT) || 300;


const ProfitCalculator = () => {
  const { address, isConnected } = useAccount();
  const symbol = getWalletSymbol();
  const { refetch } = useContractData();
  const { data: balance } = useBalance({ address });
  const { openConnectModal } = useConnectModal();

  const EXPECTED_CHAIN_ID = getWalletChainId().toString();

  const TransactionURL = import.meta.env.VITE_APP_SUCCESS_MESSAGE_URL || "/";

  const [depositPeriod, setDepositPeriod] = useState<number>(
    DEFAULT_DEPOSIT_PERIOD,
  );
  const contractAddress = import.meta.env.VITE_APP_INFURA_CONTRACT_ADDRESS;
  const [amount, setAmount] = useState<string>("");

  const { writeContract, data: hash, error: investError } = useWriteContract();

  useEffect(() => {
    if (investError) {
      showFailedAlert("Something went wrong. Please try again.");
      return;
    }
  }, [investError]);

  const { isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [toastShown, setToastShown] = useState(false);
  const successLink = `${TransactionURL}${hash}`;
  useEffect(() => {
    if (isTransactionSuccess && hash && !toastShown) {
      refetch();

      showSuccessAlert(`Your investment has been processed successfully. 
<br>To view the transaction <a href=${successLink} target="_blank">click here</a>.`);
      setToastShown(true);
    }
  }, [isTransactionSuccess, hash, refetch, toastShown, successLink]);

  useEffect(() => {
    if (!isTransactionSuccess) {
      setToastShown(false);
    }
  }, [isTransactionSuccess]);

  const getReferrer = (): string => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    return ref && ref.length === 42 && ref.startsWith("0x")
      ? ref
      : import.meta.env.VITE_APP_DEV_ADDRESS;
  };
  const walletBalance = balance ? parseFloat(balance.formatted) : 0;
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

  const handleInvestment = async () => {
    try {
      if (!isConnected) {
        openConnectModal?.();
        return;
      }

      const currentChainId = await getCurrentChainId();

      if (currentChainId !== parseInt(EXPECTED_CHAIN_ID)) {
        showFailedAlert("Wrong network active.");
        return;
      }
      if (!amount) {
        showFailedAlert("Please enter an amount");

        return;
      }

      const depositAmountData = parseFloat(amount);

      if (depositAmountData < minDeposit || depositAmountData > maxDeposit) {
        showFailedAlert(
          `Investment must be between ${minDeposit} and ${maxDeposit} ${symbol}`,
        );

        return;
      }

      if (parseFloat(amount) > walletBalance) {
        showFailedAlert("Insufficient balance");
        return;
      }

      await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: "deposit",
        args: [depositPeriod, getReferrer()],
        value: parseEther(amount.toString()),
      });
    } catch {
      showFailedAlert("Investment failed. Please try again.");
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <div className="dark-bg-cal text-white py-5">
      <Container id="deposit" className="mb-5 col-lg-8 rounded-3 ">
        <h2 className="text-center fw-bold mb-4 text-white">
          Calculate & Invest
        </h2>
        <Card
          bg="light"
          className="p-4 shadow-sm"

        >
          <Card.Body>
            <Form>
              {/* Deposit Period Selector */}
              <Form.Group className="mb-3">
                <Form.Label>Deposit Period (days): {depositPeriod}</Form.Label>
                <Form.Range
                  min={RANGE_START}
                  max={RANGE_END}
                  value={depositPeriod}
                  onChange={(e) => setDepositPeriod(Number(e.target.value))}
                  className="custom-range"
                />
              </Form.Group>

              {/* Deposit Amount Input */}
              <Form.Group className="mb-3">
                <Form.Label>Deposit Amount ({symbol}):</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  min={minDeposit}
                  max={maxDeposit}
                />
              </Form.Group>

              {/* Calculation Display */}
              <div className="text-muted text-center mb-4 d-flex flex-md-row flex-column justify-content-between">
                <p>
                  Daily ROI:{" "}
                  <strong>
                    {(
                      (BASE_TOTAL_PROFIT +
                        (depositPeriod - RANGE_START) * DAILY_PROFIT_INCREASE) /
                      depositPeriod
                    ).toFixed(2)}
                    %
                  </strong>
                </p>
                <p>
                  Total Profit:{" "}
                  <strong>
                    {BASE_TOTAL_PROFIT +
                      (depositPeriod - RANGE_START) * DAILY_PROFIT_INCREASE}
                    %
                  </strong>
                </p>
                <p>
                  In {depositPeriod} days you will earn:{" "}
                  <strong>
                    {(
                      parseFloat(amount || "0") *
                      ((BASE_TOTAL_PROFIT +
                        (depositPeriod - RANGE_START) * DAILY_PROFIT_INCREASE) /
                        100) || 0
                    ).toFixed(4)}{" "}
                    {symbol}
                  </strong>
                </p>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <Button
                  style={{
                    border: "none",
                  }}
                  className="w-20 w-md-50 fw-bold  custom-btn"
                  onClick={handleInvestment}
                >
                  Invest
                </Button>
              </div>
            </Form>
            <div className="alert alert-custom text-center mt-4 rounded-4">
                  <div className="d-flex align-items-center justify-content-center">

                    <span className="fw-semibold">
                      Limits: Minimum {minDeposit} BNB ~ Maximum {maxDeposit} BNB
                    </span>
                  </div>
                </div>
          </Card.Body>
        </Card>
         <div className="glass-card-dark rounded-4 mt-4">
              <div className="card-body text-center p-4">
                <p className="text-white mb-2 fs-5 fw-bold">
                  ✨ Withdrawal at any time you want!
                </p>
                <p className="text-white-50 small mb-0">
                  No lock-in periods • Instant processing • Secure transactions
                </p>
              </div>
            </div>
      </Container>
    </div>
  );
};

export default ProfitCalculator;
