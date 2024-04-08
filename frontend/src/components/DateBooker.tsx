'use client'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function DateBooker( {onDateChange} : {onDateChange?:Function}) {
    const [reserveDate, setReserveDate] = useState<Dayjs|null>(null);

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className="bg-white" value={reserveDate} onChange= {
                (v) => {
                    setReserveDate(v);
                    if (onDateChange) { //temporary for testing
                        onDateChange(v);
                    }
                }
            }></DatePicker>
        </LocalizationProvider>
    )
}