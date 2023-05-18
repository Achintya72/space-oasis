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

    const handleMealChange = (val) => {
        changeUser(prev => {
            prev.bookings[i].meal = options[val];
            return { ...prev };
        })
    }

    return (
        <div className={styles.booking} key={(booking?.departure ?? new Date()).toISOString()}>
            <div className={styles.picAndTime}>
                <Image src={`/static/packages/${booking?.img}`} alt={booking?.type} fill />
                <div className={styles.overlay}>
                    <a>{booking?.type}</a>
                    <div className={styles.timings}>
                        <div>
                            <Icon name="depart" size={24} />
                            <p>{(booking?.departure ?? new Date()).toLocaleString().split(",")[0]}</p>
                        </div>
                        <div>
                            <Icon name="arrive" size={24} />
                            <p>{(booking?.arrival ?? new Date()).toLocaleString().split(",")[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.editable} style={{ borderRadius: "0px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className={styles.labelInput}>
                        <p className="caption">MEAL</p>
                        <Dropdown options={options} selected={options.indexOf(booking?.meal ?? "Veg.")} changeSelected={handleMealChange} />
                    </div>
                    <div className={styles.buttons}>
                        <DateModal startDate={booking?.departure ?? new Date()} endDate={new Date((booking?.departure ?? new Date()).getFullYear() + 2, (booking?.departure ?? new Date()).getMonth(), (booking?.departure ?? new Date()).getDate())} setDate={handleChange} />
                        <Button hasIcon background="light" onClick={removeBooking}>
                            <Icon name="close" size={20} />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}