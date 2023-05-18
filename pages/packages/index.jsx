import Head from 'next/head';
import Image from 'next/image';
import styles from './styles.module.css';
import { Navbar, Button, Footer, Icon } from "../../components";
import Wrapper from "../../components/Wrapper/index";
import PackageCard from "./_packagecard";
import data from "./content.json";
import { useState } from 'react';
import QuoteForm from './_quoteForm';
import useGetVisibility from "../api/_useGetVisibility";
import { useRouter } from 'next/router';

export default function Packages() {
    const router = useRouter();
    const [index, changeIndex] = useState(1);
    const planet = data.locations[index];
    return (
        <>
            <Head>
                <title>Packages</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Wrapper styles={styles.packagesRoot}>
                <Navbar />
                <div className={styles.bgOverlay} />
                <section className={styles.existing}>
                    <div className={styles.stats}>
                        <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h1>{planet.name}</h1>
                            <div style={{ display: "flex", gap: "10px" }}>
                                {index == 0 ? <div style={{ width: "30px", height: "30px" }} /> :
                                    <Icon name="leftButton" size={30} onClick={() => changeIndex(prev => prev - 1)} />
                                }
                                {index == 2 ? <div style={{ width: "30px", height: "30px" }} /> :
                                    <Icon name="rightButton" size={30} onClick={() => changeIndex(prev => prev + 1)} />
                                }
                            </div>
                        </div>
                        <div className={styles.stat}>
                            <p>Gravity</p>
                            <h2>{planet.info.gravity} m&sup2;/s</h2>
                        </div>
                        <div className={styles.stat}>
                            <p>Day Length</p>
                            <h2>{planet.info.day_length} Earth Days</h2>
                        </div>
                        <div className={styles.stat}>
                            <p>Avg. Distance from Earth</p>
                            <h2>{planet.info.distance.toLocaleString()} miles</h2>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <div className={index == 0 ? styles.on : styles.off} />
                            <div className={index == 1 ? styles.on : styles.off} />
                            <div className={index == 2 ? styles.on : styles.off} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <p><strong>Offered Trips</strong></p>
                        <div style={{ display: "flex", gap: "20px" }}>
                            {planet.packages.map(packageI => {
                                let p = data.packages[packageI];
                                return (
                                    <div key={p.title} className={styles.package} onClick={() => router.push(`/packages/${p.title}`)}>
                                        <Image src={p.img} alt={p.alt} fill />
                                        <div className={styles.overlay}>
                                            <Icon size={24} name="right" />
                                            <div>
                                                <h4 >{p.title}</h4>
                                                <p className={styles.description}>{p.short_description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
                <Image className={styles.bgImg} src={planet.img} alt={planet.name} fill />
            </Wrapper>
            <Footer />
        </>
    )
}