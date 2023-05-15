import styles from "./navStyles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "../Icon";
import { useState, useContext } from "react";
import getClasses from "../../pages/api/_getClasses";
import { UserContext } from "../../pages/api/_userContext";

export default function Navbar() {
    const { auth } = useContext(UserContext);
    const router = useRouter();
    const [showLinks, changeShowLinks] = useState(false);
    return (
        <nav className={styles.navbar}>
            <div className={styles.heading}>
                <div>
                    <h6 onClick={() => router.push("/")}>SpaceOasis</h6>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#fff" }}>
                    {showLinks ? (
                        <div
                            className={styles.menuIcon}
                            onClick={() => changeShowLinks(false)}
                        >
                            <Icon name="close" size={20} />
                        </div>
                    ) : (
                        <div
                            className={styles.menuIcon}
                            onClick={() => changeShowLinks(true)}
                        >
                            <Icon name="menu" size={20} />
                        </div>
                    )}
                </div>
            </div>
            <div
                className={getClasses(
                    styles.navLinks,
                    showLinks ? styles.navLinksShow : styles.navLinksHide
                )}
            >
                <Link href="/packages">Packages</Link>
                <Link href="/vehicles">Vehicles</Link>
                <Link href="/safety">Safety</Link>
                <Link href="/training">Training</Link>
                <Link href="/about">About</Link>
                <Link href="/sources">Sources</Link>
                {auth ?
                    <>
                        <Link href="/dashboard">Dashboard</Link>
                        <Link href="">Sign Out</Link>
                    </>
                    :
                    <Link href="/signin">Sign In</Link>
                }
            </div>
        </nav>
    );
}
