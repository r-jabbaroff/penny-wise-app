import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useAppContext } from "@/app/AppContext";
import { getIconComponent } from "@/app/functions/IconsActions";

function SubHeader() {
  const {
    isLoadingObject: { isLoading },
    allExpensesObject: { allExpenses },
  } = useAppContext();
  return (
    <div className="mt-[90px]  flex justify-between ">
      <WalletOptions />
      <ClearAllBtn />
    </div>
  );
}

export default SubHeader;

function WalletOptions() {
  const {
    openWalletDropDownObject: { setOpenWalletDropDown },
    walletDropDownPositionsObject: { setWalletDropDownPositions },
    isClickedOnMainPageObject: { setIsClickedOnMainPage },
    selectedWalletFromMainPageObject: { selectedWalletFromMainPage },
  } = useAppContext();

  const walletOptionsRef = React.useRef<HTMLDivElement>(null);

  function handleClick() {
    setOpenWalletDropDown(true);
    const rect = walletOptionsRef.current?.getBoundingClientRect();
    const { top, left } = rect || { top: 0, left: 0 };
    setWalletDropDownPositions({ left: left, top: top });
    setIsClickedOnMainPage(true);
  }
  return (
    <div
      ref={walletOptionsRef}
      onClick={handleClick}
      className="border p-2 rounded-md flex items-center gap-2 cursor-pointer z-[20]"
    >
      {selectedWalletFromMainPage &&
        getIconComponent(selectedWalletFromMainPage.icon)}

      {selectedWalletFromMainPage && (
        <span className="text-[15px] mt-1 text-slate-500">
          {selectedWalletFromMainPage.name}
        </span>
      )}

      <KeyboardArrowDownOutlinedIcon
        fontSize="small"
        className="mt-[4px] text-slate-500"
      />
    </div>
  );
}

function ClearAllBtn() {
  const {
    isClickedClearAllObject: { setIsClickedClearAll },
    openConfirmationWindowObject: { setOpenConfirmationWindow },
    allExpensesObject: { allExpenses },
  } = useAppContext();
  return (
    <button
      disabled={allExpenses.length === 0}
      onClick={() => {
        setIsClickedClearAll(true);
        setOpenConfirmationWindow(true);
      }}
      className="border transition-all text-slate-500  px-6  hover:bg-slate-50    flex  text-sm rounded-md   items-center justify-center "
    >
      <span className={`${allExpenses.length === 0 && "opacity-40"}`}>
        Clear All
      </span>
    </button>
  );
}
