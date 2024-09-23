import React, { PropsWithChildren } from 'react'
import CustomIcon from '../CustomIcon'
import { Spinner } from '../Spinner'
import styles from './Modal.module.scss'

interface ModalProps extends PropsWithChildren {
    title: string,
    isOpen: boolean,
    loading: boolean,
    closeHandler: () => void
}

const Modal: React.FC<ModalProps> = ({
    title,
    children,
    isOpen,
    loading,
    closeHandler
}) => {
    if (!isOpen) {
        return null
    }
    return (
        <div>
            <div
                className="fixed z-30 w-full h-full bg-black opacity-80"
            />
            <div className="fixed top-1/2 z-40 rounded-sm left-1/2 bg-white modal sm:w-1/2 md:w-1/2 lg:w-1/4">
                {loading && (
                    <div className={styles.spinnerWrapper}>
                        <Spinner />
                    </div>
                )}
                <div className="inline-flex w-full items-center pl-5 pr-5 pt-5">
                    <h2 className="text-3xl flex-1">{title}</h2>
                    <CustomIcon 
                        fileName='bootstrap-x-lg'
                        height={24}
                        width={24}
                        onClick={closeHandler}
                        className="hover:cursor-pointer"
                    />
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
