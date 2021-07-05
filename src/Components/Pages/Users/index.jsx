import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Member from '../../Member/index.jsx'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Modal, ModalList, ModalListItem } from '../../Modal'

export default function Users() {
    const [showModalOption, setShowModalOption] = useState(false)
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
    const handleClickOptionMember = (index) => (
        setShowModalOption(true)
    )
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
    return (
        <>
            <div className='user'>
                <div className="user-header">
                    {check ?
                    <>
                        <Input
                            className="user-header-item"
                            placeholder='New name member'
                            handleKeyup={handleKeyup}
                            useRef={inputValue}
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
            {showModalOption &&
                <Modal 
                    cancleModal={() => setShowModalOption(false)}
                    header='Tùy chỉnh'
                >
                    <ModalList>
                        <ModalListItem
                            icon='fas fa-signature'
                            // onClick={}
                        > Sửa tên </ModalListItem>
                    </ModalList>
                </Modal>
            }
        </>
    )
}