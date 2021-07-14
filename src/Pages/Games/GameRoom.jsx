import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './gameRoom.css'
import { useParams } from 'react-router'
import { Button, ButtonLink } from '../../Components/Button'
import { gameData, getLocalStorage, setLocalStorage } from '../../Data'
import { Modal, ModalComfirm } from '../../Components/Modal'
import { MemberModal } from '../../Components/Member'
import { Room } from '../../Components/Room'
import { getDateTime, mergeMembers, randomString, setMemberFormat } from '../../Features'
import PageEmpty from '../../Components/PageEmpty'


const GameRooms = () =>  {
    const { gameId } = useParams()
    const game = gameData.find(game => game.id === gameId)
    const [addRoom, setAddRoom] = useState(false)
    const [roomList, setRoomList] = useState(getLocalStorage(gameId))
    const [data, setData] = useState([])
    const [enterRoom, setEnterRoom] = useState(false)

    const handleClick = useCallback(id => {
        const index = data.findIndex(item => item === id);
        if(index === -1)
            setData([...data, id])
        else{
            const temp = [...data]
            temp.splice(index, 1)
            setData(temp)
        }
    }, [data])

    const list = useMemo(() => getLocalStorage('member').map((item, index) => 
        <MemberModal
            key={index}
            name={item.name}
            color={item.color}
            onClick={() => handleClick(item.id)}
        />
    ), [ handleClick ])
    
    useEffect(() => {
        setLocalStorage(gameId+'Data', roomList)
        // refresh state
        setAddRoom(false)
        setData([])
    },[ roomList, gameId])

    const handleSubmitAddRoom = () => {
        const dateTime = getDateTime()
        const random =  randomString(10)
        setRoomList([
            {
                'room-id': random,
                'room-name': gameId + '_' + random,
                'room-members': data.map(x => setMemberFormat(x)),
                'room-create-at': dateTime,
                'room-active': true,
                'room-rounds': [],
                'room-total-score': []
            },
            ...roomList
        ])
        setEnterRoom(true)
    }

    const rooms = useMemo(() => roomList.map((item, index) => {
        return (
            <Room
                key={index}
                name={item['room-name']}
                length={item['room-members'].length}
                createAt={item['room-create-at']}
                active={item['room-active']}
                members={!item['room-active'] && mergeMembers(item['room-members'], 'total').sort((a,b) => b.total - a.total).slice(0, 2)}
                link={`./${gameId}/${item['room-id']}/home`}
            />
        )
    }), [roomList, gameId])
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
                    onClick={() => setAddRoom(true)}
                    text='Click to add new room!!'
                    img='../img/empty-room.png'
                />
            }
        </div>

        {addRoom && 
            <Modal
                submitModal={handleSubmitAddRoom}
                cancleModal={() => {setAddRoom(false); setData([])}}
                header='Choose members'
                cancleText={list.length >= 2 && 'Cancle'}
                acceptText={data.length >= 2 && 'Create!'}
                btnClose={false}
                overlayCancle={false}
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
                            link={`./${gameId}/${roomList[0]['room-id']}/home`}
                        >Yes</ButtonLink>
                    </ModalComfirm>
            </Modal>
        }
        </>
    )
}

export default GameRooms