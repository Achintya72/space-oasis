import { useState } from "react"
import { Dropdown, Icon, Button, DatePicker } from "../../components";
import getClasses from "../api/_getClasses";
import styles from "./dashboardStyles.module.css"

export default function DateModal({ setDate, startDate = new Date(), endDate = new Date() }) {
    const [open, setOpen] = useState(false);
    const [date, changeDate] = useState(startDate);
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
                <DatePicker startDate={startDate} endDate={endDate} setDate={changeDate} />
                {(date.valueOf() <= startDate.valueOf() || date.valueOf() >= endDate.valueOf()) ?
                    <p>Date must be between than {startDate.toLocaleString().split(",")[0]} and {endDate.toLocaleString().split(",")[0]}</p>
                    :
                    <Button onClick={handleSubmit}>Submit</Button>
                }

            </div>
        </div>
    )
}