"use client";
import { useAppContext } from "./AppContext";
import WalletDropDown from "./Components/DropDowns/WalletDropDown";
import { AllExpenses } from "./Components/MainPage/AllExpenses";
import Header from "./Components/MainPage/Header";
import SubHeader from "./Components/MainPage/SubHeader";
import ConfirmationWindow from "./Components/Windows/ConfirmationWindow";
import { ExpenseWindow } from "./Components/Windows/ExpenseWindow";
import IconsWindow from "./Components/Windows/IconsWindow";
import { WalletWindow } from "./Components/Windows/WalletWindow";
import AllIcons from "./Local Data/AllIcons";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const {
    openExpenseWindowObject: { openExpenseWindow },
    openWalletWindowObject: { openWalletWindow },
    openConfirmationWindowObject: { openConfirmationWindow },
  } = useAppContext();
  return (
    <div className="poppins w-full h-screen flex justify-center items-center bg-purple-600 ">
      <Toaster />
      <ConfirmationWindow />
      <WalletWindow />
      <ExpenseWindow />
      <WalletDropDown />
      <IconsWindow />
      {(openExpenseWindow || openWalletWindow || openConfirmationWindow) && (
        <div className="w-full h-screen z-40 bg-black fixed opacity-25"></div>
      )}

      {/* Main Page Container */}
      <div className="w-[59%] max-sm:h-full relative max-lg:w-[97%] h-[660px] bg-white shadow-lg rounded-2xl p-12 px-[52px] max-sm:p-[16px]">
        {/* The App Header */}
        <Header />
        {/* The Sub Header */}
        <SubHeader />
        {/* All Expenses */}
        <AllExpenses />
      </div>
    </div>
  );
}
