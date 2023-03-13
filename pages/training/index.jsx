import { Navbar } from "../../components"
import Wrapper from "../../components/Wrapper"
import styles from "./trainingStyles.module.css";
import Image from "next/image";
import data from "./content.json";
import YoutubeEmbed from "./YoutubeEmbed";

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
                {data['stages'] != undefined && data['stages'].map((value, index) => (
                    <Stage {...value} num={index + 1} key={`stage-${index}`} />
                ))}
            </div>
            <h2>Spaceflight Videos</h2>
            <div className={styles.stages}>
                {data['videos'] != undefined && data['videos'].map((value, index) => (
                    <YoutubeEmbed {...value} key={`video-${index}`} />
                ))
                }
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

const Stage = (props) => (
    <div className={styles.stage}>
        <h4>{props.num}. {props.title}</h4>
        <p>{props.description}</p>
    </div>
)