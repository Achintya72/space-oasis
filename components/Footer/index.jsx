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
                    </div>
                    <div className={styles.about}>
                        <p><strong>About:</strong></p>
                        <p>To ensure a seamless, fast, and optimized user experience, this website uses Vercel&apos;s NextJS framework,
                            a ReactJS technology as the coding technology. However, the design system and brand themes are all
                            original and specially designed with the user&apos;s experience and accessibilty in mind.
                        </p>
                    </div>
                </div>
            </Wrapper>
        </footer>
    )
}