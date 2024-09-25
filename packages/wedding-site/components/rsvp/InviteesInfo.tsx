import React, { FormEvent, useEffect, useState } from 'react'
import TextField from '../form/TextField'
import { UserInvitee } from '@/types'
import cs from 'clsx'
import styles from './InviteesInfo.module.scss'
import axios, { AxiosError, AxiosResponse } from 'axios'
import router from 'next/router'
import CustomIcon from '../CustomIcon'
import { InviteeRow } from './InviteeRow'

interface InviteesInfoProps {

}

export const InviteesInfo: React.FC<InviteesInfoProps> = ({

}) => {

    const [loadingInvitees, setLoadingInvitees] = useState(false)
    const [creatingNewPlusOne, setCreatingNewPlusOne] = useState(false)
    const [plusOneFirstName, setPlusOneFirstName] = useState('')
    const [plusOneLastName, setPlusOneLastName] = useState('')

    const [invitees, setInvitees] = useState([] as unknown as UserInvitee[])

    const resetAddPlusOneFields = () => {
        setPlusOneFirstName('')
        setPlusOneLastName('')
    }

    const loadInviteesHandler = () => {
        setLoadingInvitees(true)
        axios.get(`/api/user/invitees`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }    
        )
        .then((res: AxiosResponse<{ status: number, message: string, data: { users: UserInvitee[] } }>) => {
            setInvitees(res.data.data.users)
        })
        .finally(() => {
            setLoadingInvitees(false)
        })
    }

    useEffect(() => {
        loadInviteesHandler()
    }, [])

    const addInviteeHandler = (e: FormEvent) => {
        e.preventDefault()
        axios.post(`/api/user/add-invitee`, 
            {
                first_name: plusOneFirstName,
                last_name: plusOneLastName,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }    
        )
        .then(() => {
            resetAddPlusOneFields()
            loadInviteesHandler()
        })
        .catch((e: AxiosError<{ message: string }>) => {

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
                            <InviteeRow 
                                id={invitee.id}
                                firstName={invitee.first_name}
                                lastName={invitee.last_name}
                            />
                        </li>)
                    :
                        <li className={styles.emptyListItem}>none</li>
                    }
                </ul>
            </div>
            <div className={styles.addNewBtnWrapper}>
                <button className={styles.rsvpButton} onClick={() => setCreatingNewPlusOne(!creatingNewPlusOne)}>{creatingNewPlusOne ? `Hide Form` : `Add New`}</button>
            </div>
            {creatingNewPlusOne && (
                <form >
                    <TextField
                        localValue={plusOneFirstName}
                        currentValue={plusOneFirstName}
                        fieldLabel="First name"
                        onChangeHandler={(e) => setPlusOneFirstName(e.target.value)}
                    />
                    <TextField
                        localValue={plusOneLastName}
                        currentValue={plusOneLastName}
                        fieldLabel="Last name"
                        onChangeHandler={(e) => setPlusOneLastName(e.target.value)}
                    />
                    <div className={styles.addInviteeWrapper}>
                        <button className={styles.rsvpButton} onClick={addInviteeHandler}>
                            Add Invitee
                        </button>
                    </div>
                </form>
            )}
        </div>
        
    )
}
