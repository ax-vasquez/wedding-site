import React, { FormEvent, useEffect, useState } from 'react'
import TextField from '../form/TextField'
import { UserInvitee } from '@/types'
import cs from 'clsx'
import styles from './InviteesInfo.module.scss'
import axios, { AxiosError, AxiosResponse } from 'axios'
import router from 'next/router'
import CustomIcon from '../CustomIcon'

interface InviteesInfoProps {

}

export const InviteesInfo: React.FC<InviteesInfoProps> = ({

}) => {

    const [loadingInvitees, setLoadingInvitees] = useState(false)
    const [creatingNewPlusOne, setCreatingNewPlusOne] = useState(false)
    const [plusOneFirstName, _setPlusOneFirstName] = useState('')
    const [plusOneFirstNameLocal, setPlusOneFirstNameLocal] = useState('')
    const [plusOneLastName, _setPlusOneLastName] = useState('')
    const [plusOneLastNameLocal, setPlusOneLastNameLocal] = useState('')

    const [invitees, setInvitees] = useState([] as unknown as UserInvitee[])

    useEffect(() => {
        setLoadingInvitees(true)
        axios.get(`/api/user/invitees`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }    
        )
        .then((res: AxiosResponse<{ status: number, message: string, data: { users: UserInvitee[] } }>) => {
            console.log(`RES: `, res.data.data)
            setInvitees(res.data.data.users)
        })
        .catch((e: AxiosError<{ message: string }>) => {
            
        })
        .finally(() => {
            setLoadingInvitees(false)
        })

    }, [creatingNewPlusOne])

    const addInviteeHandler = (e: FormEvent) => {
        setLoadingInvitees(true)
        e.preventDefault()
        // On successful login, http-only cookie is set with auth-token and refresh-token
        axios.post(`/api/user/add-invitee`, 
            {
                first_name: plusOneFirstNameLocal,
                last_name: plusOneLastNameLocal,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }    
        )
        .then((res: AxiosResponse<{ status: number, message: string, data: { users: UserInvitee[] }}>) => {
            // console.log(`RES: `, res.data.data)
        })
        .catch((e: AxiosError<{ message: string }>) => {

        })
        .finally(() => {
            setLoadingInvitees(false)
        })
    }

    return (
        <div className={cs(styles.container)}>
            <div className={styles.heading}>
                <h2>Your invitees</h2>
            </div>
            <div className={styles.inviteesListWrapper}>
                <div className={cs(styles.inviteesListLoadingOverlay, loadingInvitees && styles.isLoading)} />
                <ul>
                    {invitees.length > 0 ? 
                        invitees.map(invitee => <li key={invitee.id}>
                            <span>{invitee.first_name}{` `}{invitee.last_name}</span>
                            <div>
                                <button title="Edit">
                                    <CustomIcon
                                        fileName="bootstrap-pencil"
                                        height={16}
                                        width={16}
                                        className="text-white"
                                    />
                                </button>
                                <button title="Delete">
                                    <CustomIcon 
                                        fileName='bootstrap-x-lg'
                                        height={16}
                                        width={16}
                                        className="text-white"
                                    />
                                </button>
                            </div>
                        </li>)
                    :
                        <li className={styles.emptyListItem}>none</li>
                    }
                </ul>
            </div>
            <button className={cs('border', styles.rsvpButton)} onClick={() => setCreatingNewPlusOne(!creatingNewPlusOne)}>{creatingNewPlusOne ? `Hide` : `Show`} Invitee Form</button>
            {creatingNewPlusOne && (
                <form >
                    <TextField
                        localValue={plusOneFirstNameLocal}
                        currentValue={plusOneFirstName}
                        fieldLabel="First name"
                        onChangeHandler={(e) => setPlusOneFirstNameLocal(e.target.value)}
                    />
                    <TextField
                        localValue={plusOneLastNameLocal}
                        currentValue={plusOneLastName}
                        fieldLabel="Last name"
                        onChangeHandler={(e) => setPlusOneLastNameLocal(e.target.value)}
                    />
                    <div className={styles.addInviteeWrapper}>
                        <button className={cs('border', styles.rsvpButton)} onClick={addInviteeHandler}>
                            Add Invitee
                        </button>
                    </div>
                </form>
            )}
        </div>
        
    )
}
