"use client";
import React, {
  createContext,
  InputHTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAppContext } from "@/app/AppContext";
import { getIconComponent } from "@/app/functions/IconsActions";
import { Expense } from "@/app/Local Data/AllExpenses";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
interface ErrorMessage {
  id: number;
  input: string;
  show: boolean;
  message: string;
}
interface expenseWindowInterface {
  expenseInputObject: {
    expenseName: string;
    setExpenseName: React.Dispatch<React.SetStateAction<string>>;
  };

  amountInputObject: {
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
  };

  errorMessagesObject: {
    errorMessages: ErrorMessage[];
    setErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessage[]>>;
  };
}

const expenseWindowDefaultState = {
  expenseInputObject: {
    expenseName: "",
    setExpenseName: () => {},
  },

  errorMessagesObject: {
    errorMessages: [],
    setErrorMessages: () => {},
  },

  amountInputObject: {
    amount: 0,
    setAmount: () => {},
  },
};
const ExpenseWindowContext = createContext<expenseWindowInterface>(
  expenseWindowDefaultState
);

const useExpenseWindowContext = () => React.useContext(ExpenseWindowContext);

export function ExpenseWindow() {
  const {
    openExpenseWindowObject: { openExpenseWindow, setOpenExpenseWindow },
    allExpensesObject: { allExpenses, setAllExpenses },
    selectedIconObject: { selectedIcon, setSelectedIcon },
    selectedWalletInExpenseWindowObject: { selectedWalletInExpenseWindow },
    expenseToEditObject: { expenseToEdit, setExpenseToEdit },
  } = useAppContext();

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState(0);
  const [errorMessages, setErrorMessages] = useState([
    { id: 1, input: "expense", show: false, message: "" },
    { id: 2, input: "amount", show: false, message: "" },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  function submitExpenseWindowForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Create a shallow copy of the errorMessages array
    const updatedErrorMessages = [...errorMessages];

    const isExpenseAlreadyExists = allExpenses.find(
      (expense) => expense.name.toLowerCase() === expenseName.toLowerCase()
    );

    let inputErrorMessage = "";

    // Check if the expense name is empty or already exists
    if (
      expenseName.trim() === "" ||
      (isExpenseAlreadyExists && expenseToEdit === null)
    ) {
      // Adjust the input error message based on whether the expense exists or is empty
      if (isExpenseAlreadyExists) {
        inputErrorMessage = "Expense already exists!";
      } else if (expenseName.trim() === "") {
        inputErrorMessage = "The input is still empty!";
      }

      // Update the relevant error message in the copied array
      updatedErrorMessages.forEach((error) => {
        if (error.input === "expense") {
          error.show = true;
          error.message = inputErrorMessage;
        }
      });
    }

    // Check if the amount is valid
    if (amount <= 0 || isNaN(amount)) {
      updatedErrorMessages.forEach((error) => {
        if (error.input === "amount") {
          error.show = true;
          error.message = "Amount must be greater than 0!";
        }
      });
    }
    console.log(errorMessages);

    const allErrorsHidden = updatedErrorMessages.every((error) => !error.show);
    if (allErrorsHidden) {
      if (!expenseToEdit) {
        addNewExpense();
      } else {
        editExpense();
      }
    } else {
      setErrorMessages(updatedErrorMessages);
    }
  }

  useLayoutEffect(() => {
    setErrorMessages((prevState) =>
      prevState.map((error) => {
        return { ...error, show: false, message: "" };
      })
    );
  }, [openExpenseWindow]);

  useEffect(() => {
    if (expenseToEdit && openExpenseWindow) {
      setExpenseName(expenseToEdit.name);
      setAmount(expenseToEdit.amount);
      setSelectedIcon(expenseToEdit.icon);
    }
  }, [openExpenseWindow]);

  async function addNewExpense() {
    const newExpense: Expense = {
      id: uuidv4(),
      icon: selectedIcon,
      name: expenseName,
      wallet: selectedWalletInExpenseWindow?.name || "No wallets",
      amount: amount,
      creationDate: new Date(),
    };

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Expense added successfully");
      setAllExpenses([...allExpenses, newExpense]);
      setOpenExpenseWindow(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setAmount(0);
    }
  }

  async function editExpense() {
    try {
      setIsLoading(true);

      if (expenseToEdit) {
        const updatedExpense: Expense = {
          ...expenseToEdit,
          name: expenseName,
          amount: amount,
          icon: selectedIcon,
          wallet: selectedWalletInExpenseWindow?.name || "No wallets",
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAllExpenses((prevExpenses) => {
          const updatedExpenses = prevExpenses.map((e) =>
            e.id === updatedExpense.id ? updatedExpense : e
          );
          return updatedExpenses;
        });

        toast.success("Expense edited successfully");
        setOpenExpenseWindow(false);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
      setExpenseToEdit(null);
    }
  }

  return (
    <ExpenseWindowContext.Provider
      value={{
        expenseInputObject: { expenseName, setExpenseName },
        errorMessagesObject: { errorMessages, setErrorMessages },
        amountInputObject: { amount, setAmount },
      }}
    >
      <div
        className={`${
          openExpenseWindow ? "block" : "hidden"
        } w-[48%] max-sm:w-[82%] z-[60] p-3 left-1/2 top-[47%] -translate-y-1/2 
      -translate-x-1/2 absolute  flex flex-col gap-3    border border-slate-50 
      bg-white rounded-md shadow-md`}
      >
        {/*  */}
        {/* Header */}
        <Header />
        {/* Body */}
        <form
          onSubmit={submitExpenseWindowForm}
          className=" flex flex-col gap-2 pt-8 px-7 mt-3"
        >
          {/* Expense input */}
          <ExpenseInput />
          <div className="flex mt-3  gap-3 justify-between  ">
            {/* Amount input */}
            <AmountInput />
            {/* Wallet */}
            <WalletSelection />
          </div>

          {/* Footer */}
          <Footer isLoading={isLoading} />
        </form>
      </div>
    </ExpenseWindowContext.Provider>
  );
}

function Header() {
  const {
    openExpenseWindowObject: { openExpenseWindow, setOpenExpenseWindow },
    expenseToEditObject: { setExpenseToEdit, expenseToEdit },
  } = useAppContext();
  return (
    <div className="flex justify-between items-center pt-7 px-7">
      <div className="flex items-center gap-2">
        {/* Expense Icon */}
        <div className=" p-[7px] bg-purple-200 rounded-lg flex items-center justify-center">
          <ReceiptLongOutlinedIcon
            sx={{ fontSize: "21px" }}
            className="text-purple-600"
          />
        </div>
        {/* Expense Header */}
        <span className="font-semibold text-lg">
          {expenseToEdit ? "Edit Expense" : "Add Expense"}
        </span>
      </div>

      <CloseOutlinedIcon
        onClick={() => {
          setOpenExpenseWindow(false);
          setExpenseToEdit(null);
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
    openExpenseWindowObject: { openExpenseWindow },
    selectedIconObject: { selectedIcon },
  } = useAppContext();

  //
  const {
    expenseInputObject: { expenseName, setExpenseName },
    errorMessagesObject: { errorMessages, setErrorMessages },
  } = useExpenseWindowContext();
  const inputNameRef = useRef<HTMLInputElement>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setExpenseName(value);
    //Get rid from the error message
    setErrorMessages((prevState) =>
      prevState.map((error) => {
        if (error.input === "expense") {
          return {
            ...error,
            show: false,
            message: "",
          };
        }
        return error;
      })
    );
  }

  //Set the focus to the input when the window is opened
  useEffect(() => {
    if (inputNameRef.current) {
      inputNameRef.current.focus();
    }

    //Reset the expense name input
    setExpenseName("");
  }, [openExpenseWindow]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-slate-600">
        Expense Name
      </span>
      <div className="flex gap-3 justify-between">
        {/* Input */}
        <div className="w-full">
          <input
            type="text"
            ref={inputNameRef}
            onChange={handleInputChange}
            value={expenseName}
            placeholder="Enter Expense Name..."
            className="p-[10px] text-[13px] w-full rounded-md border outline-none"
          />
          {errorMessages[0].show && (
            <p className="text-[11px] mt-2 text-red-500">
              {errorMessages[0].message}
            </p>
          )}
        </div>

        {/* Icon */}
        <div
          onClick={() => setOpenIconWindow(true)}
          className="w-12 h-10 text-white  flex items-center justify-center bg-purple-600 rounded-lg cursor-pointer hover:bg-purple-700"
        >
          {getIconComponent(selectedIcon, "text-white", "21px")}
        </div>
      </div>
    </div>
  );
}
// Adjust import path as needed

function AmountInput() {
  const {
    amountInputObject: { amount, setAmount },
    errorMessagesObject: { errorMessages, setErrorMessages },
  } = useExpenseWindowContext();

  const {
    openConfirmationWindowObject: {
      openConfirmationWindow,
      setOpenConfirmationWindow,
    },
  } = useAppContext();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  function handleAmountUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/,/g, "");
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      setAmount(numericValue);
    } else {
      setAmount(0);
    }

    //Get rid of the error message
    setErrorMessages((prevState) =>
      prevState.map((error) => {
        if (error.input === "amount") {
          return {
            ...error,
            show: false,
            message: "",
          };
        }
        return error;
      })
    );
  }

  return (
    <div className="flex gap-2 flex-col mt-2 w-full">
      <span className="text-[14px] font-medium text-slate-600">Amount</span>
      <div className="flex gap-3 items-center">
        {/* Input */}
        <div className="w-full">
          <input
            type="text"
            value={formatter.format(amount)}
            onChange={handleAmountUpdate}
            placeholder="Enter The Amount..."
            className="p-[10px] text-[13px] w-full rounded-md border outline-none"
          />
          {errorMessages[1].show && (
            <p className="text-[11px] mt-2 text-red-500">
              {errorMessages[1].message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AmountInput;

function WalletSelection() {
  const {
    openWalletDropDownObject: { setOpenWalletDropDown },
    walletDropDownPositionsObject: { setWalletDropDownPositions },
    selectedWalletInExpenseWindowObject: {
      selectedWalletInExpenseWindow,
      setSelectedWalletInExpenseWindow,
    },
    openExpenseWindowObject: { openExpenseWindow },
    allWalletsObject: { allWallets },
    expenseToEditObject: { expenseToEdit },
  } = useAppContext();

  const walletSelectionRef = React.useRef<HTMLDivElement>(null);

  function handleClick() {
    setOpenWalletDropDown(true);
    const rect = walletSelectionRef.current?.getBoundingClientRect();
    const { top, left, width } = rect || { top: 0, left: 0 };
    setWalletDropDownPositions({ left: left, top: top + 30, width: width });
  }

  const filterAllWalletsFromAllWallets = allWallets.filter(
    (wallet) => wallet.name !== "All Wallets"
  );

  useEffect(() => {
    if (filterAllWalletsFromAllWallets.length !== 0) {
      if (expenseToEdit === null) {
        setSelectedWalletInExpenseWindow(filterAllWalletsFromAllWallets[0]);
      } else {
        const findTheWallet = filterAllWalletsFromAllWallets.find(
          (w) => w.name === expenseToEdit.wallet
        );

        console.log(findTheWallet);

        if (findTheWallet) {
          setSelectedWalletInExpenseWindow(findTheWallet);
        } else {
          filterAllWalletsFromAllWallets[0];
        }
      }
    }
  }, [openExpenseWindow, expenseToEdit]);

  return (
    <div
      onClick={() => {
        if (filterAllWalletsFromAllWallets.length !== 0) {
          handleClick();
        }
      }}
      ref={walletSelectionRef}
      className={`flex gap-2 flex-col mt-2 w-full  ${
        filterAllWalletsFromAllWallets.length === 0
          ? "opacity-50"
          : "cursor-pointer"
      }`}
    >
      <span className="text-[14px] font-medium text-slate-600">Wallet</span>
      <div
        className={`border ${
          filterAllWalletsFromAllWallets.length === 0 ? "p-[10px]" : "p-[7px]"
        } rounded-md flex items-center justify-between gap-2`}
      >
        <div className="flex gap-2 items-center">
          {selectedWalletInExpenseWindow && (
            <>
              {getIconComponent(selectedWalletInExpenseWindow.icon)}
              <span className="text-[13px] mt-[2px]   text-slate-500">
                {selectedWalletInExpenseWindow.name}
              </span>
            </>
          )}
        </div>

        <KeyboardArrowDownOutlinedIcon fontSize="small" />
      </div>
    </div>
  );
}

function Footer({ isLoading }: { isLoading: boolean }) {
  const {
    openExpenseWindowObject: { openExpenseWindow, setOpenExpenseWindow },
    selectedWalletInExpenseWindowObject: { setSelectedWalletInExpenseWindow },
    expenseToEditObject: { setExpenseToEdit, expenseToEdit },
  } = useAppContext();

  const {
    amountInputObject: { setAmount },
  } = useExpenseWindowContext();
  return (
    <div className="w-full p-[12px] mt-8 mb-4 flex gap-3 justify-end  items-center">
      {/* Cancel Button */}
      <button
        onClick={() => {
          setOpenExpenseWindow(false);
          setAmount(0);
          setSelectedWalletInExpenseWindow(null);
          setExpenseToEdit(null);
        }}
        className="border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white text-[13px] p-2 px-3 rounded-md transition-all"
      >
        {isLoading ? "Loading" : expenseToEdit ? "Edit Expense" : "Add Expense"}
      </button>
    </div>
  );
}
