import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Sidebar.module.scss'
import SidebarOption, { SidebarOptionConfig } from './SidebarOption'
import { toggleShowSidebar } from '@/redux/sidebarSlice'
import kebabCase from '@/util/kebabCase'
import Image from 'next/image'

interface SidebarProps {
    
}

const SIDEBAR_OPTIONS = [
    {
        option: {
            label: `Home`,
            to: `/`
        }
    },
    {
        option: {
            label: `RSVP`,
            to: `/rsvp`
        }
    },
    {
        option: {
            label: `Venue`,
            to: `/venue`
        }
    },
    {
        option: {
            label: `Travel`,
            to: `/travel`
        }
    },
    {
        option: {
            label: `Preparation`,
            to: `/preparation`
        }
    },
    {
        option: {
            label: `Itinerary`,
            to: `/itinerary`
        }
    },
] as SidebarOptionConfig[]

const Sidebar: FunctionComponent<SidebarProps> = () => {

    const dispatch = useDispatch()
    const isSidebarOpen = useSelector((state: any) => state.nav.showSidebar)

    useEffect(() => {
        /**
         * Handler to close the sidebar when the user clicks outside of it
         * 
         */
        const handleClickOutside = (event: MouseEvent) => {
            const sidebarElement = document.getElementById(`sidebar`)
            const sidebarButton = document.getElementById(`sidebar-menu-button`)
            if (sidebarElement && sidebarButton) {
                if (!sidebarElement.contains(event.target as Node) && !sidebarButton.contains(event.target as Node)) {
                    dispatch(toggleShowSidebar())
                }
            }
        }
        // Only add the handler when the sidebar is open
        if (isSidebarOpen) {
            document.addEventListener(`click`, handleClickOutside)
        }
        // Must remove the event listener on cleanup
        return () => {
            document.removeEventListener(`click`, handleClickOutside)
        }
    }, [isSidebarOpen, dispatch])

    return (
      <div id='sidebar' className={`${styles.sidebarContainer} ${isSidebarOpen ? undefined : styles.closed}`} onClick={(e) => null}>
        <div className={`inline-flex mb-12 w-full justify-center`}>
            <Image 
                src={`/logo.png`}
                height={128}
                width={128}
                alt="site-logo"
            />
            <div className={`flex items-center ${styles.sidebarLogoLabel}`}>
                <h2 className="text-6xl ml-4 text-white font-bold">Larah & Mando</h2>
                <span></span>
            </div>
        </div>
        <div>
            {SIDEBAR_OPTIONS.map(option => {
                const key = kebabCase(option.option.label)
                return (
                    <SidebarOption
                        key={`option-${key}`}
                        option={option.option}
                    />
                )
            })}
        </div>
      </div>
    )
}

export default Sidebar
