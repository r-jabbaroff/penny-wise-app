"use client";
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAppContext } from "@/app/AppContext";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { getIconComponent } from "@/app/functions/IconsActions";
import { Wallet } from "@/app/Local Data/AllWallets";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

interface walletWindowInterface {
  inputNameObject: {
    inputName: string;
    setInputName: React.Dispatch<React.SetStateAction<string>>;
  };

  errorObject: {
    error: { message: string; show: boolean };
    setError: React.Dispatch<
      React.SetStateAction<{ message: string; show: boolean }>
    >;
  };
}

const walletWindowDefaultState = {
  inputNameObject: {
    inputName: "",
    setInputName: () => {},
  },

  errorObject: {
    error: { message: "", show: false },
    setError: () => {},
  },
};
const WalletWindowContext = createContext<walletWindowInterface>(
  walletWindowDefaultState
);

const useWalletWindow = () => React.useContext(WalletWindowContext);

export function WalletWindow() {
  const {
    openWalletWindowObject: { openWalletWindow, setOpenWalletWindow },
    allWalletsObject: { allWallets, setAllWallets },
    selectedIconObject: { selectedIcon, setSelectedIcon },

    isClickedOnMainPageObject: { isClickedOnMainPage, setIsClickedOnMainPage },
    selectedWalletObject: { selectedWallet, setSelectedWallet },
    allExpensesObject: { allExpenses, setAllExpenses },
  } = useAppContext();

  const [inputName, setInputName] = useState("");
  const [error, setError] = useState({ message: "", show: false });
  const [isLoading, setIsLoading] = useState(false);

  function submitTheForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Create a shallow copy of the errorMessages array
    const updatedError = { ...error };

    const isWalletAlreadyExists = allWallets.find(
      (wallet) => wallet.name.toLowerCase() === inputName.toLowerCase()
    );

    let inputErrorMessage = "";

    // Check if the expense name is empty or already exists
    if (inputName.trim() === "" || isWalletAlreadyExists) {
      // Adjust the input error message based on whether the wallet exists or is empty
      if (isWalletAlreadyExists) {
        inputErrorMessage = "Wallet already exists!";
      } else if (inputName.trim() === "") {
        inputErrorMessage = "The input is still empty!";
      }

      // Update the error state
      updatedError.message = inputErrorMessage;
      updatedError.show = true;
      setError(updatedError);
    } else {
      // If there are no errors, add the new wallet
      if (selectedWallet) {
        updateExistingWallet();
      } else {
        addNewWallet();
      }
    }
  }

  useLayoutEffect(() => {
    if (selectedWallet !== null) {
      setInputName(selectedWallet.name);
      setError({ message: "", show: false });
      setSelectedIcon(selectedWallet.icon);
    } else {
      setInputName("");
      setError({ message: "", show: false });
    }
  }, [openWalletWindow]);

  async function addNewWallet() {
    const newWallet: Wallet = {
      id: uuidv4(),
      icon: selectedIcon,
      name: inputName,
    };

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Wallet added successfully");
      setAllWallets([...allWallets, newWallet]);
      setOpenWalletWindow(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setIsClickedOnMainPage(false);
    }
  }

  async function updateExistingWallet() {
    if (!selectedWallet) return;

    const updatedWallet: Wallet = {
      ...selectedWallet,
      icon: selectedIcon,
      name: inputName,
    };

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update associated expenses
      const updatedExpenses = allExpenses.map((expense) =>
        expense.wallet === selectedWallet.name
          ? { ...expense, wallet: inputName }
          : expense
      );
      setAllExpenses(updatedExpenses);

      const updatedWallets = allWallets.map((wallet) =>
        wallet.id === selectedWallet.id ? updatedWallet : wallet
      );

      setAllWallets(updatedWallets);
      toast.success("Wallet updated successfully");
      setOpenWalletWindow(false);
      setSelectedWallet(null);
    } catch (error) {
      toast.error("Failed to update wallet");
    } finally {
      setIsLoading(false);
      setIsClickedOnMainPage(false);
    }
  }

  return (
    <WalletWindowContext.Provider
      value={{
        inputNameObject: { inputName, setInputName },
        errorObject: { error, setError },
      }}
    >
      <div
        className={` ${
          openWalletWindow ? "block" : "hidden"
        }  w-[48%] max-sm:w-[82%] z-[60] p-3 left-1/2 top-[47%] -translate-y-1/2 
      -translate-x-1/2 absolute  flex flex-col gap-3    border border-slate-50 
      bg-white rounded-md shadow-md`}
      >
        {/*  */}
        {/* Header */}
        <Header />
        {/* Body */}
        <form
          onSubmit={submitTheForm}
          className=" flex flex-col gap-2 pt-8 px-7 mt-3"
        >
          {/* Expense input */}
          <ExpenseInput />

          {/* Footer */}
          <Footer isLoading={isLoading} />
        </form>
      </div>
    </WalletWindowContext.Provider>
  );
}

