import { useState } from "react";
import styles from "./quoteForm.module.css";

export default function QuoteForm() {
    const [count, updateCount] = useState(0);
    const [date, changeDate] = useState({ day: 1, month: "JUL", year: 2023 });
    const {
        form,
        formInfoPair,
        col
    } = styles;
    return (
        <div className={form}>
            <div className={col}>
                <div className={formInfoPair}>
                    <h4>People: </h4>
                    <Counter count={count} updateCount={updateCount} />
                </div>
                <div className={formInfoPair}>
                    <h4>Start Date: </h4>
                    {/* <DatePicker date={date} changeDate={changeDate} /> */}
                </div>
            </div>
            <div className={col} />
        </div>
    )
}

function Counter({ count, updateCount }) {
    const LIMIT = 10;
    const increment = () => {
        updateCount(prev => prev + 1 > LIMIT ? 0 : prev + 1);
    }

    const decrement = () => {
        updateCount(prev => prev - 1 < 0 ? LIMIT : prev - 1);
    }
    const {
        counter
    } = styles;
    return (
        <div className={counter}>
            <p onClick={decrement}>-</p>
            <p>{count}</p>
            <p onClick={increment}>+</p>
        </div>
    )
}

// WORK IN PROGRESS
// const DatePicker = ({ date, changeDate }) => {
//     const longMonths = ["JAN", "MAR", "MAY", "JUL", "AUG", "OCT", "DEC"];
//     const shortMonths = ["APR", "JUN", "SEP", "NOV"];
//     const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//     const setDate = (type, val) => {
//         changeDate(prev => ({ ...prev, [type]: val }));
//     }

//     const getDays = () => {
//         if(date.month)
//     }
//     const {
//         datePicker
//     } = styles;
//     const days = setDays();
//     const renderDateOptions = Array(days).keys().map()
//     return (
//         <div className={datePicker}>
//             <select value={toString(date.day)} onChange={(e) => setDate("day", e.target.value)}>
                
//             </select>
//         </div>
//     )
// }