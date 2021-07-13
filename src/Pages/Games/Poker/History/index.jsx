import React, { useEffect, useMemo, useState } from 'react'
import { PokerBody, PokerConfig, PokerHeader } from '..'
import {MemberShowPoint, MemberSetPoint} from '../../../../Components/Member'
import { Modal, ModalMessage } from '../../../../Components/Modal'
import { getLocalStorage } from '../../../../Data'
import { updateLocalStorage } from '../../../../Features'
import './index.css'

const History = ({ gameId, currentRoom, indexRoom }) => {
    const [room, setRoom] = useState(currentRoom)
    const [config, setConfig] = useState({status: false, value: [], index: 0})
    const [data, setData] = useState([])
    const [message, setMessage] = useState({status: false, message: ''})

    // room['room-rounds'] = [[{id, point},{},], [{},{},], [{},{},] , [{},{},], [{},{},]]
    const customRoom = useMemo(() => room['room-rounds'].map((round) => {
        const ids = round.map(({id}) => id)
        const members = getLocalStorage('member').filter(({id}) => ids.includes(id))
        return members.map((item, index) => {
            return {...item, point: round[index].point}
        })
    }),[room])

    const list = useMemo(() => customRoom.reverse().map((round, index) =>
        <div className='poker-history-wrap' key={index}>
            <PokerConfig
                text={`Round ${room['room-rounds'].length - index}`}
                icon='fas fa-pencil-alt'
                onClick={() =>
                    {
                        setConfig({ status: true, value: round, index: room['room-rounds'].length - index})
                        setData(room['room-rounds'][room['room-rounds'].length - index - 1])
                    }
                }
            />
            {round.map((item, index) => 
                <MemberShowPoint
                    key={index}
                    outline
                    name={item.name}
                    color={item.color}
                    point={item.point}
                />
            )}
        </div>
    ), [customRoom, room])

    useEffect(()=>{
        updateLocalStorage(gameId, indexRoom, room)
        setConfig({status: false, value: [], index: 0})
        setData([])
    }, [room, indexRoom, gameId])
    
    const handleSetPoint = (id, index, point) => {
        const tempData = [...data]
        tempData[index] = {id, point}
        setData(tempData)
    }
    const handleSubmitChangePoint = () => {
        const tempRoom = {...room}
        tempRoom['room-rounds'].splice(config.index - 1,1,data)
        setRoom(tempRoom)
        setMessage(
            {
                status: true,
                message: 'Change success!'
            }
        )
    }
    return (
        <>
            <div className='poker-history'>
                <PokerHeader headerText='History' />
                <PokerBody>
                    {list}
                </PokerBody>
            </div>
            {config.status &&
                <Modal
                    header={`Round ${config.index}`}
                    acceptText='Change!'
                    cancleText='Back'
                    btnClose={false}
                    overlayCancle={false}
                    cancleModal={() => setConfig({status: false, value: []})}
                    submitModal={handleSubmitChangePoint}
                >
                    {config.value.map((item, index) => 
                        <MemberSetPoint
                            key={index}
                            outline
                            name={item.name}
                            color={item.color}
                            id={item.id}
                            index={index}
                            currentPoint={item.point}
                            pointValue={handleSetPoint}
                        />
                    )
                    }
                </Modal>
            }

            {message.status &&
                <Modal
                    header='Message'
                    acceptText='Okay'
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

export default History
