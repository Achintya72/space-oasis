import Head from 'next/head'
import Image from 'next/image'
import styles from './home.module.css';
import { Navbar, Button } from "../components";
import Wrapper from "../components/Wrapper/index";
import PackageCard from "./book/_packagecard";
import getClasses from './api/_getClasses';
import useGetVisibility from './api/_useGetVisibility';

const promotions = [
  {
    title: "Lunar Exploration",
    img: "/static/HeroImg.jpg",
    description: "Lorem ipsum dolor sit amet consectetur. Lectus montes enim sem curabitur elit pretium commodo.",
    price: 450,
    location: "The moon",
    stars: 4
  },
  {
    title: "Lunar Exploration",
    img: "/static/HeroImg.jpg",
    description: "Lorem ipsum dolor sit amet consectetur. Lectus montes enim sem curabitur elit pretium commodo.",
    price: 450,
    location: "The moon",
    stars: 4
  }, {
    title: "Lunar Exploration",
    img: "/static/HeroImg.jpg",
    description: "Lorem ipsum dolor sit amet consectetur. Lectus montes enim sem curabitur elit pretium commodo.",
    price: 450,
    location: "The moon",
    stars: 4
  },
];

const gallery = [
  {
    src: "/static/Gallery/1.jpg",
    alt: "An astronaut in mars"
  },
  {
    src: "/static/Gallery/2.jpg",
    alt: "An astronaut in mars"
  }, {
    src: "/static/Gallery/3.jpg",
    alt: "An astronaut in mars"
  }, {
    src: "/static/Gallery/4.jpg",
    alt: "An astronaut in mars"
  },
  {
    src: "/static/Gallery/1.jpg",
    alt: "An astronaut in mars"
  },
  {
    src: "/static/Gallery/2.jpg",
    alt: "An astronaut in mars"
  }, {
    src: "/static/Gallery/3.jpg",
    alt: "An astronaut in mars"
  }, {
    src: "/static/Gallery/4.jpg",
    alt: "An astronaut in mars"
  }
]
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7
};
export default function Home() {
  const [heroVisible, heroRef] = useGetVisibility(options);
  const renderPromo = promotions.map((promotion, i) => (
    <PackageCard
      {...promotion}
      key={i}
      show
    />
  ));



  const renderGallery = gallery.map((img, i) => (
    <GalleryImg key={"Gallery" + i} img={img} />
  ));

  return (
    <>
      <Head>
        <title>Space Oasis</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="hero" className={styles.hero}>
        <Wrapper>
          <Navbar />
          <div className={getClasses(styles.heroText)} ref={heroRef} >
            <h1 className={heroVisible ? styles.show : styles.hide}>Space Oasis</h1>
            <h5 className={heroVisible ? styles.show : styles.hide}>Explore Beyond the Confines of Your Existence</h5>
          </div>
        </Wrapper>
      </section>
      <Wrapper>
        <section className={styles.promotion}>
          <h1>Find a Venture</h1>
          <div className={styles.promoHeader}>
            <h2>Top Picks</h2>
            <p>See All</p>
          </div>
          <div className={styles.cardGrid} >
            {renderPromo}
          </div>
        </section>
        <section className={styles.gallery}>
          <h1>Gallery</h1>
          <div className={styles.galleryGrid}>
            {renderGallery}
          </div>
        </section>
      </Wrapper>
    </>
  )
}


function GalleryImg(props) {
  const [visible, ref] = useGetVisibility(options);
  const {
    img,
  } = props;
  return (
    <div ref={ref} className={getClasses(styles.galleryImg, visible ? styles.showImg : styles.hideImg)} >
      <img {...img} style={{ width: "100%", height: "auto" }} />
    </div >
  )
}