import { Icon } from "../../../components";
import styles from "./styles.module.css";
import data from "./content.json"
import { useRouter } from "next/router";

export default function Details(props) {
    const router = useRouter();
    const packageName = router.query.package;
    const features = data[packageName]["details"]

    return (
        <div className={styles.detailCardGrid}>
            {features != undefined && features.map((f, i) => (
                <div key={i} className={styles.detailCard}>
                    <div>
                        <Icon name={f.icon} size={24} />
                        <h4>{f.title}</h4>
                    </div>
                    <p>{f.description}</p>
                </div>
            ))}
        </div>
    )
}