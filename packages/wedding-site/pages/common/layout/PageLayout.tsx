import React from 'react'

interface PageLayoutProps {
    children?: any
}

const PageLayout: React.FC<PageLayoutProps> = ({
    children
}) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <main>
                {children}
            </main>
        </div>
    )
}

export default PageLayout
