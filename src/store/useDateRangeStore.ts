import { endOfMonth, startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

interface DateType {
  filterRange: DateRange | undefined;
  setFilterRange: (date: DateRange | undefined) => void;
}

export const useDateRangeStore = create<DateType>((set) => ({
  filterRange: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) },
  setFilterRange: (date) => set({ filterRange: date }),
}));
