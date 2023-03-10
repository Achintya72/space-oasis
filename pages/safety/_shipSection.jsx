import styles from "./shipSection.module.css";
import Image from "next/image";
import { Icon } from "../../components";

export default function ShipSection(props) {
    const {
        img,
        alt,
        name,
        features
    } = props;

    return (
        <div className={styles.shipSection}>
            <div className={styles.shipFeatures}>
                <h3>Vehicle: {name}</h3>
                {features != undefined && features.map((feature, i) => (
                    <div className={styles.feature} key={i}>
                        <div className={styles.featureHeader}>
                            <Icon name={feature.icon} size={30} />
                            <h4>{feature.title}</h4>
                        </div>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
            <div className={styles.shipImg}>
                <Image src={img} alt={alt} fill />
            </div>
        </div>
    )
}