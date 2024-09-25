import React from 'react'
import cs from 'clsx'
import styles from './CustomCheckbox.module.scss'
import CustomIcon from './CustomIcon'

interface CustomCheckboxProps {
    checked: boolean
    clickHandler: () => void
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    checked,
    clickHandler
}) => {
    return (
        <button className={cs(styles.container, checked && styles.containerChecked)} onClick={e => {
            e.preventDefault()
            clickHandler()
        }}>
            <CustomIcon
                fileName="bootstrap-snow"
                height={18}
                width={18}
                className={cs(styles.icon, !checked && styles.iconHidden)}
            />
        </button>
    )
}
