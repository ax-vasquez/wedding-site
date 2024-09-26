import ParallaxImage from "@/components/ParallaxImage"
import PageLayout from "@/components/layout/PageLayout"
import { client } from "@/sanity/client"
import { ParallaxImageData, VenueInfoItemData } from "@/types"
import { PortableText } from "@portabletext/react"
import axios, { AxiosResponse } from "axios"
import { GetStaticProps, NextPage } from "next"
import React, { useEffect, useState } from "react"
import styles from './venue.module.scss'

const Venue: NextPage<{ 
    parallaxImages: ParallaxImageData[]
    venueInfo: VenueInfoItemData[]
}> = ({
    parallaxImages,
    venueInfo
}) => {

    const [reservationsLink, setReservationsLink] = useState('')

    useEffect(() => {
        axios.get(`/api/venue/reservation-link`)
        .then((res: AxiosResponse<{ data: { link: string } }>) => {
            setReservationsLink(res.data.data.link)
        })
        .catch(e => {
            // TODO
        })
    })

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
            <div className="text-content text-white py-7">
                {venueInfo.map((venue, idx) => {
                    return (
                        <div key={`venue-${idx}`} className="mt-8">
                            <h2 className="text-3xl mb-4 mt-4">
                                    Overview
                            </h2>
                            <PortableText
                                    value={venue.venueOverview}
                            />
                            <h2 className="text-3xl mb-4 mt-4">
                                    Address
                            </h2>

                            <PortableText
                                value={venue.venueAddress}
                            />
                            
                            {reservationsLink.length > 0 && 
                            <div className={styles.reservationsWrapper}>
                                <h2 className="text-3xl mb-4 mt-4">
                                    Event Reservations
                                </h2>
                                <span>
                                    As part of our venue event package, we have been given a block of 10 rooms that are available for booking. They
                                    are guaranteed available until <b>45 days</b> before the event date. If you can&apos;t find a room that you like in 
                                    the block of rooms, we&apos;ve been told that our event discount code will apply to other rooms still available
                                    elsewhere at the venue. Be sure to make your reservations early!
                                </span>
                                <button className={styles.btn} onClick={() => window.open(reservationsLink, "none")}>
                                    Reserve a Room
                                </button>
                            </div>
                            }

                            <h2 className="text-3xl mb-4 mt-4">
                                    Contact Info
                            </h2>

                            <ul className="mitigations-list mt-6 indent-6 list-disc list-inside">
                                    {venue.venueContact.map((contact, mIdx) => {
                                        return (
                                            <li key={`care-concern-${idx}-mitigation-${mIdx}}`} className="italic">{contact}</li>
                                        )
                                    })}
                            </ul>

                            <h2 className="text-3xl mb-4 mt-4">
                                    Amenities
                            </h2>
                            <p>The Lodge at Breckenridge has the following amenties for all guests:</p>
                            <ul className="mitigations-list mt-6 indent-6 list-disc list-inside">
                                    {venue.venueAmenities.map((amenity, mIdx) => {
                                        return (
                                            <li key={`care-concern-${idx}-mitigation-${mIdx}}`} className="italic">{amenity}</li>
                                        )
                                    })}
                            </ul>
                            <h2 className="text-3xl mb-4 mt-4">
                                    Room Amenities
                            </h2>
                            <p>Each room has the following amenities:</p>
                            <ul className="mitigations-list mt-6 indent-6 list-disc list-inside">
                                    {venue.roomAmenities.map((amenity, mIdx) => {
                                        return (
                                            <li key={`room-amenity-${idx}-mitigation-${mIdx}}`} className="italic">{amenity}</li>
                                        )
                                    })}
                            </ul>

                            <h2 className="text-3xl mb-4 mt-4">
                                    Dog Amenities
                            </h2>

                            <p>If you bring your doggo friend, you have to pay a $50 per night dog fee, but you get the following pet amenities:</p>
                            <ul className="mitigations-list mt-6 indent-6 list-disc list-inside">
                                    {venue.dogAmenities.map((amenity, mIdx) => {
                                        return (
                                            <li key={`dog-amenity-${idx}-mitigation-${mIdx}}`} className="italic">{amenity}</li>
                                        )
                                    })}
                            </ul>
                            
                        </div>
                    )
                })}
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
    const venueInfo = await client.fetch(`
      *[_type == "venueInfo"] | order(title desc) {
          title,
          venueOverview,
          venueContact,
          venueAddress,
          venueHours,
          venueAmenities,
          roomAmenities,
          dogAmenities
      }
    `)
    return { props: {
        parallaxImages,
        venueInfo
    }}
}) satisfies GetStaticProps<{
    parallaxImages: ParallaxImageData[]
    venueInfo: VenueInfoItemData[]
}>

export default Venue
