import styles from "./home.module.css";
import Image from "next/image";
import useGetVisibility from "./api/_useGetVisibility.js";
import getClasses from "./api/_getClasses";
const quotes = [
    {
        name: "Michael Chang",
        date: "August 17, 2159",
        testimonial: "\"My trip to space with SpaceOasis was an unforgettable adventure. The space obstacle courses and Martian stargazing were breathtaking, and the crew was professional and supportive throughout the journey. I felt completely at ease and would recommend this experience to anyone who wants to explore the wonders of space.\"",
        image: "/static/Testimonials/MichaelChang.jpg"

    },
    {
        name: "Emily Jones",
        date: "February 14, 2164",
        testimonial: "\"Thanks to SpaceOasis, I had the experience of a lifetime with space obstacle courses and Martian stargazing. The facilities were top-notch, and the crew was professional and supportive, making me feel at ease even during the most challenging moments. The opportunity to stargaze on Mars and witness the vastness of the universe was truly breathtaking. The entire journey was unforgettable and an experience I will never forget.\"",
        image: "/static/Testimonials/EmilyJones.jpg"

    },
    {
        name: "Jessica Chen",
        date: "October 28, 2164",
        testimonial: "\"SpaceOasis made my dream of space travel a reality, and the opportunity to play basketball and ride ATVs on the moon was truly unforgettable. The crew was knowledgeable and supportive, and I felt safe throughout the entire journey. Seeing the Earth rise over the horizon of the moon was breathtaking, and the entire experience was beyond anything I could have imagined. Thank you SpaceOasis for this once-in-a-lifetime adventure!\"",
        image: "/static/Testimonials/JessicaChen.jpg"

    }
]

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6
};

export default function Testimonials() {
    return (
        <section className={styles.testimonials}>
            <h1>Testimonials</h1>
            <div className={styles.quotes}>
                {quotes != undefined && quotes.map((quote, i) => (
                    <Testimonial key={`quote-${i}`} quote={quote} />
                ))}
            </div>
        </section >
    )
}

function Testimonial({ quote }) {
    const [visible, ref] = useGetVisibility(options);
    return (
        <div ref={ref} className={getClasses(styles.quote, visible ? styles.showQuote : styles.hideQuote)}>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>
                <Image src={quote.image} alt="" className={styles.avatar} width={75} height={75} />
                <p>{quote.testimonial}</p>
            </div>
            <div className={styles.quoteDetails}>
                <h3>{quote.name}</h3>
                <p>{quote.date}</p>
            </div>
        </div>
    )
}