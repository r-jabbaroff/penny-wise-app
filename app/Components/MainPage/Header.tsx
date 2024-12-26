"use client";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import { PiPiggyBankLight } from "react-icons/pi";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useAppContext } from "@/app/AppContext";

export default function Header() {
  return (
    <nav className="flex justify-between items-center">
      {/* Logo Section */}
      <LogoSection />
      {/* Search Bar */}
      <SearchBar />
      {/* Button */}
      <Button />
    </nav>
  );
}

function LogoSection() {
  return (
    <div className="flex gap-2 items-center ">
      {/* Icon Container */}
      <div
        className={`bg-purple-600 flex items-center justify-center p-[11px] rounded-lg `}
      >
        {/* Icon */}
        <div className="w-[26px] h-[26px] items-center justify-center flex">
          <PiPiggyBankLight
            style={{ fontSize: "25px" }}
            className="text-white"
          />
        </div>
      </div>

      {/* App Name */}
      <div className="flex gap-1 text-[24px] max-sm:hidden ">
        <span className={`font-bold text-purple-600`}>Penny</span>
        <span className="text-slate-600">Wise</span>
      </div>
    </div>
  );
}

function SearchBar() {
  const {
    globalSearchObject: { setGlobalSearch, globalSearch },
  } = useAppContext();
  return (
    <div
      className={`h-[48px] mt-[3px] bg-slate-50 flex items-center text-sm
  rounded-md  pl-3 gap-1 w-[300px] max-sm:w-[220px]    `}
    >
      <div>
        <SearchOutlinedIcon className="text-slate-400" />
      </div>
      <input
        value={globalSearch}
        onChange={(e) => {
          setGlobalSearch(e.target.value);
        }}
        placeholder="Search an expense..."
        className="bg-transparent outline-none w-full font-light"
      />
    </div>
  );
}

function Button() {
  const {
    openExpenseWindowObject: { setOpenExpenseWindow },
  } = useAppContext();
  return (
    <button
      onClick={() => setOpenExpenseWindow(true)}
      className="bg-purple-600 gap-1  p-[13px] flex  text-sm rounded-md text-white items-center
    justify-center pr-[18px] max-sm:pr-3 hover:bg-purple-700"
    >
      <AddOutlinedIcon sx={{ fontSize: "20px" }} />
      <span className="max-sm:hidden">New Expense</span>
    </button>
  );
}
