import ParallaxImage from "@/components/ParallaxImage"
import PageLayout from "@/components/layout/PageLayout"
import { client } from "@/sanity/client"
import { ParallaxImageData } from "@/types"
import { GetStaticProps, NextPage } from "next"
import React from "react"

const Venue: NextPage<{ 
    parallaxImages: ParallaxImageData[]
}> = ({
    parallaxImages
}) => {
    return (
        <PageLayout
            pageTitle="Venue"
        >
            <ParallaxImage 
                imageUrl={parallaxImages[1].imageUrl}
                title={parallaxImages[1].title}
                caption={(
                <div className="py-7">
                    <h1 className="text-8xl text-white text-center">Venue Details</h1>
                </div>
                )}
            />
        </PageLayout>
    )
}

export const getStaticProps = (async () => {
    const parallaxImages = await client.fetch(`
      *[_type == "venueImage"] | order(key asc) {
          title,
          key,
          "imageUrl": image.asset->url
      }
    `)
    return { props: {
        parallaxImages,
    }}
}) satisfies GetStaticProps<{
    parallaxImages: ParallaxImageData[]
}>

export default Venue
