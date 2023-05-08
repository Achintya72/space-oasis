import styles from "./styles.module.css"
import Image from "next/image";
import { useRouter } from "next/router";
import getClasses from "../api/_getClasses";
import useGetVisibility from "../api/_useGetVisibility";
import Button from "../../components/Button";
import Icon from "../../components/Icon";


const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
};
export default function PackageCard({ img, title, description, price, location, stars, changeCustom }) {
    const [show, ref] = useGetVisibility(options);
    let router = useRouter();

    const redirect = () => {
        router.push(`/packages/${title}`)
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
        <div className={getClasses(styles.card, show ? styles.show : styles.hide)} ref={ref}>
            <div className={styles.cardImg}>
                <Image
                    src={img}
                    fill
                    placeholder="blur"
                    blurDataURL="/static/Fallback.jpg"
                    alt={description}
                />
            </div>
            <div style={{ display: "flex", flex: "1", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <strong>{title}</strong> <br />
                            <div style={{ color: "#959595", margin: "5px 0px", display: "flex", alignItems: "center", gap: "5px" }}><Icon size={16} name="location" />  {location}</div>
                        </div>
                        <h3 className={styles.price}>
                            ~${price != undefined && price.toLocaleString()}*
                        </h3>
                    </div>

                    <p>{description}
                    </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "1px" }}>
                        {starsList.map((value, index) => (
                            <Image key={`star${index}`} className={styles.star} src={value} width={20} height={20} alt="A colored star" />
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                            background="dark"
                            corners="sharp"
                            onClick={redirect}
                        >View Details</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}