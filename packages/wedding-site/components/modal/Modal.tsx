import React, { PropsWithChildren } from 'react'
import CustomIcon from '../CustomIcon'

interface ModalProps extends PropsWithChildren {
    title: string,
    isOpen: boolean
    closeHandler: () => void
}

const Modal: React.FC<ModalProps> = ({
    title,
    children,
    isOpen,
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
            <div className="fixed top-1/2 z-40 rounded-sm left-1/2 w-1/2 bg-white p-5 modal">
                <div className="inline-flex w-full items-center">
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
