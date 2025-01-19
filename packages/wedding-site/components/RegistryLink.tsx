import React from "react"
import styles from './RegistryLink.module.scss'

export const RegistryLink: React.FC = () => {
    const url = process.env.REGISTRY_URL
    return (
        <div className={styles.container}>
            <button 
                onClick={() => {
                    window.open(url, "_blank")
                }}
            >
                <span>🛍️ Visit our Wedding Gift Registry 🛍️</span> 
            </button>
        </div>
    )
}
