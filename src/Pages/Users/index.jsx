import React, { useState, useEffect, useRef,useMemo, useCallback } from 'react'
import './index.css'
import { MemberOption } from '../../Components/Member'
import { Button } from '../../Components/Button'
import { Input } from '../../Components/Input'
import { Modal, ModalInput, ModalList, ModalListItem, ModalMessage } from '../../Components/Modal'
import { filter, search, randomString, randomNumber, getMembersId, setMemberFormat} from '../../Features'
import PageEmpty from '../../Components/PageEmpty'
import { gameData, getLocalStorage, setLocalStorage } from '../../Data'
import { ModalRoom } from '../../Components/Room'

export default function Users() {
    // Khai báo state, ref, ...
    const [check,setCheck] = useState(false);
    const [showAddMemberBtn,setShowAddMemberBtn] = useState(false)
    const [showModalOption, setShowModalOption] = useState(false)
    const [valueOption, setValueOption] = useState('')
    const [showRenameModal,setShowRenameModal] = useState(false)
    const [acceptRename,setAcceptRename] = useState(false)
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    const [showAddGameModal, setShowAddGameModal] = useState(false)
    const [showAddRoomModal, setShowAddRoomModal] = useState(false)
    const [game, setGame] = useState('')
    const [roomData, setRoomData] = useState([])
    const inputValue = useRef()
    const renameInputValue = useRef()
    const [message, setMessage] = useState({status: false, message: ''})

    // Nhận dữ liệu từ localStorage và truyền vào state
    const [memberList, setMemberList] = useState(getLocalStorage('member'));
    
    // Lấy dữ liệu room
    const roomLists = useMemo(() => getLocalStorage('poker'), [])

    // Copy memberList để tìm kiếm
    const [tempList,setTempList] = useState(memberList);

    // Cập nhật khi memberList thay đổi
    useEffect(() => {
        setLocalStorage('memberData', memberList)
        setTempList(memberList)
        // refresh all sate
        setCheck(false)
        setShowAddMemberBtn(false)
        setShowModalOption(false)
        setValueOption('')
        setShowRenameModal(false)
        setShowDeleteModal(false)
        inputValue.current = null
        renameInputValue.current = null
        setRoomData([])
    }, [memberList]);
    
    // Duyệt copyList để render view
    const members = useMemo(() => tempList.map((item, index) => 
        <MemberOption
            key={index}
            name={item.name}
            outline
            color={item.color}
            optionClick={() => {setShowModalOption(true); setValueOption(item.id)}}
        />
    ), [tempList]);

    // Custom member
    // const members = useMemo(() => tempList.map((item, index) => 
    //     item.awards[0] === 'initial' ?
    //     <InitialMember key={index}>
    //         <MemberOption
    //             name={item.name}
    //             color={item.color}
    //             optionClick={() => {setShowModalOption(true); setValueOption(item.id)}}
    //         />
    //     </InitialMember>
    //     :
    //     <MemberOption
    //         key={index}
    //         name={item.name}
    //         outline
    //         color={item.color}
    //         optionClick={() => {setShowModalOption(true); setValueOption(item.id)}}
    //     />
    // ), [tempList]);

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
        setMemberList([
            {
                id: randomString(), // random id, default 5 chars
                color: randomNumber(),
                name: inputValue.current.value.trim(),
                awards: [],
            },
            ...memberList,
        ])
    };

    // Feature submit modal rename
    const handleSubmitRenameModal = () => {
        const newList = [...memberList]
        newList.forEach(item => {
            if(item.id === valueOption) item.name = renameInputValue.current.value.trim()
        })
        setMemberList(newList)
        setAcceptRename(false)
        setMessage(
            {
                status: true,
                message: 'Rename success!!!'
            }
        )
    }

    // Feature submit modal delete
    const handleSubmitDeleteModal = () => {
        const newList = [...memberList]
        newList.splice(
            newList.findIndex(item => item.id === valueOption),
            1
        )
        setMemberList(newList)

        // PokerData
        const tempRoomList = [...roomLists]
        tempRoomList.forEach(item => {
            let index = getMembersId(item['room-members']).indexOf(valueOption)
            if(index !== -1)
                item['room-members'].splice(index, 1)
        })
        // Duyệt xóa tất cả game!!!!
        setLocalStorage('pokerData', tempRoomList)

        setMessage(
            {
                status: true,
                message: 'Delete success!!!'
            }
        )
    }

    const handleSubmitAddRoomModal = () => {
        const tempRoomLists = [...roomLists]
        tempRoomLists.forEach(item => {
            if(roomData.includes(item['room-id']))
                item['room-members'].push(setMemberFormat(valueOption))
        })
        setLocalStorage(game+'Data', tempRoomLists)
        setGame('')
        setValueOption('')
        setShowAddRoomModal(false)
        setRoomData([])
        setMessage(
            {
                status: true,
                message: 'Add room(s) success!!'
            }
        )
    }

    const handleClickRoom = useCallback(roomId => {
        const index = roomData.findIndex(item => item === roomId);
        if(index === -1)
            setRoomData([...roomData, roomId])
        else{
            const temp = [...roomData]
            temp.splice(index, 1)
            setRoomData(temp)
        }
    }, [roomData])

    const rooms = useMemo(() => roomLists
        .filter(item => item['room-active'] && !getMembersId(item['room-members']).includes(valueOption))
        .map((item, index) => 
            <ModalRoom
                key={index}
                name={item['room-name']}
                createAt={item['room-create-at']}
                length={item['room-members'].length}
                onClick={() => handleClickRoom(item['room-id'])}
                active={roomData.includes(item['room-id'])}
            />
    ), [ valueOption, roomData, roomLists, handleClickRoom ])

    const games = useMemo(() => gameData.map((item, index) => 
        <ModalListItem
            key={index}
            img={`./img/${item.iconImage}`}
            onClick={() =>
                {
                    setShowAddGameModal(false)
                    setShowAddRoomModal(true)
                    setGame(item.id)
                }
            }
        > {item.name} </ModalListItem>
    ),[])

    return (
        <>
            <div className='user'>
                    {/* Kiểm tra có hiển thị btn Add Member hay input */}
                    <div className='user-header'>
                        {check ?
                        <>
                            <Input
                                className="user-header-input"
                                placeholder='Enter a new member name'
                                onInput={handleOnInput}
                                useRef={inputValue}
                                autoFocus
                            />
                            {/* Kiểm tra input value có hợp lệ ?  */}
                            { showAddMemberBtn ?
                                <Button
                                    active
                                    onClick={handleClickAddMember}
                                >
                                    Add
                                </Button>
                                :
                                <Button
                                    onClick={() => {setCheck(false); setTempList(memberList)}}
                                >
                                    Back
                                </Button>
                            }
                        </>
                        :
                        <>
                            {/* { members.length === 0 &&
                                <Button
                                    onClick={() => setMemberList(initialMember)}
                                    active
                                >
                                    Initial Members
                                </Button>
                            } */}
                            <Button
                                onClick={() => setCheck(true)}
                                icon='fas fa-plus'
                            >
                                Add Member
                            </Button>
                        </>
                        }
                    </div>
                    {/* Hiển thị memberList*/}
                    { members.length > 0 &&
                        <div className='user-list'>
                            {members}
                        </div>
                    }
                    {/* Hiển thị emptyPage*/}
                    {memberList.length === 0 &&
                        <PageEmpty
                            img='./img/add-user.png'
                            text='Click to add new member!'
                            onClick={() => setCheck(true)}
                        />
                    }
            </div>

            {/* Hiển thị modal option (3 chấm) */}
            {showModalOption &&
                <Modal 
                    cancleModal={() =>
                        {
                            setShowModalOption(false)
                            setValueOption('')
                        }
                    }
                    header='My option'
                >
                    <ModalList>
                        <ModalListItem
                            colorIcon='blue'
                            icon='fas fa-signature'
                            onClick={() =>
                                {
                                    setShowModalOption(false)
                                    setShowRenameModal(true);
                                }
                            }
                        > Rename </ModalListItem>
                        <ModalListItem
                            colorIcon='green'
                            icon='fas fa-gamepad'
                            onClick={() => 
                                {
                                    setShowModalOption(false)
                                    setShowAddGameModal(true);
                                }
                            }
                        > Add rooms </ModalListItem>
                        <ModalListItem
                            colorIcon='red'
                            icon='fas fa-trash-alt'
                            onClick={() =>
                                {
                                    setShowModalOption(false)
                                    setShowDeleteModal(true)
                                }
                            }
                        > Delete </ModalListItem>
                        {/* <ModalListItem
                            colorIcon='indianred'
                            icon='far fa-address-card'
                            // onClick={}
                        > Profile </ModalListItem>
                        <ModalListItem
                            colorIcon='indigo'
                            icon='fas fa-trophy'
                            // onClick={}
                        > Achievements </ModalListItem>
                        <ModalListItem
                            colorIcon='orange'
                            icon='fas fa-pencil-alt'
                            // onClick={}
                        > Change color </ModalListItem> */}
                    </ModalList>
                </Modal>
            }

            {/* Hiển thị modal rename */}
            {showRenameModal && 
                <Modal 
                    cancleModal={() =>
                        {
                            setShowRenameModal(false);
                            setShowModalOption(true);
                            setAcceptRename(false)
                        }
                    }
                    submitModal={handleSubmitRenameModal}
                    header='Rename'
                    acceptText={acceptRename && 'Accept!'}
                    cancleText='Cancle'
                    overlayCancle={false}
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
            {showAddGameModal &&
                <Modal 
                    cancleModal={() =>
                        {
                            setShowAddGameModal(false);
                            setShowModalOption({...showModalOption, status:true});
                        }
                    }
                    header='Choose game'
                    cancleText='Cancle'
                >
                    <ModalList>
                        {games}
                    </ModalList>
                </Modal>
            }

            {showAddRoomModal &&
                <Modal
                    cancleModal={() =>
                        {
                            setShowAddRoomModal(false);
                            setRoomData([])
                            setShowModalOption({...showModalOption, status:true});
                        }
                    }
                    submitModal={handleSubmitAddRoomModal}
                    header='Add Rooms'
                    cancleText='Cancle'
                    overlayCancle={false}
                    btnClose={false}
                    acceptText={roomData.length > 0 && 'Add'}
                >
                    {rooms.length > 0 ? rooms :
                        <ModalMessage>
                            No matching room found!!!
                        </ModalMessage>
                    }
                </Modal>
            }

            {/* Hiển thị modal delete */}
            {showDeleteModal && 
                <Modal
                    cancleModal={() =>
                        {
                            setShowDeleteModal(false);
                            setShowModalOption({...showModalOption, status:true})
                        }
                    }
                    submitModal={handleSubmitDeleteModal}
                    header='Delete member'
                    cancleText='Cancle'
                    acceptText='Yes, I do!'
                    overlayCancle={false}
                >
                    <ModalMessage>
                        Do you want delete <b>{memberList.find(item => item.id === valueOption)?.name}</b> ?
                    </ModalMessage>
                </Modal>
            }

            {/* Hiện status */}
            {message.status &&
                <Modal
                    header='Message'
                    acceptText='Done!'
                    btnClose={false}
                    submitModal={() => {setMessage({status: false, message: ''})}}
                >
                    <ModalMessage>
                        {message.message}
                    </ModalMessage>
                </Modal>
            }
        </>
    )
}