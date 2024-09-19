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
    }, [user])

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

    const hasUnsavedChanges = Boolean((isGoing !== isGoingLocal) || (firstName !== firstNameLocal) || (lastName !== lastNameLocal))

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        axios.post('/api/user/update', {
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
                hors_doeuvres_selection,
                entree_selection
            } = res.data.data
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
