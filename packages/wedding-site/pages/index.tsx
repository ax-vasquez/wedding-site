import { GetStaticProps, NextPage } from "next";
import PageLayout from "./common/layout/PageLayout";
import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface HomePageProps {
  welcomePage: {
    welcomeMessage: any
  }[]
}

const Home: React.FC<HomePageProps> = ({
  welcomePage
}) => {
  return (
    <PageLayout>
      <Image 
        src={'/images/banner-1.jpg'}
        height={0}
        width={0}
        sizes="100vw"
        fill
        alt="hero-image"
        priority={true}
        style={{ objectFit: `cover` }}
      />
      <PortableText 
        value={welcomePage[0].welcomeMessage}
      />
    </PageLayout>
  )
}

export const getStaticProps = (async () => {
    const welcomePage = await client.fetch(`
        *[_type == "welcomePage"]{
            welcomeMessage,
        }
    `)
    return { props: {
        welcomePage
    }}
}) satisfies GetStaticProps<{
    welcomePage: any
}>

export default Home
