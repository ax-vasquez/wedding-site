import ParallaxImage from "@/components/ParallaxImage"
import PageLayout from "@/components/layout/PageLayout"
import { client } from "@/sanity/client"
import { ParallaxImageData, PreparationItemData } from "@/types"
import { PortableText } from "@portabletext/react"
import { GetStaticProps, NextPage } from "next"
import React from "react"

const Preparation: NextPage<{ 
    parallaxImages: ParallaxImageData[]
    weatherConcerns: PreparationItemData[]
    personalCareConcerns: PreparationItemData[]
}> = ({
    parallaxImages,
    weatherConcerns,
    personalCareConcerns
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
                    <h2 className="text-6xl text-center mb-4">Personal Care</h2>
                    {personalCareConcerns.map((concern, idx) => {
                        return (
                            <div key={`care-concern-${idx}`} className="mt-8">
                                <h3 className="text-3xl mb-4">
                                    {concern.title}
                                </h3>
                                <PortableText
                                    value={concern.description}
                                />
                                <ul className="mitigations-list mt-6 indent-6 list-disc list-inside">
                                    {concern.mitigations.map((mitigation, mIdx) => {
                                        return (
                                            <li key={`care-concern-${idx}-mitigation-${mIdx}}`} className="italic">{mitigation}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h2 className="text-6xl text-center mb-4 mt-12">Weather Concerns</h2>
                    {weatherConcerns.map((concern, idx) => {
                        return (
                            <div key={`care-concern-${idx}`} className="mt-8">
                                <h3 className="text-3xl mb-4">
                                    {concern.title}
                                </h3>
                                <PortableText
                                    value={concern.description}
                                />
                                <ul className="mitigations-list mt-6 indent-6 list-disc list-inside">
                                    {concern.mitigations.map((mitigation, mIdx) => {
                                        return (
                                            <li key={`care-concern-${idx}-mitigation-${mIdx}}`} className="italic">{mitigation}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
            <ParallaxImage 
                imageUrl={parallaxImages[3].imageUrl}
                title={parallaxImages[3].title}
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
    const weatherConcerns = await client.fetch(`
      *[_type == "weatherConcern"] | order(title desc) {
          title,
          description,
          mitigations
      }
    `)
    const personalCareConcerns = await client.fetch(`
      *[_type == "personalCareConcern"] | order(title desc) {
          title,
          description,
          mitigations
      }
    `)
    return { props: {
        parallaxImages,
        weatherConcerns,
        personalCareConcerns
    }}
}) satisfies GetStaticProps<{
    parallaxImages: ParallaxImageData[]
    weatherConcerns: PreparationItemData[]
    personalCareConcerns: PreparationItemData[]
}>

export default Preparation
