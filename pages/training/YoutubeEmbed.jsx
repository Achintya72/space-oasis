import styles from "./trainingStyles.module.css";
export default function YoutubeEmbed({ embedId }) {
    return (
        <div className={styles.video}>
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${embedId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    )
}