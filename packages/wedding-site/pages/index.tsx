import { GetStaticProps, NextPage } from "next";
import PageLayout from "./common/layout/PageLayout";
import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";

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
      <PortableText 
        value={welcomePage[0].welcomeMessage}
      />
    </PageLayout>
  )
}

export const getStaticProps = (async () => {
    console.log(`GETTING STATIC PROPS`)
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
