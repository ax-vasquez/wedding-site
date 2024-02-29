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

const rootPages = [
  {
    to: '/rsvp',
    label: 'RSVP'
  },
  {
    to: '/itinerary',
    label: 'Itinerary'
  },
  {
    to: '/venue',
    label: 'Venue'
  },
  {
    to: '/travel',
    label: 'Travel'
  },
  {
    to: '/preparation',
    label: 'Preparation'
  }
] as {
  to: string
  label: string
}[]

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
      />
      <div>
        <h2 className="text-2xl">
          For our guests
        </h2>
        
        <ul className="marker:text-red-500 list-disc list-inside">
          {rootPages.map(({ to, label }, index) => {
            return (
              <li key={`root-page-idx-${index}`} className="text-morning-snow"><Link className="text-black" href={to}>{label}</Link></li>
            )
          })}
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
