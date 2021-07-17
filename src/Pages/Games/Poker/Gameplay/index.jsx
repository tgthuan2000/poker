import React, { useEffect, useState } from 'react'
import './index.css'
import { PokerBody, PokerDesc, PokerHeader } from '..'
import { Button } from '../../../../Components/Button'
import {MemberSetPoint} from '../../../../Components/Member'
import { Modal, ModalMessage } from '../../../../Components/Modal'
import { getMembersCurrent, updateLocalStorage } from '../../../../Features'


const Gameplay = ({ gameId, currentRoom, indexRoom }) => {
    const [room, setRoom] = useState(currentRoom)
    const [submitModal, setSubmitModal] = useState(false)
    const [data, setData] = useState(room['room-members'])
    const [message, setMessage] = useState({status: false, message: ''})

    const getValuePoint = (id, index, point) => {
        const tempData = [...data]
        tempData[index] = {id, point}
        setData(tempData)
    }

    const handleSubmitResult = () => {
        const tempRoom = {...room}
        tempRoom['room-rounds'].push(data)
        setRoom(tempRoom)
        setMessage(
            {
                status: true,
                message: `Round ${room['room-rounds'].length} finished!!`
            }
        )
    }
    useEffect(()=>{
        // update localStorage
        updateLocalStorage(gameId, indexRoom, room)

        setSubmitModal(false)
        // refresh data
        setData(room['room-members'])
    }, [room, gameId, indexRoom])
    return (
        <>
            <div className='poker-gameplay'>
                <PokerHeader
                    headerText='Gameplay'
                >
                    {data.some(({point}) => point !== 0) &&
                        <Button
                            active
                            onClick={() => setSubmitModal(true)}
                        > Submit </Button>
                    }
                </PokerHeader>
                <PokerBody>
                    <PokerDesc>Round {room['room-rounds'].length +1}</PokerDesc>
                    <div className="poker-body-wrap">
                        {getMembersCurrent(room['room-members'])
                            .map((item, index) => 
                                <MemberSetPoint
                                    key={index}
                                    outline
                                    name={item.name}
                                    color={item.color}
                                    id={item.id}
                                    index={index}
                                    currentPoint={data[index].point}
                                    pointValue={getValuePoint}
                                />
                        )
                        }
                    </div>
                </PokerBody>
            </div>
            {submitModal &&
                <Modal
                    header='Message'
                    acceptText='Submit!'
                    cancleText='Cancle'
                    btnClose={false}
                    overlayCancle
                    submitModal={handleSubmitResult}
                    cancleModal={() => setSubmitModal(false)}
                >
                    <ModalMessage>
                        Accept submit result!!!!
                    </ModalMessage>
                </Modal>
            }
            {message.status &&
                <Modal
                    header='Message'
                    acceptText='Next Round'
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

export default Gameplay
