import React, { useEffect, useState } from 'react'
import styles from './InviteeRow.module.scss'
import CustomIcon from '../CustomIcon'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { UserInvitee } from '@/types'

interface InviteeRowProps {
    id: string
    firstName: string
    lastName: string
    reloadInviteesHandler: () => void
}

export const InviteeRow: React.FC<InviteeRowProps> = ({
    id,
    firstName,
    lastName,
    reloadInviteesHandler
}) => {

    const [firstNameLocal, setFirstNameLocal] = useState('')
    const [lastNameLocal, setLastNameLocal] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        setFirstNameLocal(firstName)
        setLastNameLocal(lastName)
    }, [firstName, lastName])

    const updateInviteeHandler = () => {
        axios.patch(`/api/user/invitees/${id}`, {
            first_name: firstNameLocal,
            last_name: lastNameLocal,
        }).then((res: AxiosResponse<{ status: string, message: string, data: UserInvitee[] }>) => {
            reloadInviteesHandler()
        })
        .catch((e: AxiosError) => {
            // TODO: Some kind of error handling
        })
    }

    const deleteInviteeHandler = (() => {
        axios.delete(`/api/user/invitees/${id}`)
        .then((res: AxiosResponse<{ status: string, message: string, data: UserInvitee[] }>) => {
            reloadInviteesHandler()
        })
        .catch((e: AxiosError) => {
            // TODO: Some kind of error handling
        })
    })

    return (
        <div className={styles.container}>
            <div className={styles.loadingOverlay} />
            <div className={styles.content}>
                <div className={styles.nameWrapper}>
                    {isEditing ? 
                        <div>
                            <input type="text" className='text-black p-1 w-20' value={firstNameLocal} placeholder='First Name' onChange={(e) => setFirstNameLocal(e.target.value)} />
                            <input type="text" className='text-black p-1 w-20' value={lastNameLocal} placeholder='First Name' onChange={(e) => setFirstNameLocal(e.target.value)} />
                        </div>
                    :
                        <span>{firstName}{` `}{lastName}</span>
                    }
                </div>
                <div>
                    <button title={isEditing ? "Save" : "Edit"} onClick={(e) => {
                        e.preventDefault()
                        if (isEditing) {
                            updateInviteeHandler()
                        }
                        setIsEditing(!isEditing)
                    }}>
                        <CustomIcon
                            fileName={isEditing ? "bootstrap-check" : "bootstrap-pencil"}
                            height={16}
                            width={16}
                            className="text-white"
                        />
                    </button>
                    {!isEditing && <button title="Delete" onClick={() => deleteInviteeHandler()}>
                        <CustomIcon 
                            fileName='bootstrap-x-lg'
                            height={16}
                            width={16}
                            className="text-white"
                        />
                    </button>}
                </div>
            </div>
        </div>
    )
}
