import React, { FormEvent, PropsWithChildren, useEffect, useState } from 'react'
import Modal from './Modal'
import axios, { AxiosError } from 'axios'
import styles from './AuthModal.module.scss'
import { useRouter } from 'next/navigation'

interface AuthModalProps {
    isLoggedIn: boolean
    showModal: boolean
    closeModal: () => void
}

// Should have parity with CustomClaims object in API codebase
export type UserClaims = {
    role: | `GUEST` | `INVITEE` | `ADMIN`
    first_name: string
    last_name: string
} | null

export const AuthModal: React.FC<AuthModalProps> = ({
    isLoggedIn,
    showModal,
    closeModal
}) => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [authError, setAuthError] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [existingUser, setExistingUser] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState('')
    const [inviteCode, setInviteCode] = useState('')

    /**
     * Front-end email validation just used as a general guide for the user to ensure the email formatting is correct. Actual
     * validation happens on the back end.
     */
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const emailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    useEffect(() => {
        setAuthError('')
    }, [email, firstName, lastName, existingUser, password, passwordVerify])

    useEffect(() => {
        setEmailIsValid(validateEmail(email))
    }, [email])

    const resetInputFields = () => {
        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
        setPasswordVerify('')
    }

    const loginHandler = (e: FormEvent) => {
        setLoading(true)
        e.preventDefault()
        // On successful login, http-only cookie is set with auth-token and refresh-token
        axios.post(`/api/login`, 
            {
                email,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }    
        )
        .catch((e: AxiosError<{ message: string }>) => {
            setAuthError(e.response?.data?.message || '')
        })
        .finally(() => {
            closeModal()
            resetInputFields()
            setLoading(false)
            router.push('/rsvp')
        })
    }

    const logoutHandler = (e: FormEvent) => {
        setLoading(true)
        e.preventDefault()
        // On successful login, http-only cookie is set with auth-token and refresh-token
        axios.post(`/api/logout`)
        .catch((e: AxiosError) => {
            window.alert(e.message)
        }).finally(() => {
            closeModal()
            resetInputFields()
            setLoading(false)
            router.push('/')
        })
    }

    const signupHandler = (e: FormEvent) => {
        setLoading(true)
        e.preventDefault()
        // On successful signup, http-only cookie is set with auth-token and refresh-token
        axios.post(`/api/signup`, 
            {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                invite_code: inviteCode,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }    
        )
        .catch((e: AxiosError<{ message: string }>) => {
            setAuthError(e.response?.data?.message || '')
        })
        .finally(() => {
            closeModal()
            resetInputFields()
            setLoading(false)
            router.push('/rsvp')
        })
    }

    return (
        <Modal
                title={isLoggedIn ? 'Logout' : (existingUser ?  `Login` : `Register`)}
                isOpen={showModal}
                closeHandler={() => {
                    if (isLoggedIn) {
                        closeModal()
                    }
                }}
                loading={loading}
            >
                {!isLoggedIn && <span className={styles.prompt}>{existingUser ? `Login` : `Register`} to RSVP{existingUser && ` or manage your preferences` }</span>}
                {isLoggedIn ?
                    
                    <form onSubmit={logoutHandler} className={styles.authForm}>
                        <button className={styles.logoutBtn} type="submit">Logout</button>
                    </form>
                :
                    <form onSubmit={existingUser ? loginHandler : signupHandler} className={styles.authForm}>
                        <input type='text' placeholder='Email' value={email} onChange={emailInputHandler} />
                        {!existingUser && <input type='text' placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)}/>}
                        {!existingUser && <input type='text' placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)}/>}
                        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
                        {!existingUser && <input type='password' placeholder='Verify Password' value={passwordVerify} onChange={e => setPasswordVerify(e.target.value)}/>}
                        {!existingUser && <input type='password' placeholder='Invite Code' value={inviteCode} onChange={e => setInviteCode(e.target.value)}/>}
                        <button type="submit" className={styles.submitBtn}>Submit</button>
                        <button className={styles.loginRegisterToggleBtn} onClick={(e) => {
                            e.preventDefault()
                            setExistingUser(!existingUser)
                        }}>{existingUser ? "New Guest?" : "Already Registered?"}</button>
                    </form>
                }
                <div className={styles.authErrorWrapper}>
                    <span>{authError}</span>
                </div>
            </Modal>
    )

}
