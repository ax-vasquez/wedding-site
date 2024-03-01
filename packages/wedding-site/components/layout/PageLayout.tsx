import React from 'react'

interface PageLayoutProps {
    children?: any
}

const PageLayout: React.FC<PageLayoutProps> = ({
    children
}) => {
    return (
        <div className="h-full">
            <main>
                {children}
            </main>
        </div>
    )
}

export default PageLayout
