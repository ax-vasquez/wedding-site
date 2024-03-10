import React from 'react'
import HighlightingLabelTag from './HighlightingLabelTag'
import cs from 'clsx'
import styles from './ToggleField.module.scss'

interface ToggleFieldProps {
    localSelection: boolean
    currentSelection: boolean
    fieldLabel: string
    optionALabel: string
    optionAHandler: () => void
    optionBLabel: string
    optionBHandler: () => void
}

const ToggleField: React.FC<ToggleFieldProps> = ({
    localSelection,
    currentSelection,
    fieldLabel,
    optionALabel,
    optionAHandler,
    optionBLabel,
    optionBHandler
}) => {
    return (
        <HighlightingLabelTag
            hasUnsavedChange={localSelection !== currentSelection}
        >
            <div className={cs(`inline-flex w-full`, styles.fieldContent)}>
                <span>{fieldLabel}</span>
                <div className={styles.optionWrapper}>
                    <input type="checkbox" checked={localSelection} onChange={optionAHandler}/>
                    <span>{optionALabel}</span>
                </div>
                <div className={styles.optionWrapper}>
                    <input type="checkbox" checked={!localSelection} onChange={optionBHandler}/>
                    <span>{optionBLabel}</span>
                </div>
            </div>
        </HighlightingLabelTag>
    )
}

export default ToggleField
