import React, { useEffect, useState } from 'react'
import './gameRoom.css'
import { useParams } from 'react-router'
import { Button } from '../../Components/Button'
import { gameData } from '../../Data'
import { Modal } from '../../Components/Modal'
import { MemberModal } from '../../Components/Member'

const GameRooms = () =>  {
    let { gameId } = useParams()
    const game = gameData.find(game => game.id === gameId)
    const [addRoom, setAddRoom] = useState(false)
    const memberList = JSON.parse(localStorage.getItem('memberData')) || []
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
            onClick={() => handleClick(item.id)}
        />
    )

    useEffect(() => {
        // refresh state
    },[  ])

    const handleSubmitAddRoom = () => {
        
    }

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
                Room1
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