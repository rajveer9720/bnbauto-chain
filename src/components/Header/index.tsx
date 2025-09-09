import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./header.css";
import { useAccount } from "wagmi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { truncateAddress } from "../../utils/truncatewallet";


const Navbars = () => {
  const logo = "/images/logo.png";
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const [scrolled, setScrolled] = useState(false);

  const handleWalletConnect = () => {
    try {
      if (!isConnected) {
        openConnectModal?.();
        return;
      } else {
        openAccountModal?.();
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    depositLink = import.meta.env.VITE_APP_DEPOSIT_LINK || "#deposit",
  
  } = import.meta.env;

  return (
    <header
      className={`site-header fugu--header-section fugu--header-three ${scrolled ? "navbar-shadow" : ""
        }`}
      id="sticky-menu"
    >
      <div className="container-fluid">
        <nav className="navbar site-navbar w-100 justify-content-center">
          <div className="brand-logo rt-mr-20 p-0 d-flex justify-content-center">
            <a href="#">
              <img src={logo} alt="logo" className="img-fluid brand-logo-img  mb-2 mb-md-0" />
            </a>
          </div>
            <Container className="justify-content-center justify-content-md-end nav-action-container gap-5">
            <Row>
              <Button
                data-size="md"
                href={depositLink}
                className="custom-btn"
              >
                Deposit
              </Button>
            </Row>
            <Row>
              <Button className="custom-btn "

                data-size="md"
                onClick={handleWalletConnect}

              >
                {isConnected ? (
                  <span>{truncateAddress(String(address))}</span>
                ) : (
                  <span>Connect Wallet</span>
                )}
              </Button>
            </Row>
          </Container>
        </nav>
      </div>
    </header>
  );
};

export default Navbars;
