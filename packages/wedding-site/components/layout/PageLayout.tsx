import React, { ChangeEvent, useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import CustomIcon from '../CustomIcon'
import { useDispatch } from 'react-redux'
import { toggleShowSidebar } from '@/redux/sidebarSlice'
import Head from 'next/head'
import Modal from '../Modal'
import axios, { AxiosError, AxiosResponse } from 'axios'

interface PageLayoutProps {
    pageTitle: string
    children?: any
}

async function loginUser({ email, password }: { email: string, password: string }) {
    const res = await axios.get('http://localhost:8080/login', {
        auth: {
            username: email,
            password
        },
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ email, password }),
    })
    return res as void | AxiosResponse<any, any>
}

const readCookie = async () => {
    try {
      const res = await axios.get('http://localhost:8080/read-cookie');
      
      if (res.data.screen !== undefined) {
        console.log(`VAL: `, res.data.screen)
        return res.data.screen
      }
    } catch (e) {
      console.log(e);
    }
    return null
}

const PageLayout: React.FC<PageLayoutProps> = ({
    pageTitle,
    children
}) => {

    const [screen, setScreen] = useState(null)
    const [isNewUser, setIsNewUser] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [email, setEmail] = useState(null as unknown as string)
    const [firstName, setFirstName] = useState(null as unknown as string)
    const [lastName, setLastName] = useState(null as unknown as string)
    const [inviteCode, setInviteCode] = useState(null as unknown as string)
    const [password, setPassword] = useState(null as unknown as string)
    const [confirmPassword, setConfirmPassword] = useState(null as unknown as string)

    const dispatch = useDispatch()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (email && password) {
            try {
                const loginRes = await loginUser({
                    email,
                    password
                })
                if (loginRes && loginRes.data.screen !== undefined) {
                    setScreen(loginRes.data.screen)
                    setIsModalOpen(false)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    useEffect(() => {
        readCookie()
            .then(screen => setScreen(screen))
      }, []);

    console.log(`SCREEN VALUE: `, screen)

    const formOptions = isNewUser ? [
        {
            label: `Email`,
            type: `email`,
            onChange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
        },
        {
            label: `First Name`,
            type: `text`,
            onChange: (e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)
        },
        {
            label: `Last Name`,
            type: `text`,
            onChange: (e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)
        },
        {
            label: `Invite Code`,
            type: `text`,
            onChange: (e: ChangeEvent<HTMLInputElement>) => setInviteCode(e.target.value)
        },
        {
            label: `Password`,
            type: `password`,
            onChange: (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
        },
        {
            label: `Confirm Password`,
            type: `password`,
            onChange: (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)
        }
    ] :
    [
        {
            label: `email`,
            type: `email`,
            onChange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
        },
        {
            label: `Password`,
            type: `password`,
            onChange: (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
        }
    ]

    return (
        <div className="h-full">
            <Head>
                <title>{`L & M Wedding | ${pageTitle}`}</title>
            </Head>
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
            <div className='fixed top-5 right-5 z-20 hover:cursor-pointer inline-flex items-center'
                onClick={() => setIsModalOpen(true)}
            >
                <CustomIcon
                    id="sidebar-menu-button"
                    fileName="bootstrap-people-circle"
                    height={48}
                    width={48}
                    className="text-white"
                />
                <span className='text-2xl text-white ml-4'>{(screen !== 'auth') ? `Some User` : `Sign In`}</span>
            </div>
            <Modal 
                title={isNewUser ? `Sign up` : `Sign in`}
                isOpen={isModalOpen}
                closeHandler={() => setIsModalOpen(false)}
            >
                <form
                    className='mt-8 sign-in-form flex flex-col'
                    onSubmit={handleSubmit}
                >
                    {(screen === 'auth') && 
                        formOptions.map((obj, idx) => {
                            return (
                                <label key={`sign-up-field-${idx}`} className='inline-flex w-full'>
                                    <p className='flex-1'>{obj.label}:</p>
                                    <input onChange={obj.onChange} className='items-end border rounded-md w-3/4 p-2' type={obj.type}/>
                                </label>
                            )
                        })
                    }
                    <button className='items-center' type="submit">{(screen !== 'auth') ? `Sign Out` : (isNewUser ? `Sign Up` : `Sign In`)}</button>
                </form>
                <div className="flex justify-center mt-10 text-morning-snow underline">
                    {/* NOTE: The text selection logic looks inverse, but it's correct; when isNewUser is true, the toggle should indicate that clicking it will revert to the "Existing User" form, and vice versa */}
                    <button onClick={() => setIsNewUser(!isNewUser)}>{isNewUser ? `Returning User?`: `New User?`}</button>
                </div>
            </Modal>
            <main>
                {children}
            </main>
        </div>
    )
}

export default PageLayout
