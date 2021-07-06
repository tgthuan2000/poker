import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Member from '../../Components/Member/index.jsx'
import { Button } from '../../Components/Button'
import { Input } from '../../Components/Input'
import { Modal, ModalInput, ModalList, ModalListItem } from '../../Components/Modal'
import { filter, search, randomString} from '../../Features/feature'

export default function Users() {
    // Khai báo state, ref, ...
    const [check,setCheck] = useState(false);
    const [showAddMemberBtn,setShowAddMemberBtn] = useState(false)
    const [showModalOption, setShowModalOption] = useState({ status: false, id: null })
    const [showRenameModal,setShowRenameModal] = useState(false)
    const [acceptRename,setAcceptRename] = useState(false)
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    const inputValue = useRef()
    const renameInputValue = useRef()

    // Nhận dữ liệu từ localStorage và truyền vào state
    const [memberList, setMemberList] = useState(JSON.parse(localStorage.getItem('memberData')) || []);

    // Copy memberList để tìm kiếm
    const [tempList,setTempList] = useState(memberList);

    // Cập nhật khi memberList thay đổi
    useEffect(() => {
        localStorage.setItem('memberData', JSON.stringify(memberList))
        setTempList(memberList)
        // refresh all sate
        setCheck(false)
        setShowAddMemberBtn(false)
        setShowModalOption({ status: false, id: null })
        setShowRenameModal(false)
        setAcceptRename(false)
        setShowDeleteModal(false)
        inputValue.current = null
        renameInputValue.current = null
    }, [memberList]);


    // Duyệt copyList để render view
    const members = tempList.map((item, index) =>
        <Member
            key={index}
            name={item.name}
            handleClickOption={() => setShowModalOption({ status: true, id: item.id })}
        />
    );

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
        const data = [
            {
                id: randomString(), // random id, default 5 chars
                name: inputValue.current.value.trim(),
            },
            ...memberList,
        ];
        setMemberList(data)
    };

    // Feature submit modal rename
    const handleSubmitRenameModal = () => {
        const newList = [...memberList]
        newList.forEach(item => {
            if(item.id === showModalOption.id) item.name = renameInputValue.current.value.trim()
        })
        setMemberList(newList)
    }

    // Feature submit modal delete
    const handleSubmitDeleteModal = () => {
        const newList = [...memberList]
        newList.splice(
            newList.findIndex(item => item.id === showModalOption.id),
            1
        )
        setMemberList(newList)
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
                    cancleModal={() => setShowModalOption({status: false, id: null})}
                    header='My option'
                >
                    <ModalList>
                        <ModalListItem
                            colorIcon='blue'
                            icon='fas fa-signature'
                            onClick={() =>
                                {
                                    setShowModalOption({status: false, id: showModalOption.id});
                                    setShowRenameModal(true);
                                }
                            }
                        > Rename </ModalListItem>
                        <ModalListItem
                            colorIcon='green'
                            icon='fas fa-gamepad'
                            // onClick={}
                        > Add games </ModalListItem>
                        <ModalListItem
                            colorIcon='red'
                            icon='fas fa-trash-alt'
                            onClick={() =>
                                {
                                    setShowModalOption({status: false, id: showModalOption.id});
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
                            setShowModalOption({status:true, id:showModalOption.id});
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
                            setShowModalOption({status:true, id:showModalOption.id})
                        }
                    }
                    submitModal={handleSubmitDeleteModal}
                    header='Delete member'
                    cancleText='Cancle'
                    acceptText='Yes, I do!'
                >
                    <span className='modal-delete-message'>
                        Do you want delete <b>{memberList.find(item => item.id === showModalOption.id).name}</b> ?
                    </span>
                </Modal>
            }
        </>
    )
}