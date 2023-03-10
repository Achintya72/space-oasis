import { Icon } from "../../components";
import styles from "./styles.module.css";
import data from "./content.json"

export default function Citations({ page }) {

    const enclosing = data?.[page] ?? undefined;
    const icon = enclosing?.icon ?? "money";
    const citations = enclosing?.citations ?? undefined;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Icon name={icon} size="16px" />
                <h3>{((page?.charAt(0)?.toUpperCase()) ?? "") + (page?.slice(1) ?? "") + " Page"}</h3>
            </div>

            {citations != undefined && citations.map((citation, i) => (
                <p key={`citation-${i}`} className={styles.citation}>{citation.citation}</p>
            ))}
        </div>
    );
}