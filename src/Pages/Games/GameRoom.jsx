import React, { useEffect, useState } from 'react'
import './gameRoom.css'
import { useParams } from 'react-router'
import { Button, ButtonLink } from '../../Components/Button'
import { gameData } from '../../Data'
import { Modal, ModalComfirm } from '../../Components/Modal'
import { MemberModal } from '../../Components/Member'
import { Room } from '../../Components/Room'
import { randomString } from '../../Features'
import PageEmpty from '../../Components/PageEmpty'


const GameRooms = () =>  {
    let { gameId } = useParams()
    const game = gameData.find(game => game.id === gameId)
    const [addRoom, setAddRoom] = useState(false)
    const memberList = JSON.parse(localStorage.getItem('memberData')) || []
    const [roomList, setRoomList] = useState(JSON.parse(localStorage.getItem('pokerData')) || [])
    const [data, setData] = useState([])
    const [enterRoom, setEnterRoom] = useState(false)

    const handleClick = id => {
        const index = data.findIndex(item => item === id);
        if(index === -1)
            setData([...data, id])
        else{
            const temp = [...data]
            temp.splice(index, 1)
            setData(temp)
        }
    }

    const list = memberList.map((item, index) => 
        <MemberModal
            key={index}
            name={item.name}
            color={item.color}
            onClick={() => handleClick(item.id)}
            active={data.includes(item.id)}
        />
    )
    useEffect(() => {
        localStorage.setItem('pokerData', JSON.stringify(roomList))
        // refresh state
        setAddRoom(false)
        setData([])
    },[ roomList ])

    const handleSubmitAddRoom = () => {
        const random =  randomString(10)
        setRoomList([
            {
                'room-id': random,
                'room-name': gameId + '_' + random,
                'room-members': data,
            },
            ...roomList
        ])
        setEnterRoom(true)
    }

    const rooms = roomList.map((item, index) => 
        <Room
            key={index}
            name={item['room-name']}
            length={item['room-members'].length}
            link={`./${gameId}/${item['room-id']}`}
        />
    )
    return (
        <>
        <div className='game-room'>
            <div className="game-room-header">
                <div className="game-name">
                    {game.name}
                </div>
                <Button
                    active={addRoom}
                    outline={!addRoom}
                    onClick={() => setAddRoom(true)}
                >
                    New room
                </Button>
            </div>
            {rooms.length > 0 ?
            <div className="game-room-list">
                {rooms}
            </div>
            :
            <PageEmpty
                text='Just add a new room!!!'
                img='empty-room.png'
            />
            }
        </div>

        {addRoom && 
            <Modal
                submitModal={handleSubmitAddRoom}
                cancleModal={() => setAddRoom(false)}
                header='Choose members'
                cancleText={list.length > 0 && 'Cancle'}
                acceptText={data.length >= 2 && 'Create!'}
            >
                {list.length >= 2 ? list :
                    <ModalComfirm height='35px'>
                        <ButtonLink
                            active
                            link='/users'
                            fullView
                        >At least 2 members! Add more</ButtonLink>
                    </ModalComfirm>
                }
            </Modal>
        }

        {enterRoom &&
            <Modal
                submitModal={handleSubmitAddRoom}
                cancleModal={() => setEnterRoom(false)}
                header='Enter Room Now!'
                overlayCancle={false}
                btnClose={false}
                >
                    <ModalComfirm>
                        <Button
                            onClick={() => setEnterRoom(false)}
                            fullView
                        >No</Button>
                        <ButtonLink
                            active
                            fullView
                            link={`./${gameId}/${roomList[0]['room-id']}`}
                        >Yes</ButtonLink>
                    </ModalComfirm>
            </Modal>
        }
        </>
    )
}

export default GameRooms