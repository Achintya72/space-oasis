import styles from "./safetyStyles.module.css";
import Image from "next/image";
import { Icon } from "../../components";

export default function Statistic({ number, ndesc, description, icon }) {
    return (
        <div className={styles.statisticCard}>
            <div className={styles.statistic}>
                <div>
                    <h3>{number}</h3>
                    <p>{ndesc}</p>
                </div>
                <Icon name={icon} size={20} />
            </div>
            <p>{description}</p>
        </div>
    )
}