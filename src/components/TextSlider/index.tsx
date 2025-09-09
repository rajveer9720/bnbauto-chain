import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TextSlider.css";

const textContentArea1 = [
  "2% to 2.3% daily ROI!",
  "70-100 days earning period.",
  "Simple, transparent, reliable.",
];

const textContentArea2 = [
  "Extra 3% ROI after 70 days!",
  "No lock-in; withdraw anytime!",
  "Earn for 70 to 100 days!",
];

const sliderSettings = (rtl: boolean): Settings => ({
  rtl,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 10000,
  cssEase: "linear",
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

const TextSlider = () => {
  return (
    <div className="fugu-text-slider-section">
      <div className="fugu-text-slider-area1">
        <Slider {...sliderSettings(false)}>
          {textContentArea1.map((text, index) => (
            <div key={index} className="fugu-text-slider-data">
              <div className="fugu-text-slider-icon">
                <img src="/images/all-img/v2/star.png" alt="star" />
              </div>
              <h3>{text.toUpperCase()}</h3>
            </div>
          ))}
        </Slider>
      </div>

      <div className="fugu-text-slider-area2" dir="rtl">
        <Slider {...sliderSettings(true)}>
          {textContentArea2.map((text, index) => (
            <div key={index} className="fugu-text-slider-data">
              <div className="fugu-text-slider-icon">
                <img src="/images/all-img/v2/star.png" alt="star" />
              </div>
              <h3>{text.toUpperCase()}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TextSlider;
