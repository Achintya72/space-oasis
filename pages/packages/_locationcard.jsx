import styles from "./styles.module.css"
import Image from "next/image";
import { Icon } from "../../components";

export default function LocationCard({ img, title, time, description, price, active, onClick }) {

    const getStyle = () => {
        if (active) {
            return "activeLocationCard";
        }
        else {
            return "locationCard";
        }
    }

    return (
        <div onClick={onClick} className={styles[getStyle()]}>
            <div className={styles.cardImg}>
                <Image
                    src={img}
                    fill
                    alt={description}
                />
            </div>
            <div className={styles.locationText}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h4>{title}</h4>
                    <p className={active ? styles.selectedText : null}>{active ? "Selected" : "Click to Select"}</p>
                </div>
                <p>{description}</p>
                <div className={styles.iconPairs}>
                    <div className={styles.pair}>
                        <Icon name="money" size={20} />
                        <p>{price}</p>
                    </div>
                    <div className={styles.pair}>
                        <Icon name="time" size={20} />
                        <p>{time}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}