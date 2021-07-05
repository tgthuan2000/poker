import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Member from '../../Member/index.jsx'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Modal, ModalInput, ModalList, ModalListItem } from '../../Modal'
import { filter, search } from '../../../Features/feature'

export default function Users() {
    // Khai báo state, ref, ...
    const [check,setCheck] = useState(false);
    const [showModalOption, setShowModalOption] = useState({ status: false, index: null })
    const [showRenameModal,setShowRenameModal] = useState(false)
    const [acceptRename,setAcceptRename] = useState(false)
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    const inputValue = useRef()
    const renameInputValue = useRef()
    const [showAddMemberBtn,setShowAddMemberBtn] = useState(false)

    // Nhận dữ liệu từ localStorage và truyền vào state
    const [memberList, setMemberList] = useState(JSON.parse(localStorage.getItem('memberData')) || []);

    // Cập nhật localStorage khi memberList thay đổi
    useEffect(() => { localStorage.setItem('memberData', JSON.stringify(memberList)) }, [memberList]);

    // Copy memberList để tìm kiếm
    const [tempList,setTempList] = useState(memberList);

    // Duyệt copyList để render view
    const members = tempList.map((item, index) =>
        <Member
            key={index}
            name={item.name}
            optionHandleClick={() => handleClickOptionMember(index)}
        />
    );

    // Feature click option (dấu 3 chấm) member
    const handleClickOptionMember = (index) => {
        setShowModalOption(
            {
                status: true,
                index
            }
        )
    }

    // Feature tìm kiếm, lọc member
    const handleOnInput = () => {
        // tìm kiếm, lọc member
        setTempList(filter(memberList, inputValue, 'name'))
        if(!inputValue.current.value){
            setTempList(memberList)
        }
        // show btn Add
        setShowAddMemberBtn(search(memberList, inputValue, 'name'))
    };
    // Feature thêm member
    const handleClickAddMember = () => {
        setShowAddMemberBtn(false)
        setCheck(false)
        const data = [
            {
                name: inputValue.current.value.trim(),
            },
            ...memberList,
        ];
        setMemberList(data)
        setTempList(data)
    };

    // Feature submit modal rename
    const handleSubmitRenameModal = () => {
        setShowRenameModal(false)
        const newList = [...memberList]
        newList.forEach((item, index) => {
            if(index === showModalOption.index) item.name = renameInputValue.current.value.trim()
        })
        setMemberList(newList)
        setTempList(newList)
        setShowModalOption({ status: false, index: null })
        setAcceptRename(false)
    }

    // Feature submit modal delete
    const handleSubmitDeleteModal = () => {
        setShowDeleteModal(false)
        const newList = [...memberList]
        newList.splice(showModalOption.index,1)
        setMemberList(newList)
        setTempList(newList)
        setShowModalOption({ status: false, index: null })
        if(newList.length === 0) inputValue.current = null
    }
    return (
        <>
            <div className='user'>
                <div className='user-header'>
                    {/* Kiểm tra có hiển thị btn Add Member hay input */}
                    {check ?
                    <>
                        <Input
                            className="user-header-item user-header-input"
                            placeholder='Enter a new member name'
                            onInput={handleOnInput}
                            useRef={inputValue}
                            autoFocus
                        />
                        {/* Kiểm tra input value có hợp lệ ?  */}
                        { showAddMemberBtn ?
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
                                onClick={() => {setCheck(false); setTempList(memberList)}}
                            >
                                Back
                            </Button>
                        }
                    </>
                    :
                    <Button
                        className="user-header-item"
                        onClick={() => setCheck(true)}
                        icon='fas fa-plus'
                    >
                        Add Member
                    </Button>
                    }
                </div>
                <div className="user-list">
                    {/* Hiển thị memberList */}
                    { members.length > 0 && members }
                </div>
            </div>

            {/* Hiển thị modal option (3 chấm) */}
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
                                    setShowModalOption({status: false, index: showModalOption.index});
                                    setShowRenameModal(true);
                                }
                            }
                        > Rename </ModalListItem>
                        <ModalListItem
                            icon='fas fa-users'
                            // onClick={}
                        > Add group </ModalListItem>
                        <ModalListItem
                            icon='fas fa-trash-alt'
                            onClick={() =>
                                {
                                    setShowModalOption({status: false, index: showModalOption.index});
                                    setShowDeleteModal(true)
                                }
                            }
                        > Delete </ModalListItem>
                    </ModalList>
                </Modal>
            }

            {/* Hiển thị modal rename */}
            {showRenameModal && 
                <Modal 
                    cancleModal={() =>
                        {
                            setShowRenameModal(false);
                            setShowModalOption({status:true, index: showModalOption.index});
                            setAcceptRename(false)
                        }
                    }
                    submitModal={handleSubmitRenameModal}
                    header='Rename'
                    acceptText={acceptRename && 'Accept!'}
                    cancleText='Cancle'
                >
                    <ModalInput>
                        <Input
                            placeholder='Enter a new name'
                            useRef={renameInputValue}
                            autoFocus
                            onInput={() => setAcceptRename(search(memberList, renameInputValue, 'name'))}
                        />
                    </ModalInput>
                </Modal>
            }

            {/* Hiển thị modal add group */}
            
            {/* Hiển thị modal delete */}
            {showDeleteModal && 
                <Modal
                    cancleModal={() =>
                        {
                            setShowDeleteModal(false);
                            setShowModalOption({status:true, index: showModalOption.index})
                        }
                    }
                    submitModal={handleSubmitDeleteModal}
                    header='Delete member'
                    cancleText='Cancle'
                    acceptText='Yes, I do!'
                >
                    <span className='modal-delete-message'>
                        Do you want delete <b>{memberList[showModalOption.index].name}</b> ?
                    </span>
                </Modal>
            }
        </>
    )
}