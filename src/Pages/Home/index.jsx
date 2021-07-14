import React, { useEffect, useState } from 'react'
import { Button, ButtonLink } from '../../Components/Button'
import { Modal, ModalComfirm } from '../../Components/Modal'
import { getLocalStorage, setLocalStorage } from '../../Data'
import './index.css'

export default function Home() {
    const [enterRoom, setEnterRoom] = useState({})
    useEffect(() => {
        setEnterRoom(getLocalStorage('now'))
    }, [])
    return (
        <>
        <div className='home'>
            Home
        </div>
        {enterRoom.status &&
            <Modal
                header='Continue last game?'
                overlayCancle={false}
                btnClose={false}
                >
                    <ModalComfirm>
                        <Button
                            onClick={() => {setEnterRoom({}); setLocalStorage('nowData',{})}}
                            fullView
                        >No</Button>
                        <ButtonLink
                            active
                            fullView
                            link={enterRoom.link}
                        >Yes</ButtonLink>
                    </ModalComfirm>
            </Modal>
        }
        </>
    )
}
