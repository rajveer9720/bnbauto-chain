
import React from "react";
import { getWalletSymbol } from "../../utils/ProviderUtils";
import { useContractData } from "../context/DataContext";

const ContractData: React.FC = () => {
  const symbol = getWalletSymbol();
  const { contractData } = useContractData();
  const formatValue = (value: number | string) => {
    return parseFloat(value.toString()).toFixed(4);
  };

  const cards = [
    {
      id: 1,
      title: "Contract Balance",
      value: formatValue(contractData?.contractBalance ?? 0),
      unit: symbol,
      iconClass: "bi bi-wallet2",
    },
    {
      id: 2,
      title: "Total Deposited",
      value: formatValue(contractData?.totalDeposits ?? 0),
      unit: symbol,
      iconClass: "bi bi-arrow-down-left-circle",
    },
    {
      id: 3,
      title: `Ref Rewards` + (symbol ? ` (${symbol})` : ""),
      value: formatValue(contractData?.refRewards ?? 0),
      unit: symbol,
      iconClass: "bi bi-gift",
    },
  ];

  return (
    <>
      <div className="fugu--content-section section bg-warning-200 ">
        <div className="container">
          <div className="row align-items-center">
            <div className=" fugu-section-padding3">
              <div className="container">
                <div className="fugu-section-title ">
                  <h2>Contract Data Overview</h2>
                </div>
                <div className="row">
                  {cards.map((feature, index) => (
                    <div
                      className="col-lg-4 col-md-6 "
                      key={index}
                    >
                      <div
                        className="fugu-iconbox-wrap2 wow rounded-4 shadow-sm fadeInUpX"
                        data-wow-delay={feature.iconClass}
                      >
                        <div className="fugu-iconbox-icon2" style={{ fontSize: "2.5rem" }}>
                          <i className={feature.iconClass} aria-label={feature.title} />
                        </div>
                        <div className="fugu-iconbox-data2">
                          <h4>{feature.title}</h4>
                          <p style={{ fontSize: "1.3rem",  }}>{feature.value} <span>{feature.unit}</span></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractData;
