import { Icon } from "../../components";
import styles from "./styles.module.css";
import data from "./content.json"

export default function Citations({ page }) {

    const enclosing = data[page];
    const icon = enclosing.icon;
    const citations = enclosing.citations;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Icon name={icon} size="16px" />
                <h3>{page.charAt(0).toUpperCase() + page.slice(1) + " Page"}</h3>
            </div>

            {citations.map((citation, i) => (
                <p key={`citation-${i}`} className={styles.citation}>{citation.citation}</p>
            ))}
        </div>
    );
}