import Head from "next/head";
import Wrapper from "../../components/Wrapper";
import { Navbar, Icon, Footer } from "../../components";
import data from "./content.json";
import Citations from "./_CitationCard";
import styles from "./styles.module.css";
import Link from "next/link";
export default function Sources() {
    const keys = Object.keys(data);

    return (
        <>
            <Head>
                <title>Sources</title>
                <meta name="description" content="Website for buying tourist packages to Orbit, Moon, and Mars" />
                <link rel="icon" href="/spaceoasis.svg" />
            </Head>
            <Wrapper>
                <Navbar />
                <h1>Sources</h1>
                <div className={styles.links}>
                    <Link href="/static/CopyrightChecklist.pdf" locale={false} target="_blank">Copyright Checklist</Link>
                    <Link href="/static/SignedWorkLog.pdf" locale={false} target="_blank">Signed Plan of Work Log</Link>
                </div>
                <div className={styles["grid"]}>
                    {keys.map((name, index) => (
                        <Citations page={name} key={index} />
                    ))}
                </div>
            </Wrapper>
            <Footer />
        </>
    );
}
