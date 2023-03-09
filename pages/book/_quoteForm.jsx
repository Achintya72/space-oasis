import { useState } from "react";
import styles from "./quoteForm.module.css";
import getClasses from "../api/_getClasses";

export default function QuoteForm() {
    const [count, updateCount] = useState(0);
    const [startDate, changeStartDate] = useState({ day: 1, month: "JUL", year: 2023 });
    const [endDate, changeEndDate] = useState({ day: 1, month: "JUL", year: 2023 });
    const [diet, changeDiet] = useState(null);
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
                    <DatePicker date={startDate} changeDate={changeStartDate}/>
                </div>
                <div className={formInfoPair}>
                    <h4>End Date: </h4>
                    <DatePicker date={endDate} changeDate={changeEndDate}/>
                </div>
                <div>
                    <h4>Diet: </h4>
                    <DietPicker diet={diet} changeDiet={changeDiet}/>
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

const DatePicker = ({ date, changeDate}) => {
    
    const longMonths = ["JAN", "MAR", "MAY", "JUL", "AUG", "OCT", "DEC"];
    const shortMonths = ["APR", "JUN", "SEP", "NOV"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    console.log(date);
    const getDays = () => {
        if(longMonths.includes(date.month)) {
            return 31;
        }
        else if(shortMonths.includes(date.month)) {
            return 30;
        }
        else {
            if(date.year % 4 == 0 && (date.year % 100 != 0 || date.year % 400 == 0)) {
                return 29;
            }
            return 28;
        }
    }
    const {
        datePicker
    } = styles;
    const days = getDays();
    const renderDateOptions = [...Array(days).keys()].map(key => (
        <option key={key}>{key+1}</option>
    ))
    const renderMonthOptions = months.map(month => (
        <option key={month}>{month}</option>
    ))
    const today = new Date();
    const renderYearOptions = [...Array(100).keys()].map(key => (
        <option key={today.getFullYear() + key}>{today.getFullYear() + key}</option>    
    ))
    return (
        <div className={datePicker}>
            <select value={date.day} onChange={(e) => changeDate(prev => ({...prev, day: e.target.value}))}>
                {renderDateOptions}
            </select>
            <select value={date.month} onChange={(e) => changeDate(prev => ({ ...prev, month: e.target.value}))}>
                {renderMonthOptions}
            </select>
            <select value={date.year} onChange={(e) => changeDate(prev => ({ ...prev, year: e.target.value}))}>
                {renderYearOptions}    
            </select>
        </div>
    )
}

const DietPicker = ({ diet, changeDiet }) => {
    const {
        option, active, inactive, allOptions
    } = styles;
    
    const dietOptions = ["None", "Vegan", "Vegetarian", "Halal",  "Lactose Intolerant", "Gluten-free" ];
    const renderDietOptions = dietOptions.map(o => (
        <div 
        key={o} 
        className={getClasses(option, diet === o ? active : inactive) }
        onClick={() => changeDiet(o)}>
            <p>{o}</p>
        </div>
    ))
    return (
        <div className={allOptions}>
            {renderDietOptions}
        </div>
    )
}