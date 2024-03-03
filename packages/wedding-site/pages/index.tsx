import { GetStaticProps } from "next";
import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import ParallaxImage from "@/components/ParallaxImage";
import { ParallaxImageData } from "@/types";

interface HomePageProps {
  welcomePage: {
    welcomeMessage: any
  }[]
  parallaxImages: ParallaxImageData[]
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
      <ParallaxImage 
        imageUrl={parallaxImages[1].imageUrl}
        title={parallaxImages[1].title}
        caption={(
          <div className="py-7">
            <h1 className="text-8xl text-white text-center">Larah & Mando</h1>
            <div className="subtitle text-4xl text-white text-center mt-4">Breckenridge, CO - Winter, 2025</div>
          </div>
        )}
      />
      <div className="text-content text-white py-7">
        <PortableText 
          value={welcomePage[0].welcomeMessage[0]}
        />
      </div>
      <ParallaxImage 
        imageUrl={parallaxImages[0].imageUrl}
        title={parallaxImages[0].title}
        key={parallaxImages[0].key}
      />
      <div className="text-content text-white py-7">
        <PortableText 
          value={welcomePage[0].welcomeMessage[1]}
        />
      </div>
      <ParallaxImage 
        imageUrl={parallaxImages[2].imageUrl}
        title={parallaxImages[2].title}
        key={parallaxImages[2].key}
      />
      <div className="text-content text-white py-7">
        <PortableText 
          value={welcomePage[0].welcomeMessage[2]}
        />
      </div>
      <ParallaxImage 
        imageUrl={parallaxImages[3].imageUrl}
        title={parallaxImages[3].title}
        key={parallaxImages[3].key}
      />
      <div className="text-content text-white py-7">
        <PortableText 
          value={welcomePage[0].welcomeMessage[3]}
        />
      </div>
      <ParallaxImage 
        imageUrl={parallaxImages[1].imageUrl}
        title={parallaxImages[1].title}
        key={parallaxImages[1].key}
      />
      <div className="text-content py-7 text-white">
        <div>
          <h2 className="text-6xl mb-4 text-center">
            For our guests
          </h2>
          
          <ul className="columns-2 text-center">
            {rootPages.map(({ to, label }, index) => {
              return (
                <li key={`root-page-idx-${index}`}><Link className="text-4xl text-morning-snow hover:text-white" href={to}>{label}</Link></li>
              )
            })}
          </ul>
        </div>
      </div>
      <ParallaxImage 
        imageUrl={parallaxImages[3].imageUrl}
        title={parallaxImages[3].title}
        key={parallaxImages[3].key}
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
