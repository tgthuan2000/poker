import React, { useEffect, useState } from 'react'
import './gameRoom.css'
import { useParams } from 'react-router'
import { Button, ButtonLink } from '../../Components/Button'
import { gameData } from '../../Data'
import { Modal } from '../../Components/Modal'
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

    const handleClick = (id) => {
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
                'list-member-ids': data
            },
            ...roomList
        ])
    }

    const rooms = roomList.map((item, index) => 
        <Room
            key={index}
            name={item['room-name']}
            length={item['list-member-ids'].length}
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
                {list.length > 0 ? list :
                    <ButtonLink
                        active
                        link='/users'
                    >Go to add member!</ButtonLink>
                }
            </Modal>
        }
        </>
    )
}

export default GameRooms