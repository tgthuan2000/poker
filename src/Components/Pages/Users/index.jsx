import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Member from '../../Member/index.jsx'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Modal, ModalInput, ModalList, ModalListItem } from '../../Modal'

export default function Users() {
    const renameInputValue = useRef()
    const [showRenameModal,setShowRenameModal] = useState(false)
    const [showModalOption, setShowModalOption] = useState(
        {
            status: false,
            index: null
        }
    )
    const inputValue = useRef()
    const [check,setCheck] = useState(false);
    const [memberList, setMemberList] = useState(JSON.parse(localStorage.getItem('memberData')) || []);
    useEffect(() => { localStorage.setItem('memberData', JSON.stringify(memberList)) }, [memberList]);
    const [tempList,setTempList] = useState(memberList);
    const members = tempList.map((item, index) =>
        <Member
            key={index}
            name={item.name}
            optionHandleClick={() => handleClickOptionMember(index)}
        />
    );
    const handleClickOptionMember = (index) => {
        setShowModalOption(
            {
                status: true,
                index
            }
        )
    }
    const handleKeyup = () => {
        if(inputValue.current.value){
            setTempList(memberList.filter(item =>
                item.name.toLowerCase().search(inputValue.current.value.toLowerCase().trim()) !== -1
            ))
        }
        else setTempList(memberList)
    };
    const handleClickAddMember = () => {
        setCheck(!check)
        const data = [
            {
                name: inputValue.current.value,
            },
            ...memberList,
        ];
        setMemberList(data)
        setTempList(data)
    };
    const handleSubmitRenameModal = () => {
        setShowRenameModal(false)
        const newList = [...memberList]
        newList.forEach((item, index) => {
            if(index === showModalOption.index) item.name = renameInputValue.current.value
        })
        setMemberList(newList)
        setShowModalOption({ status: false, index: null })
    }
    return (
        <>
            <div className='user'>
                <div className="user-header">
                    {check ?
                    <>
                        <Input
                            className="user-header-item"
                            placeholder='New name member'
                            onKeyUp={handleKeyup}
                            useRef={inputValue}
                            autoFocus
                        />
                        { (members.length === 0 && inputValue !== '') ?
                            <Button
                                className="user-header-item"
                                active
                                onClick={handleClickAddMember}
                            >
                                Add
                            </Button>
                            :
                            <Button
                                className="user-header-item"
                                onClick={() => setCheck(!check)}
                            >
                                Back
                            </Button>
                        }
                    </>
                    :
                    <Button
                        className="user-header-item"
                        onClick={() => setCheck(!check)}
                        icon='fas fa-plus'
                    >
                        Add Member
                    </Button>
                    }
                </div>
                <div className="user-list">
                    { members.length > 0 && members }
                </div>
            </div>
            {showModalOption.status &&
                <Modal 
                    cancleModal={() => setShowModalOption({status: false, index: null})}
                    header='My option'
                >
                    <ModalList>
                        <ModalListItem
                            icon='fas fa-signature'
                            onClick={() =>
                                {
                                    setShowRenameModal(true);
                                    setShowModalOption({status: false, index: showModalOption.index})
                                }
                            }
                        > Rename </ModalListItem>
                        <ModalListItem
                            icon='fas fa-users'
                            // onClick={}
                        > Add group </ModalListItem>
                        <ModalListItem
                            icon='fas fa-trash-alt'
                            // onClick={}
                        > Delete </ModalListItem>
                    </ModalList>
                </Modal>
            }

            {showRenameModal && 
                <Modal 
                    cancleModal={() =>
                        {
                            setShowRenameModal(false);
                            setShowModalOption({status:true, index: showModalOption.index})
                        }
                    }
                    submitModal={handleSubmitRenameModal}
                    header='Rename'
                    acceptText='Accept!'
                    cancleText='Cancle'
                >
                    <ModalInput>
                        <Input
                            placeholder='Enter a new name'
                            useRef={renameInputValue}
                            autoFocus
                        />
                    </ModalInput>
                </Modal>
            }
        </>
    )
}