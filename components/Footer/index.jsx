import Link from "next/link";
import styles from "./FooterStyles.module.css";
import Wrapper from "../Wrapper";
export default function Footer() {
    return (
        <footer className={styles.footerRoot}>
            <Wrapper>
                <div className={styles.footer}>
                    <div>
                        <span className={styles.branding}>SpaceOasis</span>
                        <div>Copyright &copy; SpaceOasis 2023</div>
                    </div>
                    <div className={styles.quicklinks}>
                        <p><strong>Quick Links: </strong></p>
                        <Link href="/packages">Packages</Link>
                        <Link href="/training">Training</Link>
                        <Link href="/safety">Safety</Link>
                        <Link href="/sources">Sources</Link>
                        <Link href="/about">About</Link>
                    </div>

                </div>
            </Wrapper>
        </footer>
    )
}