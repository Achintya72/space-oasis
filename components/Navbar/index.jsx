import styles from "./navStyles.module.css"
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <h6>SpaceOasis</h6>
            <div className={styles.navLinks}>
                <Link href="/book">Book</Link>
                <Link href="/safety">Safety</Link>
                <Link href="/training">Training</Link>
                <Link href="/sources">Sources</Link>
            </div>
        </nav>
    )
}