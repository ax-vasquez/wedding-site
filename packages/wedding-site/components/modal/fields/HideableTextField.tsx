import CustomIcon from '@/components/CustomIcon'
import React, { PropsWithChildren, useState } from 'react'
import styles from './HideableTextField.module.scss'

interface HideableTextFieldProps extends PropsWithChildren {
    value: string
    placeholder: string
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const HideableTextField: React.FC<HideableTextFieldProps> = ({
    value,
    placeholder,
    onChangeHandler
}) => {
    const [isHidden, setIsHidden] = useState(true)
    return (
        <div className={styles.container}>
            <input type={isHidden ? 'password' : 'text'} placeholder={placeholder} value={value} onChange={onChangeHandler}/>
            <button onClick={(e) => {
                e.preventDefault()
                setIsHidden(!isHidden)
            }}>
                <CustomIcon
                    id="show-hide-button"
                    fileName={isHidden ? `bootstrap-eye-slash` : `bootstrap-eye`}
                    height={16}
                    width={16}
                />
            </button>
        </div>
        
    )
}
