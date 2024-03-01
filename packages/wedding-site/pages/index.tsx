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
  parallaxImages: {
    title: string
    imageUrl: string
    key: string
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
  welcomePage,
  parallaxImages
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
            src={parallaxImages[1].imageUrl}
            height={0}
            width={0}
            sizes="100vw"
            fill
            alt={parallaxImages[0].title}
            priority={true}
            style={{ objectFit: `cover` }}
        />
      </div>
      <div className="text-content">
        <PortableText 
          value={welcomePage[0].welcomeMessage}
        />
        <div>
          <h2 className="text-2xl">
            For our guests
          </h2>
          
          <ul className="list-disc list-inside">
            {rootPages.map(({ to, label }, index) => {
              return (
                <li key={`root-page-idx-${index}`} className="text-morning-snow"><Link className="text-black" href={to}>{label}</Link></li>
              )
            })}
          </ul>
        </div>
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
    const parallaxImages = await client.fetch(`
      *[_type == "venueImage"] | order(key asc) {
          title,
          key,
          "imageUrl": image.asset->url
      }
    `)
    return { props: {
        welcomePage,
        parallaxImages
    }}
}) satisfies GetStaticProps<{
    welcomePage: any
}>

export default Home
