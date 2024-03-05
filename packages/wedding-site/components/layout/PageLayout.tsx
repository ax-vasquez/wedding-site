import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import CustomIcon from '../CustomIcon'
import { useDispatch } from 'react-redux'
import { toggleShowSidebar } from '@/redux/sidebarSlice'
import Head from 'next/head'
import Modal from '../Modal'

interface PageLayoutProps {
    pageTitle: string
    children?: any
}

const PageLayout: React.FC<PageLayoutProps> = ({
    pageTitle,
    children
}) => {
    const [isNewUser, setIsNewUser] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch()

    const formOptions = isNewUser ? [
        {
            label: `Email`,
            type: `email`
        },
        {
            label: `First Name`,
            type: `text`
        },
        {
            label: `Last Name`,
            type: `text`
        },
        {
            label: `Invite Code`,
            type: `text`
        },
        {
            label: `Password`,
            type: `password`
        },
        {
            label: `Confirm Password`,
            type: `password`
        }
    ] :
    [
        {
            label: `email`,
            type: `email`
        },
        {
            label: `Password`,
            type: `password`
        }
    ]

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
            <div className='fixed top-5 right-5 z-20 hover:cursor-pointer inline-flex items-center'
                onClick={() => setIsModalOpen(true)}
            >
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
                isOpen={isModalOpen}
                closeHandler={() => setIsModalOpen(false)}
            >
                <form
                    className='mt-8 sign-in-form'
                >
                    {formOptions.map((obj, idx) => {
                        return (
                            <label key={`sign-up-field-${idx}`} className='inline-flex w-full'>
                                <p className='flex-1'>{obj.label}:</p>
                                <input className='items-end border rounded-md w-3/4 p-2' type={obj.type}/>
                            </label>
                        )
                    })}
                </form>
                <div className="flex justify-center mt-10 text-morning-snow underline">
                    {/* NOTE: The text selection logic looks inverse, but it's correct; when isNewUser is true, the toggle should indicate that clicking it will revert to the "Existing User" form, and vice versa */}
                    <button onClick={() => setIsNewUser(!isNewUser)}>{isNewUser ? `Returning Users`: `New Users`}</button>
                </div>
            </Modal>
            <main>
                {children}
            </main>
        </div>
    )
}

export default PageLayout
