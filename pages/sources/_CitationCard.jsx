import { Icon } from "../../components";
import styles from "./styles.module.css";
import data from "./content.json"

export default function Citations({ page }) {

    const enclosing = data?.[page] ?? undefined;
    const icon = enclosing?.icon ?? "money";
    const citations = enclosing?.citations?.sort() ?? undefined;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3>{((page?.charAt(0)?.toUpperCase()) ?? "") + (page?.slice(1) ?? "") + " Page"}</h3>
            </div>

            {citations != undefined && citations.map((citation, i) => (
                <p key={`citation-${i}`} className={styles.citation}>{citation}</p>
            ))}
        </div>
    );
}