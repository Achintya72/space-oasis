import styles from "./styles.module.css"
import Image from "next/image";
import { useRouter } from "next/router";
import getClasses from "../api/_getClasses";
import useGetVisibility from "../api/_useGetVisibility";


const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
};
export default function PackageCard({ img, title, description, price, location, stars, changeCustom }) {
    const [show, ref] = useGetVisibility(options);
    let router = useRouter();

    const redirect = () => {
        if (title == "Custom") {
            changeCustom(true);
            return;
        }
        router.push(`/book/${title}`)
    }

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
        <div className={getClasses(styles.card, show ? styles.show : styles.hide)} onClick={redirect} ref={ref}>
            <div className={styles.cardImg}>
                <Image
                    src={img}
                    fill
                    alt={description}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <strong>{title}</strong> <br />
                    <div style={{ color: "#959595" }}>{location}</div>
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