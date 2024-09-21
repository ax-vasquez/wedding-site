import React from 'react'
import styles from './Spinner.module.scss'

// From open-source spinners: https://loading.io/css/
export const Spinner: React.FC = () => {
    return (
        <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
    )
}
