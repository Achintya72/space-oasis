import { useContext } from "react"
import styles from "./dashboardStyles.module.css"
import { UserContext } from "../api/_userContext"

export default function Mileage() {
    const { user } = useContext(UserContext);
    return (
        <div className={styles.miles}>
            <h4>Travel Miles</h4>
            <h2>{user.miles.toLocaleString()}</h2>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span>~${Math.round(user.miles * 100 / 30000) / 100}</span>
            </div>
        </div>
    )
}