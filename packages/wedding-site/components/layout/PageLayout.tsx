import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import CustomIcon from '../CustomIcon'
import { useDispatch } from 'react-redux'
import { toggleShowSidebar } from '@/redux/sidebarSlice'
import Head from 'next/head'
import axios from 'axios'
import Modal from '../modal/Modal'
import { useUser } from '@/hooks/useUser'

interface PageLayoutProps {
    pageTitle: string
    children?: any
}

const PageLayout: React.FC<PageLayoutProps> = ({
    pageTitle,
    children
}) => {

    const userInSession = useUser()
    const [user, setUser] = useState(null as unknown as any)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inviteCode, setInviteCode] = useState('')
    const [showLoginModal, setShowLoginModal] = useState(false)

    useMemo(() => {
        if (userInSession.length > 0) {
            setUser(JSON.parse(userInSession))
        }
    }, [])

    const [name, setName] = useState(null as unknown as string)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (user && user.email) {
    //         axios.get(`http://localhost:8080/api/v1/login`)
    //             .then((res) => {
    //                 const {
    //                     first_name,
    //                     last_name
    //                 } = res.data
    //                 if (first_name && last_name) {
    //                     setName(`${first_name} ${last_name}`)
    //                 }
    //                 return null
    //             })
    //             .catch(e => console.error(e))
    //     }
    // }, [user])

    // TODO: Figure out the correct way to pass the CSRF token (synchronizer pattern)
    const loginHandler = async (e: FormEvent) => {
        e.preventDefault()
        axios.post(`http://localhost:8080/api/v1/login`, {
            data: {
                email,
                password,
                inviteCode,
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            console.log(`GOT RESPONSE: `, res)
        }).catch(e => {
            console.log(`AHHHH!! Error: `, e)
        })
        setShowLoginModal(false)
    }

    return (
        <div className="h-full">
            <Head>
                <title>{`L & M Wedding | ${pageTitle}`}</title>
            </Head>
            <Modal
                title={user ? 'Logout' : 'Login'}
                isOpen={showLoginModal}
                closeHandler={() => setShowLoginModal(false)}
            >
                {user ?
                    <span>Logout?</span>
                :
                    <form onSubmit={loginHandler}>
                        <input type='text' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
                        <input type='password' placeholder='Invite Code' value={inviteCode} onChange={e => setInviteCode(e.target.value)}/>
                        <button type="submit">Submit</button>
                    </form>
                }
            </Modal>
            <Sidebar />
            <div className='fixed top-5 left-5 z-20 rounded-lg hover:cursor-pointer'
                onClick={() => dispatch(toggleShowSidebar())}
            >
                <CustomIcon
                    id="sidebar-menu-button"
                    fileName="bootstrap-list"
                    height={48}
                    width={48}
                    className="text-white"
                />
            </div>
            <button className='fixed top-5 right-5 z-20 hover:cursor-pointer inline-flex items-center'
                onClick={() => setShowLoginModal(true)}
            >
                {/* When signed in, display the name if we have it, otherwise show their email address - when not signed in, show "Sign in" */}
                <span className='text-2xl text-white ml-4 hidden-on-mobile'>{user ? (name ? name : user.email) : `Sign In`}</span>
            </button>
            <main>
                {children}
            </main>
        </div>
    )
}

export default PageLayout
