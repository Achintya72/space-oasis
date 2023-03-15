import styles from "./shipSection.module.css";
import Image from "next/image";

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
                            <h4>{feature.title}</h4>
                        </div>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
            <div className={styles.shipImg}>
                <Image src={img} alt={alt} fill placeholder="blur" blurDataURL="/static/Placeholder.jpg" />
            </div>
        </div>
    )
}