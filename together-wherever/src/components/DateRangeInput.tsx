"use client";
import { Dispatch } from "react";
import { DateRange } from "react-date-range";
import { addDays, differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/custom-date-range.css";

const MAX_SPAN_DAYS = 5;

interface DateRangeInterface {
    startDate: Date;
    endDate: Date;
    key: string;
}

interface DateRangeInputPropsInterface {
    range: DateRangeInterface[];
    setRange: Dispatch<React.SetStateAction<DateRangeInterface[]>>;
    showMaxDateSpan: () => void;
}

export default function DateRangeInput({ range, setRange, showMaxDateSpan }: DateRangeInputPropsInterface) {
    const handleDateChange = (item: any) => {
        const { startDate, endDate } = item.selection;
        const duration = differenceInDays(endDate, startDate);

        // Restrict date range selection to MAX_SPAN_DAYS
        if (duration > MAX_SPAN_DAYS) {
            setRange([
                {
                    startDate,
                    endDate: addDays(startDate, MAX_SPAN_DAYS),
                    key: "selection",
                },
            ]);
            showMaxDateSpan()
        } else {
            setRange([item.selection]);
        }
    };

    return (
        <div className="w-full">
            <DateRange
                ranges={range}
                onChange={handleDateChange}
                className="w-full"
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                rangeColors={["#3b82f6"]}
                minDate={new Date()} // Prevent past date selection
                maxDate={addDays(new Date(), 365)} // Optional: Restrict max selectable date to 1 year ahead
            />
        </div>
    );
}
