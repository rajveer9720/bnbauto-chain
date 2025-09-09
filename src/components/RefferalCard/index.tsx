
import React from "react";
import { ReferralLevel } from "../../types/types";


const ReferralCard: React.FC<ReferralLevel> = ({
  level,
  referralparcentage,
  downlinecount,
}) => (
  <>
    <div className="bg-light text-center p-4 h-100 d-flex flex-column justify-content-between shadow-sm rounded-4">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="badge">Level {level}</span>
          <span className="large">{referralparcentage}</span>
        </div>
      </div>
      <h4 className="fw-semibold mb-0">{downlinecount}</h4>
    </div>
  </>
);

export default ReferralCard;
