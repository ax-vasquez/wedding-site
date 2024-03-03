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

const PageLayout: React.FC<PageLayoutProps> = ({
    pageTitle,
    children
}) => {
    const dispatch = useDispatch()
    return (
        <div className="h-full">
            <Head>
                <title>L & M Wedding | {pageTitle}</title>
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
                    className="text-white hover:text-white"
                />
            </div>
            <main>
                {children}
            </main>
        </div>
    )
}

export default PageLayout
