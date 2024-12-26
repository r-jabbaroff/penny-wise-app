import { v4 as uuidv4 } from "uuid";

export interface Wallet {
  id: string;
  name: string;
  icon: string;
}

export const walletsData: Wallet[] = [
  {
    id: uuidv4(),
    name: "All Wallets",
    icon: "DensitySmall",
  },
  {
    id: uuidv4(),
    name: "Cash",
    icon: "AccountBalanceWallet",
  },
  {
    id: uuidv4(),
    name: "Bank Account",
    icon: "AccountBalance",
  },
  {
    id: uuidv4(),
    name: "Credit Card",
    icon: "CreditCard",
  },
  {
    id: uuidv4(),
    name: "Savings",
    icon: "Savings",
  },
];
