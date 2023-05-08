import Head from "next/head";
import { Footer, Icon, Navbar } from "../../components";
import Wrapper from "../../components/Wrapper";

export default function Vehicles(props) {
    return (
        <>
            <Head>
                <title>Safety</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Wrapper>
                <Navbar />
                <Footer />
            </Wrapper>
        </>
    )
}