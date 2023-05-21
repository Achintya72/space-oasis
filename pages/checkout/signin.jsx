import { Wrapper, Navbar, Button } from "../../components"
import styles from "./signin.module.css";
import { useState, useContext } from "react";
import { UserContext } from "../api/_userContext";
import getClasses from "../api/_getClasses";
import { useRouter } from "next/router";

const CREDENTIALS = {
    email: "judge@webmaster.com",
    password: "TSA2023!!"
}

export default function SignIn() {
    const { changeAuth } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [details, changeDetails] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();

    const handleChange = ({ target: { name, value } }) => {
        setError(null);
        changeDetails(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (details.email == CREDENTIALS.email && details.password == CREDENTIALS.password) {
            changeAuth(true);
            router.push("/checkout");

        }
        else {
            setError("Incorrect Email or Password")
        }
    }

    return (
        <div className={styles.signIn}>
            <Wrapper styles={styles.container}>
                <Navbar />
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1>Sign in</h1>
                    <div className={styles.formLabelPair}>
                        <label htmlFor="email" className={"caption"}>EMAIL</label>
                        <input
                            name="email"
                            type="email"
                            onChange={handleChange}
                            className={styles.input}
                            value={details.email}
                            placeholder="Ex: jdoe@example.com"
                            autoComplete="email"
                            required

                        />
                    </div>
                    <div className={styles.formLabelPair}>
                        <label htmlFor="password" className={'caption'}>PASSWORD</label>
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            className={styles.input}
                            value={details.password}
                            placeholder="********"
                            autoComplete="password"
                            required

                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <Button>Sign In</Button>
                    <div>
                        <p>TSA Judges:</p>
                        <p>Email: {CREDENTIALS.email}</p>
                        <p>Password: {CREDENTIALS.password}</p>
                    </div>
                </form>
            </Wrapper>
        </div>
    )
}