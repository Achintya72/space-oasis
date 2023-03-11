import styles from "./navStyles.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import Icon from "../Icon";
import { useState } from "react";
import getClasses from "../../pages/api/_getClasses";

export default function Navbar() {
    const router = useRouter();
    const [showLinks, changeShowLinks] = useState(false);
    return (
        <nav className={styles.navbar}>
            <div className={styles.heading}>
                <div>
                    <h6 onClick={() => router.push("/")}>SpaceOasis</h6>
                </div>
                {showLinks ?
                    <div className={styles.menuIcon} onClick={() => changeShowLinks(false)}>
                        <Icon name="close" size={30} />
                    </div>
                    :
                    <div className={styles.menuIcon} onClick={() => changeShowLinks(true)}>
                        <Icon name="menu" size={30} />
                    </div>
                }
            </div>
            <div className={getClasses(styles.navLinks, showLinks ? styles.navLinksShow : styles.navLinksHide)}>
                <Link href="/book">Book</Link>
                <Link href="/safety">Safety</Link>
                <Link href="/training">Training</Link>
                <Link href="/sources">Sources</Link>
            </div>
        </nav>
    )
}