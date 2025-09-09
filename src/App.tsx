import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Header,
  HeroSection,
  ContractData,
  TextSlider,
  ProfitCalculator,
  Dashboard,
  Referral,
  Levels,
  Footer,
} from "./components/index";
import "./css/animate.css";
import "./css/main.css";
import "./css/app.css";
import "./css/app.min.css";
import "./App.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import { Web3ModalProvider } from "./providers/web3Provider";
import { ContractDataProvider } from "./components/context/DataContext";
import { Toaster } from "react-hot-toast";
const App: React.FC = () => {
  return (
    <Web3ModalProvider>
      <ContractDataProvider>
        <div>
          <Toaster />
          <Header />
          <HeroSection />
          <ContractData />
          <TextSlider />
          <ProfitCalculator />
          <Dashboard />
          <Referral />
          <Levels />
          <Footer />
        </div>
      </ContractDataProvider>
    </Web3ModalProvider>
  );
};

export default App;
