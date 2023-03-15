import styles from "./styles.module.css";
import Image from "next/image";
import { Icon } from "../../components";
import getClasses from "../api/_getClasses";
export default function ActivityCard(props) {
    const {
        title,
        age,
        description,
        img,
        alt,
        cost,
        time,
        active: a,
        onClick
    } = props;

    const {
        activityImg,
        overlay,
        cardHeader,
        iconPairs,
        pair,
        activityCard,
        active,
        inactive
    } = styles;

    const activeClass = a ? active : inactive;
    return (
        <div onClick={onClick} className={getClasses(activityCard, activeClass)}>
            <div className={activityImg}>
                <Image src={img} alt={alt} fill placeholder="blur" blurDataURL="/static/Placeholder.jpg" />
            </div>
            <div className={overlay}>
                <div className={cardHeader}>
                    <h3>{title}</h3>
                    <h3>{age}</h3>
                </div>
                <p>{description}</p>
            </div>
            <div className={iconPairs}>
                <div className={pair}>
                    <Icon name="money" size={20} />
                    <p>{cost} USD</p>
                </div>
                <div className={pair}>
                    <Icon name="time" size={20} />
                    <p>{time}</p>
                </div>
            </div>
        </div>
    )
}