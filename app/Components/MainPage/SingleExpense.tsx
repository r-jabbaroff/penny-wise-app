import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Expense } from "@/app/Local Data/AllExpenses";
import { getIconComponent } from "@/app/functions/IconsActions";
import { useAppContext } from "@/app/AppContext";

function SingleExpense({ singleExpense }: { singleExpense: Expense }) {
  const {
    openConfirmationWindowObject: {
      openConfirmationWindow,
      setOpenConfirmationWindow,
    },

    openExpenseWindowObject: { openExpenseWindow, setOpenExpenseWindow },
    expenseToEditObject: { setExpenseToEdit },

    selectedExpenseObject: { selectedExpense, setSelectedExpense },
  } = useAppContext();

  function openWindowToDelete() {
    setSelectedExpense(singleExpense);
    setOpenConfirmationWindow(true);
  }

  function handleEditClick() {
    setOpenExpenseWindow(true);
    setExpenseToEdit(singleExpense);
  }
  return (
    <div
      className="w-full bg-white rounded-lg border border-slate-100 shadow-md 
    flex gap-3 items-center justify-between p-5 py-6 "
    >
      <div className="flex gap-3 items-center">
        {/* Wallet Icon */}
        <div>
          <div className="  bg-purple-200 rounded-lg p-2 flex items-center justify-center">
            {getIconComponent(singleExpense.icon)}
          </div>
        </div>
        {/* Wallet Name */}
        <div className="flex flex-col">
          <span
            onClick={handleEditClick}
            className="font-bold hover:text-purple-600 cursor-pointer"
          >
            {singleExpense.name}
          </span>
          <div className="flex">
            <span className="text-slate-400 text-[13px] p-[2px]  ">
              {singleExpense.wallet}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-11 font-bold items-center">
        <span className="text-[16px]">{`-${singleExpense.amount} $`}</span>
        <div className="flex gap-2 items-center">
          {/* Edit Button */}
          <div
            onClick={handleEditClick}
            className=" rounded-lg p-2  flex items-center justify-center cursor-pointer
          bg-purple-200 hover:bg-purple-300"
          >
            <EditOutlinedIcon
              sx={{ fontSize: "17px" }}
              className="text-purple-600"
            />
          </div>

          {/* Delete Button */}
          <div
            onClick={openWindowToDelete}
            className=" rounded-lg p-2  flex items-center justify-center cursor-pointer
          bg-slate-200 hover:bg-slate-300"
          >
            <DeleteOutlineOutlinedIcon
              sx={{ fontSize: "17px" }}
              className="text-slate-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleExpense;
