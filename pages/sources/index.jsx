import Head from "next/head";
import Wrapper from "../../components/Wrapper";
import { Navbar, Icon } from "../../components";
import data from "./content.json";
import Citations from "./_CitationCard";
import styles from "./styles.module.css";

export default function Sources() {
    const keys = Object.keys(data);

    return (
        <>
            <Wrapper>
                <Navbar />
                <h1>Sources</h1>
                <div className={styles["grid"]}>
                    {keys.map((name, index) => (
                        <Citations page={name} key={index} />
                    ))}
                </div>
            </Wrapper>
        </>
    );
}
