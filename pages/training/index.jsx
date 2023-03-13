import { Navbar } from "../../components"
import Wrapper from "../../components/Wrapper"
import styles from "./trainingStyles.module.css";
import Image from "next/image";
import data from "./content.json";

export default function Training(props) {
    return (
        <Wrapper>
            <Navbar />
            <h1>Training</h1>
            <h2>Certifications Required</h2>
            <div className={styles.certificates}>
                {data["certificates"] != undefined && data["certificates"].map((value, index) => (
                    <Certificate {...value} key={`certificate-${index}`} />
                ))}
            </div>
            <h2>Spaceflight Stages</h2>
            <div className={styles.stages}>
                {data['videos'] != undefined && data['videos'].map((value, index) => (
                    <Video {...value} key={`video-${index}`} />
                ))}
            </div>
        </Wrapper>
    )
}

function Certificate(props) {
    const {
        img,
        alt,
        title,
        location,
        description,
        instructions
    } = props;
    return (
        <div className={styles.certificate}>
            <div className={styles.certificateImg}>
                <Image src={img} alt={alt} fill />
            </div>
            <div>
                <h4>{title}</h4>
                <p className={styles.caption}>{location}</p>
            </div>
            <p>{description}</p>
            <div className={styles.instructions}>
                <span>How to get one:</span>
                <p>{instructions}</p>
            </div>
        </div>
    )
}

function Video(props) {
    const {
        src,
        title,
        description
    } = props;

    return (
        <div className={styles.stage}>
            <video className={styles.video} src={src} type="video/mp4" controls={true} />
            <div className={styles.stageText}>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}
