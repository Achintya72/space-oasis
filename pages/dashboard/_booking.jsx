import styles from "./dashboardStyles.module.css";
import Image from "next/image";
import { Icon, Counter, Dropdown, Button } from "../../components";
import { useContext } from "react";
import { UserContext } from "../api/_userContext";
import DateModal from "./_dateModal";

export default function Booking({ booking, i }) {
    const { user, changeUser } = useContext(UserContext);

    const options = ["Veg.", "Hal.", "Kos.", "Reg."];
    const handleChange = (d) => {
        changeUser(prev => {
            prev.bookings[i].arrival = new Date(d.valueOf() - prev.bookings[i].arrival.valueOf() + prev.bookings[i].arrival.valueOf());
            prev.bookings[i].departure = d;
            return { ...prev };
        })
    }

    const removeBooking = () => {
        changeUser(prev => {
            const newBookings = prev.bookings.filter((booking, index) => index != i);
            prev.bookings = newBookings;
            return { ...prev };
        })
    }
    return (
        <div className={styles.booking} key={booking.departure.toISOString()}>
            <div className={styles.picAndTime}>
                <Image src={`/static/packages/${booking.img}`} alt={booking.type} fill />
                <div className={styles.overlay}>
                    <a>{booking.type}</a>
                    <div className={styles.timings}>
                        <div>
                            <Icon name="depart" size={24} />
                            <p>{booking.departure.toLocaleString().split(",")[0]}</p>
                        </div>
                        <div>
                            <Icon name="depart" size={24} />
                            <p>{booking.arrival.toLocaleString().split(",")[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.editable}>
                <div className={styles.labelInput}>
                    <p className="caption">PEOPLE</p>
                    <Counter count={booking.passengers} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className={styles.labelInput}>
                        <p className="caption">MEAL</p>
                        <Dropdown options={options} selected={options.indexOf(user.meal)} />
                    </div>
                    <div className={styles.buttons}>
                        <DateModal startDate={booking.departure} endDate={new Date(booking.departure.getFullYear() + 2, booking.departure.getMonth(), booking.departure.getDate())} setDate={handleChange} />
                        <Button hasIcon background="light" onClick={removeBooking}>
                            <Icon name="close" size={20} />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}