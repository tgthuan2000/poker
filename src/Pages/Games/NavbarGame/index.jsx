import React, { useEffect, useState } from 'react'
import './index.css'
import { gameData, getLocalStorage, setLocalStorage } from '../../../Data'
import { Link } from 'react-router-dom'
import { Modal, ModalMessage } from '../../../Components/Modal'
import { MemberModal } from '../../../Components/Member'

const NavbarGame = ({ gameId, roomId }) => {
    const game = gameData.find(item => item.id === gameId)
    const [option,setOption] = useState(false)
    const [addMemberModal, setAddMemberModal] = useState(false)
    const [roomList,setRoomList] = useState(getLocalStorage(gameId))
    const indexRoom = roomList.findIndex(item => item['room-id'] === roomId)
    const [currentRoom, setCurrentRoom] = useState(roomList[indexRoom])
    const otherMembers = getLocalStorage('member')
        .filter(({id}) => !currentRoom['room-members'].includes(id))
    const [newMemberData, setNewMemberData] = useState([])
    const [endGameModal, setEndGameModal] = useState(false)
    const [message,setMessage] = useState({status: false, message: ''})

    useEffect(() => {
        const rooms = getLocalStorage(gameId)
        rooms.splice(indexRoom , 1, currentRoom)
        setRoomList(rooms)
        setAddMemberModal(false)
        setNewMemberData([])
        setEndGameModal(false)
    }, [currentRoom, indexRoom, gameId]);

    useEffect(() => {
        setLocalStorage(gameId+'Data', roomList)
    }, [roomList, gameId]);

    const list = otherMembers.map((item, index) => 
        <MemberModal
            key={index}
            name={item.name}
            color={item.color}
            onClick={() => handleClick(item.id)}
            active={newMemberData.includes(item.id)}
        />
    )

    const handleClick = id => {
        const index = newMemberData.findIndex(item => item === id);
        if(index === -1)
            setNewMemberData([...newMemberData, id])
        else{
            const temp = [...newMemberData]
            temp.splice(index, 1)
            setNewMemberData(temp)
        }
    }

    const handleSubmitAddMember = () => {
        const temp = {...currentRoom}
        newMemberData.forEach(item => temp['room-members'].push(item))
        setCurrentRoom(temp)
        setMessage(
            {
                status: true,
                message: 'Add member(s) success!!'
            }
        )
    }

    const handleClickSubmitEndGame = () => {
        const temp = {...currentRoom}
        temp['room-active'] = false
        setCurrentRoom(temp)
        setMessage(
            {
                status: true,
                message: 'Congratulations on finishing the game !!!!!'
            }
        )
    }

    return (
        <>
            <div className='navGame'>
                <Link to={`../${gameId}`} className="navGame-left">
                    <i className="fas fa-arrow-left"></i>
                    <span>Room</span>
                </Link>
                <Link to='../../games' className="navGame-center">
                    <img src={`../../img/${game.iconImage}`} alt=" "/>
                    <span>{game.name}</span>
                </Link>
                {currentRoom['room-active'] ?
                    <div className={`navGame-right${option ? ' active': ''}`} onClick={() => setOption(!option)}>
                        <i className="fab fa-optin-monster"></i>
                        {option &&
                            <ul className="navGame-option-list">
                                <li className="navGame-option-item" onClick={() => setAddMemberModal(true)}>
                                    <img src={`../../img/${game.iconImage}`} alt=" "/>
                                    <span>Add members</span>
                                </li>
                                <li className="navGame-option-item" onClick={() => setEndGameModal(true)}>
                                    <img src={`../../img/${game.iconImage}`} alt=" "/>
                                    <span>End game!!!</span>
                                </li>
                            </ul>
                        }
                    </div>
                :
                    <div className='block' />
                }
            </div>
            {addMemberModal &&
                <Modal
                    header={list.length > 0 ? 'Choose members' : 'Message'}
                    btnClose={false}
                    overlayCancle={false}
                    cancleModal={() => setAddMemberModal(false)}
                    cancleText='Cancle'
                    acceptText={newMemberData.length > 0 && 'Add'}
                    submitModal={handleSubmitAddMember}
                >
                   {list.length > 0 ? list :
                        <ModalMessage>
                            No members to add!<Link to='../../users'>Add new member</Link>
                        </ModalMessage>
                    }
                </Modal>
            }

            {endGameModal &&
                <Modal
                    header='Warning!!!'
                    btnClose={false}
                    overlayCancle={false}
                    cancleModal={() => setEndGameModal(false)}
                    cancleText='Cancle'
                    acceptText='Yes, I do'
                    submitModal={handleClickSubmitEndGame}
                >
                    <ModalMessage>
                        The game will be locked if you agree.<br />
                        Do you want to finish the game?
                    </ModalMessage>
                </Modal>
            }

            {/* Hiện status */}
            {message.status &&
                <Modal
                    header='Message'
                    acceptText='Okay!!!'
                    btnClose={false}
                    submitModal={() => setMessage({status: false, message: ''})}
                >
                    <ModalMessage>
                        {message.message}
                    </ModalMessage>
                </Modal>
            }
        </>
    )
}

export default NavbarGame
