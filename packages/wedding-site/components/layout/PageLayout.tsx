import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import CustomIcon from '../CustomIcon'
import { useDispatch } from 'react-redux'
import { toggleShowSidebar } from '@/redux/sidebarSlice'

interface PageLayoutProps {
    children?: any
}

const PageLayout: React.FC<PageLayoutProps> = ({
    children
}) => {
    const dispatch = useDispatch()
    return (
        <div className="h-full">
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
