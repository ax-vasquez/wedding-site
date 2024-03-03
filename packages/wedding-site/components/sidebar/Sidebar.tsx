import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Sidebar.module.scss'
import SidebarOption, { SidebarOptionConfig } from './SidebarOption'
import { toggleShowSidebar } from '@/redux/sidebarSlice'
import kebabCase from '@/util/kebabCase'

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
    }
] as SidebarOptionConfig[]

const Sidebar: FunctionComponent<SidebarProps> = () => {

    const dispatch = useDispatch()
    const isSidebarOpen = useSelector((state: any) => state.nav.showSidebar)

    useEffect(() => {
        /**
         * Handler to close the sidebar when the user clicks outside of it
         * 
         */
        function outerClickHandler(e: any) {
            const sidebarElement = document.getElementById(`sidebar`)
            const sidebarButton = document.getElementById(`sidebar-menu-button`)
            if (sidebarElement && sidebarButton) {
                if (!sidebarElement.contains(e.target as Node) && !sidebarButton.contains(e.target as Node)) {
                    dispatch(toggleShowSidebar())
                }
            }
        }
        if (isSidebarOpen) {
            window.addEventListener(`click`, outerClickHandler)
        }
        // Must remove the event listener on cleanup
        return () => {
            window.removeEventListener(`click`, outerClickHandler)
        }
    }, [isSidebarOpen, dispatch])



    return (
      <div id='sidebar' className={`${styles.sidebarContainer} ${isSidebarOpen ? undefined : styles.closed}`}>
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
    )
}

export default Sidebar
