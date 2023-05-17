import { useState } from "react"
import { Dropdown, Icon, Button } from "../../components";
import getClasses from "../api/_getClasses";
import styles from "./dashboardStyles.module.css"

export default function DateModal({ setDate, startDate, endDate }) {
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
    const [open, setOpen] = useState(false);
    const [day, setDay] = useState(startDate.getDate() - 1);
    const [month, setMonth] = useState(startDate.getMonth());
    const [year, setYear] = useState(0);

    const date = new Date(year + startDate.getFullYear(), month, day + 1);


    const handleSubmit = () => {
        setDate(date);
        setOpen(false);
    }
    return (
        <div>
            <Button hasIcon background="light" onClick={() => setOpen(true)}><Icon name="calendar" size={20} /></Button>
            <div className={getClasses(styles.modal, open ? styles.open : styles.close)}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <h4>Select a Date</h4>
                    <Button hasIcon onClick={() => setOpen(false)}>
                        <Icon name="close" size={24} />
                    </Button>
                </div>
                <div style={{
                    display: "flex",
                    gap: "10px"
                }}>
                    <Dropdown options={getDays(date)} selected={day} changeSelected={setDay} />
                    <Dropdown options={months} selected={month} changeSelected={setMonth} />
                    <Dropdown options={getYears()} selected={year} changeSelected={setYear} />
                </div>
                {(date.valueOf() <= startDate.valueOf() || date.valueOf() >= endDate.valueOf()) ?
                    <p>Date must be between than {startDate.toLocaleString().split(",")[0]} and {endDate.toLocaleString().split(",")[0]}</p>
                    :
                    <Button onClick={handleSubmit}>Submit</Button>
                }

            </div>
        </div>
    )
}