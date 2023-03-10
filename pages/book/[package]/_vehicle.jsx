import styles from "./styles.module.css";

export default function VehicleDetails({ title, numbers, description, img, reverse }) {
    return (
        <div className={reverse ? styles.vehicle_reverse : styles.vehicle}>
            <div className={styles.qualInfo}>
                <h2>
                    Vehicle: {title}
                </h2>
                <div className={styles.priceInfo}>
                    {numbers != undefined && numbers.map((value, index) => (
                        <div className={styles["price"]} key={`number-${index}`}>
                            <p>
                                {value.name}
                            </p>
                            <p>
                                {value.number}
                            </p>
                        </div>
                    ))}
                </div>
                <p>{description}</p>
            </div>
            <div className={styles.galleryImg} >
                {img != undefined && <img src={img} alt={"Img of " + title} style={{ width: "100%", height: "auto" }} />}
            </div >
        </div>
    )
}