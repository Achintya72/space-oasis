import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import getClasses from "../../api/_getClasses";
import useGetVisibility from "../../api/_useGetVisibility";

const steps = [
    {
        title: "Training",
        description: "Lorem ipsum dolor sit amet consectetur. Lorem platea mattis eget donec molestie mi. Urna faucibus lacus nulla id. A pharetra facilisis mattis justo id vitae netus. Dignissim ut eget habitasse semper ullamcorper odio vulputate nascetur.",
        img: "/static/Gallery/1.jpg",
        alt: "First Pic"
    },
    {
        title: "Take-off",
        description: "Lorem ipsum dolor sit amet consectetur. Lorem platea mattis eget donec molestie mi. Urna faucibus lacus nulla id. A pharetra facilisis mattis justo id vitae netus. Dignissim ut eget habitasse semper ullamcorper odio vulputate nascetur.",
        img: "/static/Gallery/2.jpg",
        alt: "First Pic"
    },
    {
        title: "Exit Earth",
        description: "Lorem ipsum dolor sit amet consectetur. Lorem platea mattis eget donec molestie mi. Urna faucibus lacus nulla id. A pharetra facilisis mattis justo id vitae netus. Dignissim ut eget habitasse semper ullamcorper odio vulputate nascetur.",
        img: "/static/Gallery/3.jpg",
        alt: "First Pic"
    }, {
        title: "Cryosleep",
        description: "Lorem ipsum dolor sit amet consectetur. Lorem platea mattis eget donec molestie mi. Urna faucibus lacus nulla id. A pharetra facilisis mattis justo id vitae netus. Dignissim ut eget habitasse semper ullamcorper odio vulputate nascetur.",
        img: "/static/Gallery/4.jpg",
        alt: "First Pic"
    }, {
        title: "Landing",
        description: "Lorem ipsum dolor sit amet consectetur. Lorem platea mattis eget donec molestie mi. Urna faucibus lacus nulla id. A pharetra facilisis mattis justo id vitae netus. Dignissim ut eget habitasse semper ullamcorper odio vulputate nascetur.",
        img: "/static/Gallery/2.jpg",
        alt: "First Pic"
    },
];

export default function Journey(props) {
    const [currentStop, changeCurrentStop] = useState(0);
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