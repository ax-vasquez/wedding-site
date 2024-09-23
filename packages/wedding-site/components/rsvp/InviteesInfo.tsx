import React, { useEffect, useState } from 'react'
import TextField from '../form/TextField'
import { UserInvitee } from '@/types'
import cs from 'clsx'
import styles from './InviteesInfo.module.scss'

interface InviteesInfoProps {

}

export const InviteesInfo: React.FC<InviteesInfoProps> = ({

}) => {

    const [creatingNewPlusOne, setCreatingNewPlusOne] = useState(false)
    const [plusOneFirstName, setPlusOneFirstName] = useState('')
    const [plusOneFirstNameLocal, setPlusOneFirstNameLocal] = useState('')
    const [plusOneLastName, setPlusOneLastName] = useState('')
    const [plusOneLastNameLocal, setPlusOneLastNameLocal] = useState('')

    const [invitees, setInvitees] = useState([] as unknown as UserInvitee[])

    useEffect(() => {

    }, [creatingNewPlusOne])

    return (
        <div className={cs(styles.container)}>
            <div className={styles.inviteesListWrapper}>
                <h2>Your invitees</h2>
                <ul>
                    {invitees.length > 0 ? 
                        invitees.map(invitee => <li>{invitee.first_name}{` `}{invitee.last_name}</li>)
                    :
                        <li className={styles.emptyListItem}>none</li>
                    }
                </ul>
                <button className='border'>Add Invitee</button>
            </div>
            {creatingNewPlusOne && (
                <form>
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
                </form>
            )}
        </div>
        
    )
}
