import Image from "next/image";

import SingleExpense from "./SingleExpense";
import { useAppContext } from "@/app/AppContext";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { Expense } from "@/app/Local Data/AllExpenses";
export function AllExpenses() {
  return (
    <div className="mt-16  ">
      {/* List Header */}
      <ListHeader />

      <ExpensesList />
    </div>
  );
}

function ListHeader() {
  const {
    allExpensesObject: { allExpenses },
  } = useAppContext();

  const currentDate: string = formatDate(new Date());
  const totalValue: string = formatCurrency(
    allExpenses.reduce((a, b) => a + b.amount, 0)
  );
  return (
    <div className="flex justify-between mb-4 items-center px-1">
      <div>
        {/* Date */}
        <span className="font-bold text-[15px] text-slate-700">
          {currentDate}
        </span>
      </div>

      {/* Transactions & value */}
      <div className="flex gap-7 text-slate-400 text-[13px] font-semibold">
        <span>Number of transaction: {allExpenses.length}</span>
        <span>Value: {totalValue}</span>
      </div>
    </div>
  );
}

function ExpensesList() {
  const {
    allExpensesObject: { allExpenses },
    isLoadingObject: { isLoading },
    globalSearchObject: { globalSearch },
    selectedWalletFromMainPageObject: { selectedWalletFromMainPage },
  } = useAppContext();

  console.log("selectedWalletFromMainPage", selectedWalletFromMainPage);

  const filterBySelectedWallet = allExpenses.filter((e) => {
    if (
      selectedWalletFromMainPage?.name !== "All Wallets" &&
      selectedWalletFromMainPage
    ) {
      return (
        e.wallet.toLowerCase() === selectedWalletFromMainPage.name.toLowerCase()
      );
    } else {
      return e;
    }
  });

  const sortedExpenses = filterBySelectedWallet
    .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())
    .filter((e) => e.name.toLowerCase().includes(globalSearch.toLowerCase()));

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center gap-4 items-center h-[400px]">
        <CircularProgress color="secondary" />
        <p>Loading...</p>
      </div>
    );
  } else {
    if (allExpenses.length === 0) {
      return <AllExpensesEmptyScreen />;
    }
  }

  return (
    <div className="flex p-1 mt-4 items-center flex-col gap-5 h-[500px] lg:h-[300px] overflow-y-auto">
      {sortedExpenses.map((expense) => (
        <SingleExpense key={expense.id} singleExpense={expense} />
      ))}

      {sortedExpenses.length === 0 && globalSearch.length > 0 && (
        <p className="text-center text-slate-400 text-[16px] flex items-center justify-center ">
          No results found
        </p>
      )}
    </div>
  );
}

export function AllExpensesEmptyScreen() {
  return (
    <div
      className={`p-1 gap-5 flex flex-col justify-center pt-[101px] pb-8 items-center`}
    >
      <ReceiptLongIcon sx={{ fontSize: "100px" }} className="text-slate-400" />

      <div className="">
        <h3 className="font-semibold text-[14px] mb-1 text-center ">{`No Expenses Recorded`}</h3>
        <p className="text-gray-400 w-64 text-center text-[12px]">
          {`You haven't recorded any expenses yet.`}
        </p>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace("US$", "")
    .trim(); // Removing "US$" and trimming any spaces
}
