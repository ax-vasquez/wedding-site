import React from 'react'
import NavBar from '../nav/NavBar'

interface PageLayoutProps {
    children?: any
}

const PageLayout: React.FC<PageLayoutProps> = ({
    children
}) => {
    return (
        <div className="">
            <NavBar />
            <main className=''>
                {children}
            </main>
        </div>
    )
}

export default PageLayout
