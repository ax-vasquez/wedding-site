import ParallaxImage from "@/components/ParallaxImage"
import PageLayout from "@/components/layout/PageLayout"
import { client } from "@/sanity/client"
import { ParallaxImageData } from "@/types"
import { GetStaticProps, NextPage } from "next"
import React from "react"

const Travel: NextPage<{ 
    parallaxImages: ParallaxImageData[]
}> = ({
    parallaxImages
}) => {
    return (
        <PageLayout>
            <ParallaxImage 
                imageUrl={parallaxImages[1].imageUrl}
                title={parallaxImages[1].title}
                caption={(
                <div className="py-7">
                    <h1 className="text-8xl text-white text-center">Travel Information</h1>
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

export default Travel
