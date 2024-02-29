import { GetStaticProps, NextPage } from "next";
import { client } from "@/sanity/client";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";

interface HomePageProps {
  welcomePage: {
    welcomeMessage: any
  }[]
}

const components = {
  marks: {
    p: ({ value, children })=> {
      return <p className="">{children}</p>
    }
  }
} as Partial<PortableTextReactComponents>

const Home: React.FC<HomePageProps> = ({
  welcomePage
}) => {
  return (
    <PageLayout>
      <div
        style={{
          position: `relative`,
          height: `400px`
        }}
      >
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
      </div>
      <PortableText 
        value={welcomePage[0].welcomeMessage}
        components={components}
      />
      <div>
        <h2>
          For our guests
        </h2>
        <ul>
          <li><Link href="/rsvp">RSVP</Link></li>
          <li><Link href="/itinerary">Itinerary</Link></li>
          <li><Link href="/venue">Venue</Link></li>
          <li><Link href="/travel">Travel</Link></li>
          <li><Link href="/preparation">Preparation</Link></li>
        </ul>
      </div>
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
