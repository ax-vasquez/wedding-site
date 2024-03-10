import React from 'react'
import HighlightingLabelTag from './HighlightingLabelTag'
import cs from 'clsx'
import styles from './TextField.module.scss'

interface TextFieldProps {
    localValue: string
    currentValue: string
    fieldLabel: string
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>
}

const TextField: React.FC<TextFieldProps> = ({
    localValue,
    currentValue,
    fieldLabel,
    onChangeHandler
}) => {
    return (
        <HighlightingLabelTag
            hasUnsavedChange={localValue !== currentValue}
        >
            <div className={cs(styles.container, "inline-flex w-full")}>
                <span className="flex-1">{fieldLabel}:</span>
                <input className='w-1/3 text-black p-2' type="text" value={localValue || ``} onChange={onChangeHandler}/>
            </div>
        </HighlightingLabelTag>
    )
}

export default TextField
