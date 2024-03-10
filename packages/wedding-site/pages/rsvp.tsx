import ParallaxImage from "@/components/ParallaxImage"
import HighlightingLabelTag from "@/components/form/HighlightingLabelTag"
import ToggleField from "@/components/form/ToggleField"
import PageLayout from "@/components/layout/PageLayout"
import { client } from "@/sanity/client"
import { ParallaxImageData } from "@/types"
import { useUser } from "@auth0/nextjs-auth0/client"
import axios from "axios"
import { GetStaticProps, NextPage } from "next"
import React, { FormEvent, useEffect, useState } from "react"
import styles from './rsvp.module.scss'
import CustomIcon from "@/components/CustomIcon"

const RSVP: NextPage<{ 
    parallaxImages: ParallaxImageData[]
}> = ({
    parallaxImages
}) => {
    const { user } = useUser()
    const [canInviteOthers, setCanInviteOthers] = useState(false)
    const [isGoing, setIsGoing] = useState(false)
    const [isGoingLocal, setIsGoingLocal] = useState(false)
    const [firstName, setFirstName] = useState(null as unknown as undefined)
    const [firstNameLocal, setFirstNameLocal] = useState(null as unknown as undefined)
    const [lastName, setLastName] = useState(null as unknown as undefined)
    const [lastNameLocal, setLastNameLocal] = useState(null as unknown as undefined)
    const [horsDoeuvresSelection, setHorsDoeuvresSelection] = useState(null as unknown as undefined)
    const [horsDoeuvresSelectionLocal, setHorsDoeuvresSelectionLocal] = useState(null as unknown as undefined)
    const [entreeSelection, setEntreeSelection] = useState(null as unknown as undefined)
    const [entreeSelectionLocal, setEntreeSelectionLocal] = useState(null as unknown as undefined)
    useEffect(() => {
        if (user && user.email) {
            axios.get(`/api/user/get`)
                .then((res) => {
                    const {
                        first_name,
                        last_name,
                        is_going,
                        can_invite_others,
                        hors_doeuvres_selection,
                        entree_selection
                    } = res.data
                    setCanInviteOthers(can_invite_others)
                    setIsGoing(is_going)
                    setFirstName(first_name)
                    setLastName(last_name)
                    setHorsDoeuvresSelection(hors_doeuvres_selection)
                    setHorsDoeuvresSelectionLocal(hors_doeuvres_selection)
                    setEntreeSelection(entree_selection)
                    setEntreeSelectionLocal(entree_selection)
                })
                .catch(e => console.error(e))
        }
    })

    useEffect(() => {
        setIsGoingLocal(isGoing)
    }, [isGoing])
    
    useEffect(() => {
        setFirstNameLocal(firstName)
    }, [firstName])

    useEffect(() => {
        setLastNameLocal(lastName)
    }, [lastName])

    useEffect(() => {
        setHorsDoeuvresSelectionLocal(horsDoeuvresSelection)
    }, [horsDoeuvresSelection])

    useEffect(() => {
        setEntreeSelectionLocal(entreeSelection)
    }, [entreeSelection])

    const hasUnsavedChanges = Boolean((isGoing !== isGoingLocal) || (firstName !== firstNameLocal))

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        axios.post('/api/user/update', {
            email: user?.email,
            isGoing: isGoingLocal,
            firstName: firstNameLocal,
            lastName: lastNameLocal,
            horsDoeuvresSelection: horsDoeuvresSelectionLocal,
            entreeSelection: entreeSelectionLocal
        })
        .then(res => {
            const {
                first_name,
                last_name,
                is_going,
                can_invite_others,
                hors_doeuvres_selection,
                entree_selection
            } = res.data.data
            setCanInviteOthers(can_invite_others)
            setIsGoing(is_going)
            setFirstName(first_name)
            setLastName(last_name)
            setHorsDoeuvresSelection(hors_doeuvres_selection)
            setHorsDoeuvresSelectionLocal(hors_doeuvres_selection)
            setEntreeSelection(entree_selection)
            setEntreeSelectionLocal(entree_selection)
        })
        .catch(e => console.error(e))
    }

    return (
        <PageLayout
            pageTitle="RSVP"
        >
            <ParallaxImage 
                imageUrl={parallaxImages[1].imageUrl}
                title={parallaxImages[1].title}
                caption={(
                <div className="py-7">
                    <h1 className="text-8xl text-white text-center">RSVP</h1>
                </div>
                )}
            />
            <div className="text-content text-white py-7">
                <div>
                    <h2 className="text-6xl text-center mb-4">Your response</h2>
                    <div className={styles.unsavedChanges}>
                        {hasUnsavedChanges && (
                            <>
                                <CustomIcon
                                    fileName="bootstrap-exclamation-triangle-fill"
                                    height={20}
                                    width={20}
                                />
                                <span className="ml-2 mr-2">You have unsaved changes</span>
                                <CustomIcon
                                    fileName="bootstrap-exclamation-triangle-fill"
                                    height={20}
                                    width={20}
                                />
                            </>
                        )}
                    </div>
                    <form
                        onSubmit={onSubmit}
                    >
                        <ToggleField 
                            localSelection={isGoingLocal}
                            currentSelection={isGoing}
                            fieldLabel="Will you be joining us?"
                            optionALabel="Yes"
                            optionAHandler={() => setIsGoingLocal(true)}
                            optionBLabel="No"
                            optionBHandler={() => setIsGoingLocal(false)}
                        />
                        <div className={styles.saveButtonWrapper}>
                            <button type="submit" className="border">Save Changes</button>
                        </div>
                    </form>
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
    return { props: {
        parallaxImages,
    }}
}) satisfies GetStaticProps<{
    parallaxImages: ParallaxImageData[]
}>

export default RSVP
