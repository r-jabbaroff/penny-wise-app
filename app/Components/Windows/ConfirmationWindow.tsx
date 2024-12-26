import { useAppContext } from "@/app/AppContext";
import { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
export default function ConfirmationWindow() {
  const {
    openConfirmationWindowObject: {
      openConfirmationWindow,
      setOpenConfirmationWindow,
    },
    selectedExpenseObject: { selectedExpense, setSelectedExpense },
    allExpensesObject: { allExpenses, setAllExpenses },
    isClickedClearAllObject: { isClickedClearAll, setIsClickedClearAll },
    selectedWalletObject: { selectedWallet, setSelectedWallet },
    allWalletsObject: { allWallets, setAllWallets },
    selectedWalletInExpenseWindowObject: {
      selectedWalletInExpenseWindow,
      setSelectedWalletInExpenseWindow,
    },
  } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);

  function closeTheWindow() {
    setOpenConfirmationWindow(false);
    setSelectedExpense(null);
    setIsClickedClearAll(false);
    setSelectedWallet(null);
  }

  async function deleteExpense() {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isClickedClearAll) {
        setAllExpenses([]);
        toast.success("All Expenses have been deleted successfully");
      } else if (selectedExpense !== null) {
        setAllExpenses(allExpenses.filter((e) => e.id !== selectedExpense.id));
        toast.success("The expense has been deleted successfully");
      }

      setOpenConfirmationWindow(false);
      setIsClickedClearAll(false);
      setSelectedExpense(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the expense(s)");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteWallet() {
    try {
      setIsLoading(true);
      //Simulating the network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //delete the expenses related to the wallet

      const updateAllExpenses = allExpenses.filter(
        (e) => e.wallet !== selectedWallet?.name
      );

      setAllExpenses(updateAllExpenses);
      //Delete the wallet
      if (selectedWallet !== null) {
        setAllWallets(allWallets.filter((w) => w.id !== selectedWallet.id));
      }

      //Close the window
      setOpenConfirmationWindow(false);
      setSelectedWallet(null);
      setSelectedWalletInExpenseWindow(null);

      if (isClickedClearAll) {
        toast.success("All wallets have been deleted successfully");
      } else {
        toast.success("The wallet has been deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the expense");
    } finally {
      setIsLoading(false);
    }
  }

  const [header, setHeader] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  console.log(isClickedClearAll);

  useLayoutEffect(() => {
    if (selectedWallet) {
      setHeader("Delete Wallet");
      setMessage(
        "Are you sure you want to remove this wallet? This action cannot be undone, and will remove all expenses associated with it."
      );
    }

    if (selectedExpense) {
      setHeader("Delete Expense");
      setMessage(
        "Are you sure you want to remove this expense? This action cannot be undone."
      );
    }

    if (isClickedClearAll) {
      setHeader("Delete All Expenses");
      setMessage(
        "Are you sure you want to remove all expenses? This action cannot be undone."
      );
    }
  }, [openConfirmationWindow]);

  return (
    <div
      className={` 
      ${
        openConfirmationWindow ? "block" : "hidden"
      }  w-[38%] bg-white max-sm:w-[91%] p-6 fixed  shadow-md  
    z-[90] rounded-lg flex items-center top-[30%] left-1/2 -translate-x-1/2`}
    >
      <div className=" rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-5">{header}</h2>
        <p className={`text-gray-600 mb-4 text-sm  `}>{message}</p>

        <div className="flex justify-end gap-2 mt-10 text-[13px] ">
          <button
            onClick={closeTheWindow}
            className="px-4  py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedWallet) {
                deleteWallet();
              } else if (selectedExpense || isClickedClearAll) {
                deleteExpense();
              }
            }}
            className="px-4 py-2 bg-purple-600 rounded-lg text-white "
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
