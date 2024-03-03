import { toggleShowSidebar } from '@/redux/sidebarSlice'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

interface OptionConfig {
    label: string
    to?: string
    href?: string
}

export interface SidebarOptionConfig {
    option: OptionConfig
    children?: {
        [child: number]: OptionConfig
    }
}

const SidebarOption: FunctionComponent<SidebarOptionConfig> = ({
    option
}) => {
  const dispatch = useDispatch()
    return (
      <div className='sidebar-option-row' id="sidebar-option">
        <Link href={option.to!} passHref onClick={() => dispatch(toggleShowSidebar())}>
          <div className='sidebar-option-row-content'>
            <span>
              {option.label}
            </span>
          </div>
        </Link>
      </div>
    )
}

export default SidebarOption
