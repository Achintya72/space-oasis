import styles from "./navStyles.module.css"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Navbar() {
    const router = useRouter();
    return (
        <nav className={styles.navbar}>
            <h6 onClick={() => router.push("/")}>SpaceOasis</h6>
            <div className={styles.navLinks}>
                <Link href="/book">Book</Link>
                <Link href="/safety">Safety</Link>
                <Link href="/training">Training</Link>
                <Link href="/sources">Sources</Link>
            </div>
        </nav>
    )
}