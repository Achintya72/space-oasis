import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css"
import { Icon } from "../../../components";
export default function Gallery({ images }) {
    const [current, changeCurrent] = useState(0);
    return (
        <div className={styles.galleryImg}>
            <div className={styles.controls}>
                {current == 0 ? <div style={{ width: "30px", height: "30px" }} /> :
                    <Icon name="leftButton" size={30} onClick={() => changeCurrent(prev => prev - 1)} />
                }
                {current == images.length - 1 ? <div style={{ width: "30px", height: "30px" }} /> :
                    <Icon name="rightButton" size={30} onClick={() => changeCurrent(prev => prev + 1)} />
                }
            </div>
            <Image src={images[current].src} alt={images[current.alt]} fill />
        </div>
    )
}