import { Button } from "../../components";
import Image from "next/image";
import styles from "./dashboardStyles.module.css"
import { useContext } from "react";
import { UserContext } from "../api/_userContext";

export default function Details() {
    const { user } = useContext(UserContext);
    return (
        <div className={styles.info}>
            <div className={styles.header}>
                <h4>Details</h4>
                <Button corners="rounded" background="light">Edit</Button>
            </div>
            <div className={styles.content}>
                <div className={styles.name}>
                    <Image src={`/static/Testimonials/${user.img}`}
                        width={100}
                        height={100}
                        alt="The User's Profile Photo"
                        className={styles.avatar}
                    />
                    <p>{user.name}</p>
                </div>
                <div className={styles.personalInfo}>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.bday}</p>
                </div>
            </div>
        </div>
    )
}