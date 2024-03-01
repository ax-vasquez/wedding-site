import { GetStaticProps, NextPage } from "next";
import { client } from "@/sanity/client";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { ReactNode } from "react";

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

const ParallaxImageCaption: React.FC<{captionComponent: ReactNode | string}> = ({
  captionComponent
}) => {
  return (
    <div className="absolute top-1/3 bg-mountain-pine w-full opacity-80">
        {captionComponent}
    </div>
  )
}

const ParallaxImage: React.FC<{ imageUrl: string, title: string, key: string, caption?: any }> = ({
  imageUrl,
  title,
  key,
  caption
}) => {
  return (
    <div 
      key={key}
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
      className="h-full bg-fixed bg-center bg-no-repeat bg-cover"
    >
      {caption && <ParallaxImageCaption captionComponent={caption} />}
    </div>
  )
}

const Home: React.FC<HomePageProps> = ({
  welcomePage,
  parallaxImages
}) => {
  return (
    <PageLayout>
      <ParallaxImage 
        imageUrl={parallaxImages[1].imageUrl}
        title={parallaxImages[1].title}
        key={parallaxImages[1].key}
        caption={(
          <div className="py-7">
            <h1 className="text-8xl text-white text-center">Larah & Mando</h1>
            <div className="subtitle text-4xl text-white text-center mt-4">Winter, 2025</div>
          </div>
        )}
      />
      <div className="text-content">
        <PortableText 
          value={welcomePage[0].welcomeMessage}
        />
      </div>
      <ParallaxImage 
        imageUrl={parallaxImages[0].imageUrl}
        title={parallaxImages[0].title}
        key={parallaxImages[0].key}
      />
      <div className="text-content">
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
      <ParallaxImage 
          imageUrl={parallaxImages[2].imageUrl}
          title={parallaxImages[2].title}
          key={parallaxImages[2].key}
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
