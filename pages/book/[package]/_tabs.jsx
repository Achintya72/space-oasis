import getClasses from "../../api/_getClasses";
import styles from "./styles.module.css";

export default function Tabs({ tab, changeTab, options }) {
    return (
        <div className={styles.options}>
            {options != undefined && options.map(option => (
                <div
                    className={getClasses(styles.option, tab === option && styles.active)}
                    key={option}
                    onClick={() => changeTab(option)}

                >
                    <h4>{option}</h4>
                </div>
            ))}
        </div>
    )
}