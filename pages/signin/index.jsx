import { Wrapper, Navbar } from "../../components"
import styles from "./signin.module.css";
export default function SignIn() {
    return (
        <div className={styles.signIn}>
            <Wrapper>
                <Navbar />
                <h1>Sign in</h1>
            </Wrapper>
        </div>
    )
}