import Dropdown from "../Dropdown";
import { useEffect, useState } from "react";

function DatePicker({ setDate, startDate = new Date(), endDate = new Date() }) {
    const getYears = () => {
        let years = [];
        for (let i = startDate.getFullYear(); i <= endDate.getFullYear(); i++) {
            years.push(i);
        }
        return years;
    }
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const getDays = (date) => {
        const longMonths = ["JAN", "MAR", "MAY", "JUL", "AUG", "OCT", "DEC"];
        const shortMonths = ["APR", "JUN", "SEP", "NOV"];
        let val;
        if (longMonths.includes(months[date.getMonth()])) {
            val = 31;
        }
        else if (shortMonths.includes(months[date.getMonth()])) {
            val = 30;
        }
        else {
            if (date.getFullYear() % 4 == 0 && (date.getFullYear() % 100 != 0 || date.getFullYear() % 400 == 0)) {
                val = 29;
            }
            val = 28;
        }
        let days = [];
        for (let i = 1; i <= val; i++) {
            days.push(i);
        }
        return days;
    }
    const [day, setDay] = useState(startDate.getDate() - 1);
    const [month, setMonth] = useState((startDate.getMonth()));
    const [year, setYear] = useState(0);
    const date = new Date(year + startDate.getFullYear(), month, day + 1);

    useEffect(() => {
        const d = new Date(year + startDate.getFullYear(), month, day + 1);
        setDate(d);
    }, [startDate, setDate, day, month, year]);

    return (
        <div style={{
            display: "flex",
            gap: "10px"
        }}>
            <Dropdown options={getDays(date)} selected={day} changeSelected={setDay} />
            <Dropdown options={months} selected={month} changeSelected={setMonth} />
            <Dropdown options={getYears()} selected={year} changeSelected={setYear} />
        </div>
    )
}
export default DatePicker;