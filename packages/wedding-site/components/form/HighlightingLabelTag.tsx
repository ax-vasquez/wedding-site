import React from 'react'
import styles from './HighlightingLabelTag.module.scss'
import cs from 'clsx'

interface HighlightingLabelTagProps {
    children: any
    hasUnsavedChange: boolean
}

const HighlightingLabelTag: React.FC<HighlightingLabelTagProps> = ({
    children,
    hasUnsavedChange
}) => {
    return (
        <div className={cs(styles.container, (hasUnsavedChange && styles.highlight ))}>
            <label>
                {children}
            </label>
        </div>
        
    )
}

export default HighlightingLabelTag
