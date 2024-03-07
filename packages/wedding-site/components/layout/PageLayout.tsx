import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import CustomIcon from '../CustomIcon'
import { useDispatch } from 'react-redux'
import { toggleShowSidebar } from '@/redux/sidebarSlice'
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0/client'

interface PageLayoutProps {
    pageTitle: string
    children?: any
}

const PageLayout: React.FC<PageLayoutProps> = ({
    pageTitle,
    children
}) => {

    const [screen, setScreen] = useState(null)

    const dispatch = useDispatch()

    return (
        <div className="h-full">
            <UserProvider>
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
                    href='/api/auth/login'
                >
                    <CustomIcon
                        id="sidebar-menu-button"
                        fileName="bootstrap-people-circle"
                        height={48}
                        width={48}
                        className="text-white"
                    />
                    <span className='text-2xl text-white ml-4'>{screen ? `Some User` : `Sign In`}</span>
                </a>
                <main>
                    {children}
                </main>
            </UserProvider>
        </div>
    )
}

export default PageLayout
