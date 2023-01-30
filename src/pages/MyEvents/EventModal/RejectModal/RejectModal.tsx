import React, { useState } from 'react'
import { Button, Textarea } from '../../../../components/UI'
import "./RejectModal.scss"


interface IProps {
    onConfirm: (msg?: string) => void;
}

const RejectModal: React.FC<IProps> = ({ onConfirm }) => {
    const [msg, setMsg] = useState("")

    return (
        <div className='reject-modal-container'>
            <div className='reject-modal-title'>
                Укажите причину отклонения мепроприятия:
            </div>
            <div className='reject-modal-textarea'>
                <Textarea value={msg} onChange={setMsg} maxLength={150} />
            </div>
            <div className='reject-modal-buttons_container'>
                <Button variant={"primary"} onClick={() => onConfirm()}>Отмена</Button>
                <Button variant={"danger"} onClick={() => onConfirm(msg)}>Отклонить</Button>
            </div>
        </div>
    )
}

export default RejectModal