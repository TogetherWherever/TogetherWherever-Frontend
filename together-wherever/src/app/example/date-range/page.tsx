'use client';

import DateRangeInput from '@/components/DateRangeInput'
import { useState } from 'react';
import { addDays } from "date-fns";

export default function ExampleButton() {
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);

    return (
        <div className="flex justify-between items-center">
            <DateRangeInput range={range} setRange={setRange} />
        </div>
    );
};