
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = () => {
  const smartContractLink = import.meta.env.VITE_APP_SMART_CONTRACT_LINK || ""
  const presentation = import.meta.env.VITE_APP_PRESENTATION_LINK || ""
  return (
    <>
      <div className="fugu-hero-section2 mt-4">
        <div className="container">
          <div className="fugu-hero-content fugu-hero-content2 mt-5">
            <h2 className="wow fadeInUpX" data-wow-delay="0s">
              Invest in BNB today, own a piece of tomorrow’s blockchain!
            </h2>
            <p className="lead mb-4">
              <b className="fw-bold">Basic Interest Rate :</b> <span className="fw-bold hero">Ranges from 2% to 2.3% every 24 hours</span>
            </p>
            <p className="lead mb-4">
              <b className="fw-bold">Investment Period :</b> <span className="fw-bold hero">Ranges from a minimum of 70 days to a maximum of 100 days</span>
            </p>
            <p className="lead mb-4">
              <b className="fw-bold">ROI Progression :</b> <span className="fw-bold hero">Earn an additional 3% ROI for each day after 70 days</span>
            </p>
            <p className="lead mb-4">
              <b className="fw-bold">Min & Max Profit  :</b> <span className="fw-bold hero">Minimum profit 140% and Maximum profit 230%</span>
            </p>

            <div className="fugu-hero-btn-wrap wow fadeInUpX" data-wow-delay="0.40s">
              <a href={smartContractLink} target="_blank" className="fugu-btn fugu-round-btn">Smart Contract</a>
              <a href={presentation} target="_blank" className="fugu-btn fugu-round-btn">Presentation</a>
            </div>
          </div>
        </div>

        <div className="fugu-shape4">
          <img src="/images/shape/shape3.png" alt="Decorative Shape 3" />
        </div>
        <div className="fugu-shape5">
          <img src="/images/shape/shape4.png" alt="Decorative Shape 4" />
        </div>
      </div>
      <div className="fugu--circle-shape circle-one">
        <img src="/images/all-img/shapes-round.png" alt="" />
        <div className="waves wave-1"></div>
      </div>
      <div className="fugu--circle-shape circle-two">
        <img src="/images/all-img/shapes-round.png" alt="" />
        <div className="waves wave-1"></div>
      </div>
      <div className="section bg-warning-200">
        <div className="container">
          <div className="fugu-single-thumb wow fadeInUpX" data-wow-delay="0.20s">
            <img
              src="/images/all-img/v2/hero-thumb.png"
              alt="Hero section illustration" className="w-80 rounded-4 shadow-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
