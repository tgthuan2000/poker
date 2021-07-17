import React, { useEffect, useMemo, useState } from 'react'
import { PokerBody, PokerDesc, PokerHeader } from '..'
import { Button } from '../../../../Components/Button'
import { InitialMember } from '../../../../Components/Frames'
import { MemberShowPoint } from '../../../../Components/Member'
import { Modal, ModalMessage } from '../../../../Components/Modal'
import { getMembersId, mergeMembers, updateLocalStorage } from '../../../../Features'
import './index.css'

const Home = ({ currentRoom, gameId, indexRoom }) => {
    const [modal, setModal] = useState(false)
    const [room, setRoom] = useState(currentRoom)
    const [message, setMessage] = useState({status: false, message: ''})
    const totals = useMemo(() => getMembersId(room['room-members']).map(id => {
        const total = room['room-rounds'].reduce((result, round) =>
            result + round.reduce((init, item)=>
                item.id === id ? init + item.point : init
            ,0)
        , 0)
        return {id, total}
    }), [room])
    
    const members = useMemo(() => mergeMembers(room['room-members'], 'point', totals, 'total'), [room, totals])

    const handleSubmitModal = () => {
        setModal(false)
        setRoom(
            {
                ...room,
                'room-active': false,
                'room-members': totals
            }
        )
        setMessage(
            {
                status: true,
                message: 'Congratulation on finished this game!!!!'
            }
        )
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
                    <PokerDesc>Ranking</PokerDesc>
                    <div className="poker-body-wrap">
                        {useMemo(() => 
                            members.sort((a, b) => b.point - a.point)
                            .map((item, index) =>
                                item.awards[0] === 'initial' ?
                                <InitialMember key={index}>
                                    <MemberShowPoint
                                        name={item.name}
                                        color={item.color}
                                        point={item.point}
                                    />
                                </InitialMember>
                                :
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
                    </div>
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

            {message.status &&
                <Modal
                    header='Message'
                    btnClose={false}
                    overlayCancle={false}
                    acceptText='Done!'
                    submitModal={() => setMessage({})}
                >
                    <ModalMessage>
                        {message.message}
                    </ModalMessage>
                </Modal>
            }
        </>
    )
}

export default Home
