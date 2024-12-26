import { v4 as uuidv4 } from "uuid";

export interface Expense {
  id: string;
  name: string;
  wallet: string;
  icon: string;
  amount: number;
  creationDate: Date;
}

export const expensesData: Expense[] = [
  {
    id: uuidv4(),
    name: "Groceries",
    wallet: "Cash",
    icon: "LocalGroceryStore",
    amount: 75.5,
    creationDate: new Date(), // Add the current date
  },
  {
    id: uuidv4(),
    name: "Rent",
    wallet: "Bank Account",
    icon: "Home",
    amount: 1200,
    creationDate: new Date(),
  },
  {
    id: uuidv4(),
    name: "Dining Out",
    wallet: "Credit Card",
    icon: "Restaurant",
    amount: 45.75,
    creationDate: new Date(),
  },
  {
    id: uuidv4(),
    name: "Gas",
    wallet: "Cash",
    icon: "LocalGasStation",
    amount: 40,
    creationDate: new Date(),
  },
  {
    id: uuidv4(),
    name: "Movie Tickets",
    wallet: "Credit Card",
    icon: "LocalMovies",
    amount: 30,
    creationDate: new Date(),
  },
  {
    id: uuidv4(),
    name: "Gym Membership",
    wallet: "Bank Account",
    icon: "FitnessCenter",
    amount: 50,
    creationDate: new Date(),
  },
  {
    id: uuidv4(),
    name: "Electricity Bill",
    wallet: "Bank Account",
    icon: "ElectricalServicesOutlined",
    amount: 85.2,
    creationDate: new Date(),
  },
  {
    id: uuidv4(),
    name: "New Laptop",
    wallet: "Credit Card",
    icon: "Laptop",
    amount: 999.99,
    creationDate: new Date(),
  },
  {
    id: uuidv4(),
    name: "Books",
    wallet: "Cash",
    icon: "MenuBook",
    amount: 35.5,
    creationDate: new Date(),
  },
  {
    id: uuidv4(),
    name: "Savings Deposit",
    wallet: "Savings",
    icon: "Savings",
    amount: 200,
    creationDate: new Date(),
  },
];
