import React from 'react'

interface PageLayoutProps {
    children?: any
}

const PageLayout: React.FC<PageLayoutProps> = ({
    children
}) => {
    return (
        <div className="">
            <main className=''>
                {children}
            </main>
        </div>
    )
}

export default PageLayout
