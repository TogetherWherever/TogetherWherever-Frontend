"use client";
import { Dispatch } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import '@/app/custom-date-range.css';

interface DateRangeInterface {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface DateRangeInputPropsInrerface {
  range: DateRangeInterface[];
  setRange: Dispatch<DateRangeInterface[]>;
}

export default function DateRangeInput({ range, setRange }: DateRangeInputPropsInrerface) {
  return (
    <div className="w-full">
      <DateRange
        ranges={range}
        onChange={(item: any) => setRange([item.selection])}
        className="w-full" // Ensure the DateRange component takes full width
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        rangeColors={["#3b82f6"]}
      />
    </div>
  );
}