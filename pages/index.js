import Head from 'next/head'
import Image from 'next/image'
import styles from './home.module.css';
import { Navbar, Button, Icon, Footer } from "../components";
import Wrapper from "../components/Wrapper/index";
import PackageCard from "./packages/_packagecard";
import getClasses from './api/_getClasses';
import useGetVisibility from './api/_useGetVisibility';
import data from "./packages/content.json";
import { useRouter } from 'next/router';
const gallery = [
  {
    src: "/static/Gallery/1.jpg",
    alt: "An astronaut on the moon."
  },
  {
    src: "/static/Gallery/2.jpg",
    alt: "An astronaut floating in the space."
  },
  {
    src: "/static/Gallery/3.jpg",
    alt: "An astronaut on mars."
  },
  {
    src: "/static/Gallery/4.jpg",
    alt: "A couple of astronauts on mars."
  },
  {
    src: "/static/Gallery/5.jpg",
    alt: "An astronaut taking a picture from low Earth orbit."
  },
  {
    src: "/static/Gallery/6.jpg",
    alt: "A rocket on the moon."
  },
  {
    src: "/static/Gallery/7.jpg",
    alt: "An astronaut on the surface of mars."
  },
  {
    src: "/static/Gallery/8.jpg",
    alt: "A picture of the moon and the Earth."
  }
]
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.6
};
export default function Home() {
  const router = useRouter();
  const [heroVisible, heroRef] = useGetVisibility(options);
  const promotions = [data["packages"][0], data["packages"][1], data["packages"][2]] ?? [];
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
        <meta name="description" content="Website for buying tourist packages to Orbit, Moon, and Mars" />
        <link rel="icon" href="/spaceoasis.svg" />
      </Head>
      <section id="hero" className={styles.hero}>
        <Wrapper>
          <Navbar />
          <div title='heading' className={getClasses(styles.heroText)} ref={heroRef} >
            <h1 title="title" className={heroVisible ? styles.show : styles.hide}>Space Oasis</h1>
            <h2 title='subtitle' className={heroVisible ? styles.show : styles.hide}>Explore Beyond the Confines of Your Existence</h2>
          </div>
        </Wrapper>
      </section>
      <Wrapper>
        <section className={styles.promotion}>
          <h1>Find a Venture</h1>
          <div className={styles.promoHeader}>
            <h2>Top Picks</h2>
            <div onClick={() => router.push("/packages")} style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <p>See All</p>
              <Icon name="right" size={16} />
            </div>
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
      <Footer />
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