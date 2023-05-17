import Head from "next/head";
import { Footer, Icon, Navbar } from "../../../components";
import Wrapper from "../../../components/Wrapper";
import getClasses from '../../api/_getClasses';
import styles from "../vehicles.module.css";
import { useState } from "react";
import content from "../content.json";
import { useRouter } from "next/router";

export default function Vehicle(props) {
    const vehicles = content['vehicles'];
    const router = useRouter();

    const matches = (v) => {
        return router.query.vehicle == v.title;
    }

    const vehicle = vehicles.find(matches);

    if (vehicle) {
        return (
            <>
                <section id="spaceship" className={getClasses(styles.spaceship, styles[vehicle.css])}>
                    <Wrapper>
                        <Navbar />
                        <div className={styles.spaceshipText}>
                            <h5>{vehicle.company}</h5>
                            <h1>{vehicle.title}</h1>
                        </div>
                    </Wrapper>
                </section >
                <section id="Data" style={{ "width": "100%" }}>
                    <Wrapper>
                        <div className={styles.dataGrid}>
                            {vehicle.numbers.map((datapoint, index) => (
                                <DataPoint key={index} name={datapoint.name} number={datapoint.number} />
                            ))}
                        </div>
                    </Wrapper>
                </section >
            </>
        )
    }
    else {
        return (
            <>
                <section id="spaceship" className={styles.spaceship}>
                    <Wrapper>
                        <Navbar />
                        <h1>404: Page Not Found</h1>
                    </Wrapper>
                </section >
            </>
        )
    }
}

function DataPoint({ name, number }) {
    return (
        <div className={styles.dataPoint}>
            <h4>{name}</h4>
            <h2>{number}</h2>
        </div>
    )
}