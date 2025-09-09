import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer: React.FC = () => {
  const logo = "/images/logo.png";

  return (
    <footer className="fugu-foote2-section">
      <div className="container">
        <div className="fugu-footer-top">
          <div className="fugu-default-content">
            <h2 className="wow fadeInUpX" data-wow-delay="0s">
              Secure. Scalable. Strong. That’s BNB.
            </h2>
            <p className="wow fadeInUpX" data-wow-delay="0.15s">
              Invest in BNB today, own a piece of tomorrow’s blockchain.
            </p>
            <div className="fugu-app-btn-wrap wow fadeInUpX" data-wow-delay="0.25s">

                <img src="/images/all-img/Metamask2.png" className="metamask"  alt="MetaMask" />

                <img src="/images/all-img/TrustWallet2.png" className="trust-wallet"  alt="Trust" />

            </div>
          </div>
        </div>

        <div className="fugu-footer-middle">
          <div className="row text-center">
            <div className="col-md-12 mb-lg-0">
              <div className="fugu-footer-logo">
                <a href="#"><img className="brand-logo-img" src={logo} alt="Logo" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="fugu-footer-bottom mt-4 pt-4 ">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">&copy; {new Date().getFullYear()} All Rights Reserved by BNBAutoChain</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="fugu-footer-menu">
                <ul className="gap-3">
                  <li><a href="#">Terms</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
