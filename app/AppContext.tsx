"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { allIconsArray, IconData } from "./Local Data/AllIcons";
import { Wallet, walletsData } from "./Local Data/AllWallets";
import { Expense, expensesData } from "./Local Data/AllExpenses";

// Define the shape of the context state
interface AppState {
  openExpenseWindowObject: {
    openExpenseWindow: boolean;
    setOpenExpenseWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  openIconWindowObject: {
    openIconWindow: boolean;
    setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  allIconsArrayObject: {
    allIcons: IconData[];
    setAllIcons: React.Dispatch<React.SetStateAction<IconData[]>>;
  };

  openWalletDropDownObject: {
    openWalletDropDown: boolean;
    setOpenWalletDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  };

  walletDropDownPositionsObject: {
    walletDropDownPositions: { top: number; left: number; width?: number };
    setWalletDropDownPositions: React.Dispatch<
      React.SetStateAction<{ top: number; left: number; width?: number }>
    >;
  };

  openWalletWindowObject: {
    openWalletWindow: boolean;
    setOpenWalletWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  allWalletsObject: {
    allWallets: Wallet[];
    setAllWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
  };

  allExpensesObject: {
    allExpenses: Expense[];
    setAllExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  };

  openConfirmationWindowObject: {
    openConfirmationWindow: boolean;
    setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };

  selectedExpenseObject: {
    selectedExpense: Expense | null;
    setSelectedExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
  };

  isClickedClearAllObject: {
    isClickedClearAll: boolean;
    setIsClickedClearAll: React.Dispatch<React.SetStateAction<boolean>>;
  };

  isLoadingObject: {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };

  isClickedOnMainPageObject: {
    isClickedOnMainPage: boolean;
    setIsClickedOnMainPage: React.Dispatch<React.SetStateAction<boolean>>;
  };

  selectedWalletFromMainPageObject: {
    selectedWalletFromMainPage: Wallet | null;
    setSelectedWalletFromMainPage: React.Dispatch<
      React.SetStateAction<Wallet | null>
    >;
  };

  selectedIconObject: {
    selectedIcon: string;
    setSelectedIcon: React.Dispatch<React.SetStateAction<string>>;
  };

  selectedWalletInExpenseWindowObject: {
    selectedWalletInExpenseWindow: Wallet | null;
    setSelectedWalletInExpenseWindow: React.Dispatch<
      React.SetStateAction<Wallet | null>
    >;
  };

  expenseToEditObject: {
    expenseToEdit: Expense | null;
    setExpenseToEdit: React.Dispatch<React.SetStateAction<Expense | null>>;
  };

  selectedWalletObject: {
    selectedWallet: Wallet | null;
    setSelectedWallet: React.Dispatch<React.SetStateAction<Wallet | null>>;
  };

  globalSearchObject: {
    globalSearch: string;
    setGlobalSearch: React.Dispatch<React.SetStateAction<string>>;
  };
}

// Create a default state
const defaultState: AppState = {
  openExpenseWindowObject: {
    openExpenseWindow: false,
    setOpenExpenseWindow: () => {},
  },

  openIconWindowObject: {
    openIconWindow: false,
    setOpenIconWindow: () => {},
  },

  allIconsArrayObject: {
    allIcons: allIconsArray,
    setAllIcons: () => {},
  },

  openWalletDropDownObject: {
    openWalletDropDown: false,
    setOpenWalletDropDown: () => {},
  },
  walletDropDownPositionsObject: {
    walletDropDownPositions: { top: 0, left: 0 },
    setWalletDropDownPositions: () => {},
  },

  openWalletWindowObject: {
    openWalletWindow: false,
    setOpenWalletWindow: () => {},
  },

  allWalletsObject: {
    allWallets: [],
    setAllWallets: () => {},
  },

  allExpensesObject: {
    allExpenses: [],
    setAllExpenses: () => {},
  },

  openConfirmationWindowObject: {
    openConfirmationWindow: false,
    setOpenConfirmationWindow: () => {},
  },

  selectedExpenseObject: {
    selectedExpense: null,
    setSelectedExpense: () => {},
  },

  isClickedClearAllObject: {
    isClickedClearAll: false,
    setIsClickedClearAll: () => {},
  },

  isLoadingObject: {
    isLoading: false,
    setIsLoading: () => {},
  },

  isClickedOnMainPageObject: {
    isClickedOnMainPage: false,
    setIsClickedOnMainPage: () => {},
  },

  selectedWalletFromMainPageObject: {
    selectedWalletFromMainPage: null,
    setSelectedWalletFromMainPage: () => {},
  },

  selectedIconObject: {
    selectedIcon: "AccountBalance",
    setSelectedIcon: () => {},
  },

  selectedWalletInExpenseWindowObject: {
    selectedWalletInExpenseWindow: null,
    setSelectedWalletInExpenseWindow: () => {},
  },

  expenseToEditObject: {
    expenseToEdit: null,
    setExpenseToEdit: () => {},
  },

  selectedWalletObject: {
    selectedWallet: null,
    setSelectedWallet: () => {},
  },

  globalSearchObject: {
    globalSearch: "",
    setGlobalSearch: () => {},
  },
};

// Create the context with default values
const AppContext = createContext<AppState>(defaultState);

// Create a provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openExpenseWindow, setOpenExpenseWindow] = useState(false);
  const [openIconWindow, setOpenIconWindow] = useState(false);
  const [allIcons, setAllIcons] = useState(allIconsArray);
  const [openWalletDropDown, setOpenWalletDropDown] = useState(false);
  const [walletDropDownPositions, setWalletDropDownPositions] = useState({
    top: 0,
    left: 0,
  });

  const [allWallets, setAllWallets] = useState<Wallet[]>([]);
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);

  const [openWalletWindow, setOpenWalletWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isClickedClearAll, setIsClickedClearAll] = useState(false);
  const [isClickedOnMainPage, setIsClickedOnMainPage] = useState(false);
  const [selectedWalletFromMainPage, setSelectedWalletFromMainPage] =
    useState<Wallet | null>(null);
  const [selectedIcon, setSelectedIcon] = useState("AccountBalance");
  const [selectedWalletInExpenseWindow, setSelectedWalletInExpenseWindow] =
    useState<Wallet | null>(null);

  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [globalSearch, setGlobalSearch] = useState("");

  //Simulate the fetching
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        //Simulate a network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAllExpenses(expensesData);
        setAllWallets(walletsData);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setSelectedWalletFromMainPage(allWallets[0]);
  }, [allWallets]);

  console.log(selectedWalletFromMainPage);

  console.log("allWallets", allWallets);
  console.log("allExpenses", allExpenses);

  return (
    <AppContext.Provider
      value={{
        openExpenseWindowObject: { openExpenseWindow, setOpenExpenseWindow },
        openIconWindowObject: { openIconWindow, setOpenIconWindow },
        allIconsArrayObject: { allIcons, setAllIcons },
        openWalletDropDownObject: {
          openWalletDropDown,
          setOpenWalletDropDown,
        },
        walletDropDownPositionsObject: {
          walletDropDownPositions,
          setWalletDropDownPositions,
        },

        openWalletWindowObject: { openWalletWindow, setOpenWalletWindow },
        allWalletsObject: { allWallets, setAllWallets },
        allExpensesObject: { allExpenses, setAllExpenses },

        openConfirmationWindowObject: {
          openConfirmationWindow,
          setOpenConfirmationWindow,
        },
        selectedExpenseObject: { selectedExpense, setSelectedExpense },
        isClickedClearAllObject: {
          isClickedClearAll,
          setIsClickedClearAll,
        },

        isLoadingObject: { isLoading, setIsLoading },
        isClickedOnMainPageObject: {
          isClickedOnMainPage,
          setIsClickedOnMainPage,
        },

        selectedWalletFromMainPageObject: {
          selectedWalletFromMainPage,
          setSelectedWalletFromMainPage,
        },

        selectedIconObject: { selectedIcon, setSelectedIcon },
        selectedWalletInExpenseWindowObject: {
          selectedWalletInExpenseWindow,
          setSelectedWalletInExpenseWindow,
        },
        expenseToEditObject: { expenseToEdit, setExpenseToEdit },
        selectedWalletObject: { selectedWallet, setSelectedWallet },
        globalSearchObject: { globalSearch, setGlobalSearch },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
