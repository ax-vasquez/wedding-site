import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import CustomIcon from '../CustomIcon'
import { useDispatch } from 'react-redux'
import { toggleShowSidebar } from '@/redux/sidebarSlice'
import Head from 'next/head'

interface PageLayoutProps {
    pageTitle: string
    children?: any
}

const Modal: React.FC<{
    title: string
}> = ({
    title
}) => {
    return (
        <div>
            <div
                className="fixed z-30 w-full h-full bg-black opacity-80"
            />
            <div className="fixed top-1/3 z-40 rounded-sm left-1/2 w-1/2 bg-white p-5 modal">
                <div className="inline-flex w-full">
                    <h2 className="text-3xl flex-1">{title}</h2>
                    <button className="relative">X</button>
                </div>
            </div>
        </div>
    )
}

const PageLayout: React.FC<PageLayoutProps> = ({
    pageTitle,
    children
}) => {
    const dispatch = useDispatch()
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
            <div className='fixed top-5 right-5 z-20 hover:cursor-pointer inline-flex items-center'>
                <CustomIcon
                    id="sidebar-menu-button"
                    fileName="bootstrap-people-circle"
                    height={48}
                    width={48}
                    className="text-white"
                />
                <span className='text-2xl text-white ml-4'>Sign in</span>
            </div>
            <Modal 
                title='Sign In'
            />
            <main>
                {children}
            </main>
        </div>
    )
}

export default PageLayout
