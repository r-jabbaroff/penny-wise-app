import React, { useEffect, useRef } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useAppContext } from "@/app/AppContext";
import { Wallet } from "@/app/Local Data/AllWallets";
import { getIconComponent } from "@/app/functions/IconsActions";
import EditIcon from "@mui/icons-material/Edit";

function WalletDropDown() {
  const {
    openWalletDropDownObject: { openWalletDropDown, setOpenWalletDropDown },
    walletDropDownPositionsObject: { walletDropDownPositions },
    isClickedOnMainPageObject: { isClickedOnMainPage, setIsClickedOnMainPage },
    selectedWalletFromMainPageObject: { setSelectedWalletFromMainPage },
  } = useAppContext();

  const dropDownRef = useRef<HTMLDivElement>(null);

  console.log(isClickedOnMainPage);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpenWalletDropDown(false);
        setIsClickedOnMainPage(false);
      }
    }

    if (openWalletDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openWalletDropDown, setOpenWalletDropDown]);
  return (
    <div
      ref={dropDownRef}
      style={{
        top: walletDropDownPositions.top + 55,
        left: walletDropDownPositions.left,
        width: walletDropDownPositions.width,
      }}
      className={` ${
        openWalletDropDown ? "block" : "hidden"
      }   bg-white absolute p-3  z-[90] border w-[290px]  border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2`}
    >
      {/* Add Button */}
      {isClickedOnMainPage && <AddButton />}

      <WalletList />
    </div>
  );
}
export default WalletDropDown;

function AddButton() {
  const {
    openWalletWindowObject: { setOpenWalletWindow },
    openWalletDropDownObject: { setOpenWalletDropDown },
  } = useAppContext();

  return (
    <div
      onClick={() => {
        setOpenWalletWindow(true);
        setOpenWalletDropDown(false);
      }}
      className="flex items-center gap-2 p-[9px] border border-dashed rounded-lg text-slate-600 cursor-pointer hover:text-sky-500"
    >
      <div>
        <AddOutlinedIcon className="text-slate-400" />
      </div>
      <span className="text-[14px] text-slate-400">Add</span>
    </div>
  );
}

function WalletList() {
  const {
    allWalletsObject: { allWallets },
    isClickedOnMainPageObject: { isClickedOnMainPage },
  } = useAppContext();

  const filterAllWalletsFromAllWallets = !isClickedOnMainPage
    ? allWallets.filter((wallet) => wallet.name !== "All Wallets")
    : allWallets;

  // If there are no wallets and it is not clicked on main page
  if (filterAllWalletsFromAllWallets.length === 0 && !isClickedOnMainPage) {
    return (
      <p className="text-slate-600 text-[13px] p-1">
        No Wallets created yet...
      </p>
    );
  }
  return (
    <div>
      {filterAllWalletsFromAllWallets.map((wallet) => (
        <SingleList key={wallet.id} wallet={wallet} />
      ))}
    </div>
  );
}

function SingleList({ wallet }: { wallet: Wallet }) {
  const {
    isClickedOnMainPageObject: { isClickedOnMainPage, setIsClickedOnMainPage },
    selectedWalletFromMainPageObject: {
      setSelectedWalletFromMainPage,
      selectedWalletFromMainPage,
    },
    openWalletDropDownObject: { setOpenWalletDropDown },
    selectedWalletInExpenseWindowObject: {
      setSelectedWalletInExpenseWindow,
      selectedWalletInExpenseWindow,
    },

    selectedWalletObject: { setSelectedWallet },
    openConfirmationWindowObject: { setOpenConfirmationWindow },
    openWalletWindowObject: { setOpenWalletWindow },
  } = useAppContext();

  //Only if we click on the main page, change the color of
  //of selected wallet to not having the expense window
  const changeTheColorsOfSelectedWallet =
    isClickedOnMainPage && //
    selectedWalletFromMainPage?.id === wallet.id &&
    "border border-purple-600 bg-purple-50";

  function openTheConfirmationWindow() {
    setSelectedWallet(wallet);
    setOpenWalletDropDown(false);
    setOpenConfirmationWindow(true);
  }

  function openWalletWindow() {
    setSelectedWallet(wallet);
    setOpenWalletDropDown(false);
    setOpenWalletWindow(true);
  }

  return (
    <div
      className={` ${changeTheColorsOfSelectedWallet}  flex items-center justify-between  gap-7 p-3 rounded-lg text-slate-600  cursor-pointer  `}
    >
      <div
        onClick={() => {
          //Update the selection of the wallet only in the main page
          //so when I'm using the drop down in the expense window it is
          //not going to change in the main page
          if (isClickedOnMainPage) {
            setSelectedWalletFromMainPage(wallet);
          }

          if (selectedWalletInExpenseWindow) {
            setSelectedWalletInExpenseWindow(wallet);
          }

          //Reset the isClickedOnMainPage
          setIsClickedOnMainPage(false);
          //Close the drop down
          setOpenWalletDropDown(false);
        }}
        className="flex gap-2 items-center"
      >
        <div>{getIconComponent(wallet.icon)}</div>
        <span className="text-[15px] mt-1 hover:text-purple-600 cursor-pointer">
          {wallet.name}
        </span>
      </div>

      {/* Action Buttons */}
      {isClickedOnMainPage && wallet.name !== "All Wallets" && (
        <div className="flex  font-bold items-center mt-[3px]">
          <div className="flex gap-4 items-center">
            {/* Edit Button */}
            <div
              onClick={openWalletWindow}
              className=" rounded-lg mr-3   flex items-center justify-center cursor-pointer  "
            >
              <EditIcon sx={{ fontSize: "16px" }} className="text-slate-600" />
            </div>
          </div>
          {/* Delete Button */}
          <div className=" rounded-lg   flex items-center justify-center cursor-pointer  ">
            <DeleteOutlineOutlinedIcon
              onClick={openTheConfirmationWindow}
              sx={{ fontSize: "16px" }}
              className="text-slate-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}