function Header() {
  const {
    openWalletWindowObject: { setOpenWalletWindow },
    selectedWalletObject: { selectedWallet, setSelectedWallet },
  } = useAppContext();
  return (
    <div className="flex justify-between items-center pt-7 px-7">
      <div className="flex items-center gap-2">
        {/* Expense Icon */}
        <div className=" p-[7px] bg-purple-200 rounded-lg flex items-center justify-center">
          <AccountBalanceWalletIcon
            sx={{ fontSize: "21px" }}
            className="text-purple-600"
          />
        </div>
        {/* Expense Header */}
        <span className="font-semibold text-lg">
          {selectedWallet ? "Edit Wallet" : "Add Wallet"}
        </span>
      </div>

      <CloseOutlinedIcon
        onClick={() => {
          setOpenWalletWindow(false);
          setSelectedWallet(null);
        }}
        sx={{ fontSize: "18px" }}
        className="text-slate-300 cursor-pointer"
      />
    </div>
  );
}

function ExpenseInput() {
  const {
    openIconWindowObject: { setOpenIconWindow },
    openWalletWindowObject: { openWalletWindow },
    selectedIconObject: { selectedIcon },
    selectedWalletObject: { selectedWallet },
  } = useAppContext();

  const {
    inputNameObject: { inputName, setInputName },
    errorObject: { error, setError },
  } = useWalletWindow();

  const inputRef = React.useRef<HTMLInputElement>(null);

  function updateTheInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputName(e.target.value);
    setError({ message: "", show: false });
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [openWalletWindow, error.show]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-slate-600">
        Wallet Name
      </span>
      <div className="flex gap-3 justify-between">
        {/* Input */}
        <div className="w-full">
          <input
            ref={inputRef}
            value={inputName}
            onChange={updateTheInput}
            placeholder="Enter Wallet Name..."
            className="p-[10px] text-[13px] w-full rounded-md border outline-none"
          />
          {error.show && (
            <p className="text-[11px] mt-2 text-red-500">{error.message}</p>
          )}
        </div>

        {/* Icon */}
        <div
          onClick={() => setOpenIconWindow(true)}
          className="w-12 h-10 text-white  flex items-center justify-center bg-purple-600 rounded-lg cursor-pointer hover:bg-purple-700"
        >
          {selectedIcon && getIconComponent(selectedIcon, "text-white", "21px")}
        </div>
      </div>
    </div>
  );
}

function Footer({ isLoading }: { isLoading: boolean }) {
  const {
    openWalletWindowObject: { setOpenWalletWindow },
    selectedWalletObject: { selectedWallet, setSelectedWallet },
  } = useAppContext();
  return (
    <div className="w-[102%]   p-[12px] mt-8 mb-4 flex gap-3 justify-end   items-center">
      {/* Cancel Button */}
      <button
        onClick={() => {
          setOpenWalletWindow(false);
          setSelectedWallet(null);
        }}
        className=" border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white text-[13px] p-2 px-4 rounded-md transition-all"
      >
        {isLoading ? "Loading" : selectedWallet ? "Edit Wallet" : "Add Wallet"}
      </button>
    </div>
  );
}
