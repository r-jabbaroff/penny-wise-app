import React, { useEffect, useState } from "react";
import AllIcons, { allIconsArray } from "@/app/Local Data/AllIcons";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import { IconData } from "@/app/Local Data/AllIcons";
import { useAppContext } from "@/app/AppContext";

function IconsWindow() {
  const {
    openIconWindowObject: { openIconWindow, setOpenIconWindow },
  } = useAppContext();
  return (
    <div
      className={` ${
        openIconWindow ? "block" : "hidden"
      }  absolute p-3 h-[530px] w-[50%] max-sm:w-[90%]  bg-white shadow-md   left-1/2 top-28 rounded-lg -translate-x-1/2 z-[60]`}
    >
      {/* Header */}
      <Header />

      <span className=" mx-8 text-[13px] mt-12  text-slate-400">
        {`Please select the icons you'd like to use from the collection below:`}
      </span>
      {/* All Icons Area */}
      <IconsArea />
    </div>
  );
}

export default IconsWindow;

function Header() {
  const {
    openIconWindowObject: { setOpenIconWindow },
  } = useAppContext();
  return (
    <div className="flex justify-between items-center pt-7 px-7 mb-8">
      <div className="flex items-center gap-2">
        {/* Icons */}
        <div className="  p-2 bg-purple-200 rounded-lg flex items-center justify-center">
          <AppsIcon
            sx={{ fontSize: 21 }}
            className="text-purple-400 text-[17px]"
          />
        </div>
        {/* Header */}
        <span className="font-semibold text-lg">All Icons</span>
      </div>
      <CloseIcon
        onClick={() => setOpenIconWindow(false)}
        className="text-slate-400 text-[18px] cursor-pointer"
      />
    </div>
  );
}

function Buttons() {
  const {
    openIconWindowObject: { setOpenIconWindow },
  } = useAppContext();
  return (
    <div className="flex justify-end gap-4 mt-10 px-7 text-[12px]">
      <button
        onClick={() => setOpenIconWindow(false)}
        className="px-4 py-2 text-slate-500 border border-slate-200 rounded-md hover:bg-slate-200"
      >
        Cancel
      </button>
      <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500">
        Save
      </button>
    </div>
  );
}

function IconsArea() {
  return (
    <div className="w-full flex flex-col items-center mt-3">
      <div className="border border-slate-100 w-[92%] h-[330px] overflow-auto rounded-md bg-slate-100  ">
        <AllIcons />
      </div>
    </div>
  );
}
