import ParallaxImage from "@/components/ParallaxImage"
import PageLayout from "@/components/layout/PageLayout"
import { client } from "@/sanity/client"
import { GetStaticProps, NextPage } from "next"
import React from "react"

const Preparation: NextPage<{ 
    parallaxImages: {
        title: string
        imageUrl: string
        key: string
    }[] 
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
                    <h1 className="text-8xl text-white text-center">Guest Preparation</h1>
                </div>
                )}
            />
            <div className="text-content text-white py-7">
                <div>
                    <h2 className="text-4xl text-center mb-4">Personal Care</h2>
                    <div>
                        Breckenridge is high in the Colorado Rockies; around 10,000 feet, roughly. Because of its altitude and the 
                        time of year the event is planned, there are a number of things to consider before you go so you can prepare
                        ahead of time.
                    </div>
                </div>
                
            </div>
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
        parallaxImages
    }}
}) satisfies GetStaticProps<{
    parallaxImages: {
        title: string
        imageUrl: string
        key: string
    }[]
}>

export default Preparation
