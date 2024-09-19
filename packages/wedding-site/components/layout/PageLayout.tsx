import React, { PropsWithChildren, useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import CustomIcon from '../CustomIcon'
import { useDispatch } from 'react-redux'
import { toggleShowSidebar } from '@/redux/sidebarSlice'
import Head from 'next/head'
import { AuthModal, UserClaims } from '../modal/AuthModal'
import { useCookies } from 'react-cookie'

interface PageLayoutProps extends PropsWithChildren {
    pageTitle: string
}

const PageLayout: React.FC<PageLayoutProps> = ({
    pageTitle,
    children
}) => {

    const [user, setUser] = useState(null as UserClaims)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    useEffect(() => {
        if (cookies.user) {
            const user: UserClaims = JSON.parse(cookies.user)
            setUser(user)
        }
    }, [cookies])

    const dispatch = useDispatch()

    return (
        <div className="h-full">
            <Head>
                <title>{`L & M Wedding | ${pageTitle}`}</title>
            </Head>
            <AuthModal 
                isLoggedIn={!!user}
                showModal={showAuthModal}
                closeModal={() => setShowAuthModal(false)}
            />
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
                onClick={() => setShowAuthModal(true)}
            >
                {/* When signed in, display the name if we have it, otherwise show their email address - when not signed in, show "Sign in" */}
                <span className='text-2xl text-white ml-4 hidden-on-mobile'>{user ? user.first_name : `Sign In`}</span>
            </button>
            <main>
                {children}
            </main>
        </div>
    )
}

export default PageLayout
