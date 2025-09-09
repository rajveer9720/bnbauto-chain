import { Container, Card } from "react-bootstrap";
import { useContractData } from "../context/DataContext";
import ReferralCard from "../RefferalCard";

const totalLevels = parseInt(import.meta.env.VITE_APP_REFERRAL_LEVELS) || 10;

const Levels = () => {
    const { userData } = useContractData();

    const stats = {
        levels: userData?.userInfo?.structure || [],
    };

    const levels = Array.from(
        { length: totalLevels },
        (_, i) => import.meta.env[`VITE_APP_LEVEL_${i + 1}_PERCENTAGE`] || 0,
    );

    return (
        <div className="levels-container">
            <Container className="col-lg-12 py-5">
                <Card.Body>
                    <h2 className="text-center ">Referral Levels</h2>
                    <p className="text-center mb-4">Check your downlines at each referral level</p>
                    <div className="referral-card-grid">
                        {levels.map((level, index) => (
                            <ReferralCard
                                key={index}
                                level={index + 1}
                                referralparcentage={`${level}%`}
                                downlinecount={`${Array.isArray(stats.levels) ? stats.levels[index] || 0 : 0} `}
                            />
                        ))}
                    </div>
                </Card.Body>
            </Container>
        </div>
    );
}

export default Levels;
