import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "../../components";
import { Button } from "../../components";
import styles from "./styles.module.css";

export default function DestinationCard(props) {
    const {
        index,
        title,
        description,
        image,
        alt,
        active: a,
        price,
        duration,
        updateParent
    } = props;
    const [active, changeActive] = useState(a);

    useEffect(() => {
        changeActive(a);
    }, [a]);

    const handleClick = (e) => {
        updateParent(index, !active);
        changeActive(prev => !prev);
    }

    return (
        <div onClick={handleClick} className={styles.destinationCard}>
            <div className={styles.destinationImage}>
                <Image
                    src={image}
                    alt={alt}
                    fill
                />
            </div>
            <div className={styles.overlay}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className={styles.iconPairs}>
                    <div className={styles.iconInfo}>
                        <Icon name="money" size={24} />
                        <p className="button">{price}</p>
                    </div>
                    <div className={styles.iconInfo}>
                        <Icon name="time" size={24} />
                        <p className="button">{duration}</p>
                    </div>
                </div>
                <Button variant={active ? "secondary" : "primary"}>{active ? "Selected" : "Select"}</Button>
            </div>
        </div>
    )
}