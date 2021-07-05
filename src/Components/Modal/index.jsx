import React from 'react'
import { Button } from '../Button'
import './index.css'

const Modal = ({ children, header, acceptText, cancleText, btnClose = true, cancleModal, submitModal }) => {
    return (
        <>
            <div className='modal'>
                <div className="modal-header">
                    <h3 className="header-title">{header ? header : 'Modal header'}</h3>
                    {btnClose &&
                        <Button
                            icon='fas fa-times'
                            className='btnClose'
                            onClick={cancleModal}
                        />
                    }
                </div>
                <div className="modal-body">
                    { children }
                </div>
                <div className="modal-footer">
                    {cancleText &&
                        <Button
                            outline
                            onClick={cancleModal}
                        >{cancleText}</Button>
                    }
                    {acceptText &&
                        <Button
                            active
                            className='btnAccept'
                            onClick={submitModal}
                        >{acceptText}</Button>
                    }

                </div>
            </div>
            <div className="overlay" onClick={cancleModal}></div>
        </>
    )
}

const ModalList = ({children}) => <ul className="modal-list">{children}</ul>

const ModalListItem = ({icon, title, children, onClick, colorIcon}) => (
    <li className="modal-list-item" onClick={onClick} >
        <i className={`${icon} modal-item-icon`} style={{ color:colorIcon }} />
        <span className="modal-item-title">{children || title}</span>
    </li>
)


const ModalInput = ({children, onClick}) => (
    <div className="modal-input" onClick={onClick}>
        {children}
    </div>
)

export { Modal, ModalList, ModalListItem, ModalInput }
