import styles from "./styles.module.css"
import Image from "next/image";

export default function PackageCard({ img, title, description, price, location, stars }) {
    const getStars = () => {
        var s = [];
        for (var i = 0; i < stars; i++) {
            s.push("/static/coloredStar.svg")
        }
        for (var i = 0; i < 5 - stars; i++) {
            s.push("/static/uncoloredStar.svg")
        }
        return s;
    }

    const starsList = getStars();

    return (
        <div className={styles.card}>
            <Image className={styles.cardImg} src={img} width={500} height={500} alt={description} />
            <div style={{ display: "flex" }}>
                <div>
                    <strong>{title}</strong> <br />
                    <div style={{color: "#717171"}}>{location}</div>
                </div>
                <h3 className={styles.price}>
                    ${price}
                </h3>
            </div>
            {description}
            <div style={{ display: "flex", gap: "10px" }}>
                {starsList.map((value, index) => (
                    <Image key={`star${index}`} className={styles.star} src={value} width={25} height={25} alt="A colored star" />
                ))}
            </div>
        </div>
    )
}