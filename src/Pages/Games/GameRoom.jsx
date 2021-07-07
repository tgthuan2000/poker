import React, { useEffect, useState } from 'react'
import './gameRoom.css'
import { useParams } from 'react-router'
import { Button } from '../../Components/Button'
import { gameData } from '../../Data'
import { Modal } from '../../Components/Modal'
import { MemberModal } from '../../Components/Member'
import { Room } from '../../Components/Room'
import { randomChart } from '../../Features'


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
        const random =  randomChart(10)
        setRoomList([
            {
                'room-id': random,
                'room-name': gameId + random,
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
            <div className="game-room-list">
                {rooms}
            </div>
        </div>

        {addRoom && 
            <Modal
                submitModal={handleSubmitAddRoom}
                cancleModal={() => setAddRoom(false)}
                header='Choose members'
                cancleText='Cancle'
                acceptText={data.length > 0 && 'Create!'}
            >
                {list}
            </Modal>
        }
        </>
    )
}

export default GameRooms