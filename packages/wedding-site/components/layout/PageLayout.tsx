import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import CustomIcon from '../CustomIcon'
import { useDispatch } from 'react-redux'
import { toggleShowSidebar } from '@/redux/sidebarSlice'
import Head from 'next/head'
import axios from 'axios'
import Image from 'next/image'
import useSessionStorage from '@/hooks/useSessionStorage'

interface PageLayoutProps {
    pageTitle: string
    children?: any
}

const PageLayout: React.FC<PageLayoutProps> = ({
    pageTitle,
    children
}) => {

    const [user, setUser] = useState(null as unknown as any)
    useMemo(() => {
        const userInSession = useSessionStorage('user')
        if (userInSession.length > 0) {
            setUser(JSON.parse(userInSession))
        }
    }, [])

    const [name, setName] = useState(null as unknown as string)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user && user.email) {
            axios.get(`/api/user/get`)
                .then((res) => {
                    const {
                        first_name,
                        last_name
                    } = res.data
                    if (first_name && last_name) {
                        setName(`${first_name} ${last_name}`)
                    }
                    return null
                })
                .catch(e => console.error(e))
        }
    }, [user])

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
            <a className='fixed top-5 right-5 z-20 hover:cursor-pointer inline-flex items-center'
                href={user ? '/api/auth/logout': '/api/auth/login'}
            >
                {user?.picture ? 
                    <Image alt="auth0-gravatar" src={user.picture} className='rounded-full' width={48} height={48}/>
                :
                    <CustomIcon
                        id="sidebar-menu-button"
                        fileName="bootstrap-people-circle"
                        height={48}
                        width={48}
                        className="text-white"
                    />
                }
                
                {/* When signed in, display the name if we have it, otherwise show their email address - when not signed in, show "Sign in" */}
                <span className='text-2xl text-white ml-4 hidden-on-mobile'>{user ? (name ? name : user.email) : `Sign In`}</span>
            </a>
            <main>
                {children}
            </main>
        </div>
    )
}

export default PageLayout
