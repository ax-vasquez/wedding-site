import React, { FormEvent, PropsWithChildren, useEffect, useState } from 'react'
import Modal from './Modal'
import axios from 'axios'

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
    const [email, setEmail] = useState('')
    const [emailIsValid, setEmailIsValid] = useState(false)
    // Controls the login/signup form presentation - defaults to "true" so the login form is the default form
    const [existingUser, setExistingUser] = useState(true)
    const [authError, setAuthError] = useState('')
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
        setEmailIsValid(validateEmail(email))
    }, [email])

    const loginHandler = (e: FormEvent) => {
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
        ).then(() => {
            
        }).catch((e: Error) => {
            console.log(`Login error: `, e.message)
        }).finally(() => {
            closeModal()
        })
    }

    const signupHandler = async (e: FormEvent) => {
        // On successful signup, http-only cookie is set with auth-token and refresh-token
        axios.post(`/api/signup`, 
            {
                email,
                password,
                inviteCode,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }    
        ).catch(e => {
            console.log(`Signup error: `, e)
        }).finally(() => {
            closeModal()
        })
    }

    return (
        <Modal
                title={isLoggedIn ? 'Logout' : 'Login'}
                isOpen={showModal}
                closeHandler={() => closeModal()}
            >
                {isLoggedIn ?
                    
                    <form>
                        <span>Logout?</span>
                    </form>
                :
                    <form onSubmit={existingUser ? loginHandler : signupHandler}>
                        <input type='text' placeholder='Email' value={email} onChange={emailInputHandler} />
                        {(!emailIsValid && email.length > 0) && <span>Invalid email address...</span>}
                        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
                        {!existingUser && <input type='password' placeholder='Verify Password' value={passwordVerify} onChange={e => setPasswordVerify(e.target.value)}/>}
                        {!existingUser && <input type='password' placeholder='Invite Code' value={inviteCode} onChange={e => setInviteCode(e.target.value)}/>}
                        <button type="submit">Submit</button>
                        <button onClick={(e) => {
                            e.preventDefault()
                            setExistingUser(!existingUser)
                        }}>{existingUser ? "New User?" : "Existing User?"}</button>
                    </form>
                }
            </Modal>
    )

}
