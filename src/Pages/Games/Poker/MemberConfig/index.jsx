import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './index.css'
import { getLocalStorage, setLocalStorage } from '../../../../Data'
import { Button } from '../../../../Components/Button'
import Member, {MemberModal} from '../../../../Components/Member'
import { Modal, ModalMessage } from '../../../../Components/Modal'
import { Link } from 'react-router-dom'

const MemberConfig = ({ gameId, currentRoom, indexRoom }) => {
    const [option, setOption] = useState(false)
    const [room, setRoom] = useState(currentRoom)
    const [addMemberData, setAddMemberData] = useState([])
    const [message, setMessage] = useState({status: false, message: ''})

    const handleClick = useCallback((memberId) => {
        const index = addMemberData.findIndex(item => item === memberId);
        if(index === -1)
            setAddMemberData([...addMemberData, memberId])
        else{
            const temp = [...addMemberData]
            temp.splice(index, 1)
            setAddMemberData(temp)
        }
    }, [addMemberData])

    const ortherMembers = useMemo(() => getLocalStorage('member').filter(({id}) => !room['room-members'].includes(id))
        .map((item, index) => 
            <MemberModal
                key={index}
                name={item.name}
                color={item.color}
                onClick={() => handleClick(item.id)}
                active={addMemberData.includes(item.id)}
            />
    ), [room, addMemberData, handleClick])

    const handleSubmitAddMember = () => {
        setRoom({
            ...room,
            'room-members': [...room['room-members'], ...addMemberData]
        })
        setMessage(
            {
                status: true,
                message: 'Add member(s) success!!!'
            }
        )
    }

    useEffect(() => {
        // update localStorage
        const localStorage = getLocalStorage(gameId)
        localStorage.splice(indexRoom, 1, room)
        setLocalStorage(gameId+'Data', localStorage)

        // refresh state
        setAddMemberData([])
        setOption(false)
    }, [room, indexRoom, gameId])

    return (
        <div className='poker-member-config'>
            <div className="poker-member-config-header">
                <h4> Members Config </h4>
                <Button
                    outline
                    active={option}
                    onClick={() => setOption(true)}
                >
                    Add member
                </Button>
            </div>
            <div className="poker-member-body">
                <div className="poker-member-length">{room['room-members'].length} members</div>
                {useMemo(() => getLocalStorage('member').filter(({id}) => room['room-members'].includes(id))
                    .map((item, index) => 
                        <Member
                            key={index}
                            name={item.name}
                            color={item.color}
                        />
                    ), [room])
                }
            </div>
            {option &&
                <Modal
                    header={ortherMembers.length > 0 ? 'Choose members' : 'Message'}
                    btnClose={false}
                    overlayCancle={false}
                    cancleModal={() => setOption(false)}
                    cancleText='Cancle'
                    acceptText={addMemberData.length > 0 && 'Add'}
                    submitModal={handleSubmitAddMember}
                >
                   {ortherMembers.length > 0 ? ortherMembers :
                        <ModalMessage>
                            No members to add!<Link to='../../../users'>Add new member</Link>
                        </ModalMessage>
                    }
                </Modal>
            }
            {message.status &&
                <Modal
                    header='Message'
                    btnClose={false}
                    overlayCancle={false}
                    acceptText='Okay!!!'
                    submitModal={() => setMessage({status: false, message: ''})}
                >
                    <ModalMessage>
                        {message.message}
                    </ModalMessage>
                </Modal>
            }
        </div>
    )
}

export default MemberConfig
