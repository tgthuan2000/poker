import React, { useEffect, useMemo, useState } from 'react'
import { PokerBody, PokerDesc, PokerHeader } from '..'
import { Button } from '../../../../Components/Button'
import { MemberShowPoint } from '../../../../Components/Member'
import { Modal, ModalMessage } from '../../../../Components/Modal'
import { getLocalStorage } from '../../../../Data'
import { updateLocalStorage } from '../../../../Features'
import './index.css'

const Home = ({ currentRoom, gameId, indexRoom }) => {
    const [modal, setModal] = useState(false)
    const [room, setRoom] = useState(currentRoom)
    const totals = useMemo(() => room['room-members'].map(id => {
        const total = room['room-rounds'].reduce((result, round) =>
            result + round.reduce((init, item)=>
                item.id === id ? init + item.point : init
            ,0)
        , 0)
        return {id, total}
    }), [room])
    
    const members = useMemo(() => getLocalStorage('member')
        .filter(({id}) => room['room-members'].includes(id))
        .map(item => {
            const index = totals.findIndex(x => x.id === item.id)
            return {...item, point: totals[index].total}
        }), [room, totals])

    const handleSubmitModal = () => {
        setModal(false)
        setRoom(
            {
                ...room,
                'room-active': false,

            }
        )
        window.location.replace("../");
    }

    useEffect(() => {
        updateLocalStorage(gameId, indexRoom, room)
    }, [room, gameId, indexRoom])
    return (
        <>
            <div className='poker-home'>
                <PokerHeader headerText='Home'>
                    {room['room-active'] && room['room-rounds'].length > 0 &&
                        <Button
                            outline
                            active={modal}
                            onClick={() => setModal(true)}
                        >Block</Button>
                    }
                </PokerHeader>
                <PokerBody>
                    <PokerDesc>Totals</PokerDesc>
                    {useMemo(() => 
                        members.sort((a, b) => b.point - a.point)
                        .map((item, index) =>
                            <MemberShowPoint
                                key={index}
                                outline
                                name={item.name}
                                color={item.color}
                                point={item.point}
                            />
                        )
                    , [members])
                    }
                </PokerBody>
            </div>
            {modal &&
                <Modal
                    header='Warning'
                    btnClose={false}
                    overlayCancle={false}
                    acceptText='End game!'
                    submitModal={handleSubmitModal}
                    cancleModal={() => setModal(false)}
                    cancleText='Cancle'
                >
                    <ModalMessage>
                        Finish this game!!!!
                    </ModalMessage>
                </Modal>
            }
        </>
    )
}

export default Home
