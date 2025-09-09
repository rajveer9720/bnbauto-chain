import ABI from "./abi.json";

export const INFURA_API_URL = import.meta.env.VITE_APP_INFURA_API_URL;
export const CONTRACT_ADDRESS =
  import.meta.env.VITE_APP_INFURA_CONTRACT_ADDRESS ||
  "0x655EA758AdB5C67333670fbBe4F1cD02628707aE";

export { ABI };
