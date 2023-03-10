import { Icon, Navbar } from "../../components";
import Wrapper from "../../components/Wrapper";
import getClasses from "../api/_getClasses";
import data from "./content.json";
import styles from "./safetyStyles.module.css";
import { useState } from "react";
import Tabs from "../book/[package]/_tabs";
import ShipSection from "./_shipSection";
import Statistic from "./_statistic";

const options = Object.keys(data["vehicles"]);
export default function Safety(props) {
    const [tab, changeTab] = useState(options[0]);
    const vehicleData = data["vehicles"];
    return (
        <Wrapper>
            <Navbar />
            <h1>Safety Information</h1>
            <h2 style={{ margin: "1.5rem 0" }}>Biological Risks</h2>
            <div className={styles.riskGrid}>
                {data["risks"] != undefined && data["risks"].map((value, index) => (
                    <RiskCard
                        key={`risk-${index}`}
                        {...value}
                    />
                ))}
            </div>
            <h2 style={{ margin: "1.5rem 0" }}>Spacecraft Features</h2>
            <Tabs tab={tab} changeTab={changeTab} options={options} />
            <ShipSection
                {...vehicleData[tab]}
                name={tab}
            />
            <h2>Statistics</h2>
            <div className={styles.statisticGrid}>
                {data["statistics"].map((value, index) => (
                    <Statistic key={`statistic-${index}`} {...value} />
                ))}
            </div>
        </Wrapper>
    )
}

function RiskCard(props) {
    const {
        icon,
        title,
        description,
        solution,
        classes
    } = props;
    return (
        <div className={getClasses(styles.riskCard, classes)}>
            <Icon name={icon} size={40} />
            <h4>{title}</h4>
            <p>{description}</p>
            <div className={styles.solution}>
                <span>Solution:</span>
                <p>{solution}</p>
            </div>
        </div>
    )
}