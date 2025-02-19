import ParallaxImage from "@/components/ParallaxImage"
import ToggleField from "@/components/form/ToggleField"
import PageLayout from "@/components/layout/PageLayout"
import { client } from "@/sanity/client"
import { ParallaxImageData } from "@/types"
import axios from "axios"
import { GetStaticProps, NextPage } from "next"
import React, { FormEvent, useEffect, useMemo, useState } from "react"
import styles from './rsvp.module.scss'
import CustomIcon from "@/components/CustomIcon"
import TextField from "@/components/form/TextField"
import cs from 'clsx'
import { useUser } from "@/hooks/useUser"
import { InviteesInfo } from "@/components/rsvp/InviteesInfo"
import Link from "next/link"
import { RegistryLink } from "@/components/RegistryLink"

const RSVP: NextPage<{ 
    parallaxImages: ParallaxImageData[]
}> = ({
    parallaxImages
}) => {

    const user = useUser()
    const [isGoing, setIsGoing] = useState(false)
    const [isGoingLocal, setIsGoingLocal] = useState(false)
    const [firstName, setFirstName] = useState(null as unknown as string)
    const [firstNameLocal, setFirstNameLocal] = useState(null as unknown as string)
    const [lastName, setLastName] = useState(null as unknown as string)
    const [lastNameLocal, setLastNameLocal] = useState(null as unknown as string)
    const [horsDoeuvresSelection, setHorsDoeuvresSelection] = useState(null as unknown as string)
    const [horsDoeuvresSelectionLocal, setHorsDoeuvresSelectionLocal] = useState(null as unknown as string)
    const [entreeSelection, setEntreeSelection] = useState(null as unknown as string)
    const [entreeSelectionLocal, setEntreeSelectionLocal] = useState(null as unknown as string)

    useEffect(() => {
        if (user) {
            axios.get(`/api/user`)
                .then((res) => {
                    const {
                        first_name,
                        last_name,
                        is_going,
                        hors_doeuvres_selection,
                        entree_selection
                    } = res.data.data.users[0]
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
    }, [user, isGoing, firstName, lastName, isGoing, horsDoeuvresSelection, entreeSelection])

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

    const hasUnsavedChanges = Boolean((isGoing !== isGoingLocal) || (firstName !== firstNameLocal) || (lastName !== lastNameLocal) || (horsDoeuvresSelection !== horsDoeuvresSelectionLocal) || (entreeSelection !== entreeSelectionLocal))

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!hasUnsavedChanges) {
            // Don't send a request if there are no changes to submit
            return
        }
        axios.patch(`/api/user`, {
            is_going: isGoingLocal,
            first_name: firstNameLocal,
            last_name: lastNameLocal,
            hors_doeuvres_selection_id: horsDoeuvresSelectionLocal,
            entree_selection_id: entreeSelectionLocal
        })
        .then(res => {
            const {
                first_name,
                last_name,
                is_going,
                hors_doeuvres_selection_id,
                entree_selection_id
            } = res.data.data.users[0]
            setIsGoing(is_going)
            setFirstName(first_name)
            setLastName(last_name)
            setHorsDoeuvresSelection(hors_doeuvres_selection_id)
            setHorsDoeuvresSelectionLocal(hors_doeuvres_selection_id)
            setEntreeSelection(entree_selection_id)
            setEntreeSelectionLocal(entree_selection_id)
        })
        .catch(e => console.error(e))
    }

    const handleUndo = () => {
        setIsGoingLocal(isGoing)
        setFirstNameLocal(firstName)
        setLastNameLocal(lastName)
        setHorsDoeuvresSelectionLocal(horsDoeuvresSelection)
        setEntreeSelectionLocal(entreeSelection)
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
                    <h2 className="text-3xl text-center mb-4">We hope you&apos;re able to attend!</h2>
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
                    <RegistryLink />
                    <div className={styles.undoButtonWrapper}>
                        {hasUnsavedChanges && 
                            <button className={cs(styles.undoButton, "text-white")} onClick={handleUndo}>
                                <CustomIcon 
                                    fileName="bootstrap-arrow-counterclockwise"
                                    height={20}
                                    width={20}
                                />
                                <span>undo</span>
                            </button>
                        }
                    </div>
                    <form
                        onSubmit={onSubmit}
                    >
                        <TextField
                            localValue={firstNameLocal}
                            currentValue={firstName}
                            fieldLabel="First name"
                            onChangeHandler={(e) => setFirstNameLocal(e.target.value)}
                        />
                        <TextField
                            localValue={lastNameLocal}
                            currentValue={lastName}
                            fieldLabel="Last name"
                            onChangeHandler={(e) => setLastNameLocal(e.target.value)}
                        />
                        <ToggleField 
                            localSelection={isGoingLocal}
                            currentSelection={isGoing}
                            fieldLabel="Will you be joining us?"
                            optionALabel="Yes"
                            optionAHandler={() => setIsGoingLocal(true)}
                            optionBLabel="No"
                            optionBHandler={() => setIsGoingLocal(false)}
                        />
                        <InviteesInfo />
                        <div className={cs(styles.reservationsPromptWrapper, isGoing && styles.visible)}>
                            <h2>We&apos;re so glad you can make it!</h2>
                            <span>
                                If you haven&apos;t already, don&apos;t forget to make your reservations
                                at the venue. You can find a link to reserve a room from our block of rooms on the Venue page. You can get 
                                to the Venue page from the side bar, or the link below.
                            </span>
                            <Link href={"/venue"}>Venue Information</Link>
                        </div>
                        <div className={styles.saveButtonWrapper}>
                            <button type="submit" className={styles.submitRsvpButton}>Save Changes</button>
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
