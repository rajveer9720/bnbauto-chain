import { useState } from "react";
import { Toast, ToastContainer, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContractData } from "../context/DataContext";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import "./referral.css";

const Referral = () => {
  const { userData } = useContractData();
  const devaddress = import.meta.env.VITE_APP_DEV_ADDRESS || "";
  const { address } = useAccount();
  const [showToast, setShowToast] = useState(false);
  const refSwitch = import.meta.env.VITE_APP_REF_SWITCH_BUTTON || "false";
  const MIN_DEPOSIT = 0.02;

  const isEligibleReferrer = () => {
    if (!address) return false;
    if (address === devaddress) {
      return true;
    }
    return userData?.userInfo?.totalInvested && userData.userInfo.totalInvested >= MIN_DEPOSIT;
  };

  const referralLink = isEligibleReferrer()
    ? `${window.location.origin}?ref=${address}`
    : "";

  const handleCopyClick = async () => {
    if (refSwitch !== "true") {
      toast.error("Referral feature is disabled");
      return;
    }
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    if (!isEligibleReferrer()) {
      toast.error("You will get your referral link after investing.");
      return;
    }
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied to clipboard!");
    } catch {
      toast.error("Failed to copy referral link. Please copy it manually.");
    }
  };

  const getReferralText = () => {
    if (refSwitch !== "true") return "Referral feature is disabled";
    if (!address) return "Please connect your wallet";
    if (!isEligibleReferrer()) {
      return "You will get your referral link after investing.";
    }
    return referralLink || "You will get your referral link after investing.";
  };

  return (
    <div className="fugu-trading-section2 ">
      <div className="container">
        <div className="row">

          <div className="col-lg-6 order-lg-2">
            <div className="fugu-trading-card fugu-trading-card2 py-5">
              <div className="fugu-trading-card-thumb">
                <img
                  className="wow fadeInUpX responsive-img "
                  data-wow-delay="0s"
                  src="/images/all-img/v2/card3.png"
                  alt=""
                />

                <div className="fugu-trading-card-thumb2">
                  <img
                    className="wow fadeInUpX"
                    data-wow-delay=".20s"
                    src="/images/all-img/v2/card4.png"
                    alt=""
                  />
                </div>
                <div className="fugu-shape7">
                  <img src="/images/shape/shape6.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-10 d-flex align-items-center">
            <div className="w-100 p-4 text-white rounded-4 m-2 ">
              <h2 className="fw-bold text-center mb-3">Referral Link</h2>
              <div className="bg-dark p-4 rounded-4">
                <p className="small text-break text-center mb-3">
                  {getReferralText()}
                </p>
                <div className="d-flex justify-content-center mb-4">
                  <Button
                    id="copyButton"
                    className="custom-btn px-4 py-2"
                    onClick={handleCopyClick}

                  >
                    Copy
                  </Button>
                </div>
              </div>

              {/* Toast Notification */}
              <ToastContainer className="p-3 position-fixed bottom-0 end-0">
                <Toast
                  show={showToast}
                  onClose={() => setShowToast(false)}
                  delay={3000}
                  autohide
                  style={{ width: "250px", height: "40px" }}
                >
                  <Toast.Body style={{ display: "flex" }}></Toast.Body>
                </Toast>
              </ToastContainer>
            </div>
          </div>

        </div>
      </div>
    </div>




  );
};

export default Referral;
