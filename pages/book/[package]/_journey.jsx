import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import getClasses from "../../api/_getClasses";
import useGetVisibility from "../../api/_useGetVisibility";
import data from "./content.json";

export default function Journey({ packageName }) {
    const [currentStop, changeCurrentStop] = useState(0);
    const steps = data[packageName]["journey"];
    return (
        <div className={styles.journeyContainer}>
            <div className={styles.journeySteps} id="steps">
                {steps.map((step, i) => {
                    const stateStyle = i == currentStop ? styles.activeStep : styles.inactiveStep;
                    return (
                        <Step
                            key={i}
                            index={i}
                            changeCurrentStop={changeCurrentStop}
                            stateStyle={stateStyle}
                            step={step}
                        />
                    )
                })}
            </div>
            <div className={styles.journeyImg}>
                <Image
                    src={steps[currentStop].img}
                    alt={steps[currentStop].alt}
                    fill
                />
            </div>
        </div>
    )
}

const Step = ({ step, stateStyle, index, changeCurrentStop }) => {
    return (
        <div className={styles.stepRoot} onClick={() => changeCurrentStop(index)}>
            <div className={styles.stepBullet} />
            <div className={getClasses(stateStyle, styles.step)}>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
            </div>
        </div>
    )
}