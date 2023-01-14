import React, { SetStateAction, useState } from 'react'
import { Button, Input } from '../../../components/UI';
import { useEventsStore } from '../../../stores';


interface IProps {
    setShowModal: React.Dispatch<SetStateAction<boolean>>
}

const CreateGroupModal: React.FC<IProps> = ({ setShowModal }) => {
    const { createGroup, eventList } = useEventsStore(state => state)

    const [groupName, setGroupName] = useState("")

    const createGroupHandler = () => {
        const eventIds = []

        for (const event of eventList) {
            if (event.isChecked && !event.group) {
                eventIds.push(event.id)
            }
        }

        if (groupName.length) {
            createGroup({ events_ids: eventIds, name: groupName })
            setShowModal(false)
        }
    }

    return (
        <div>
            <div>
                Введите название группы
            </div>
            <div>
                <Input value={groupName} onChange={setGroupName} type={"text"} />
            </div>
            <Button onClick={createGroupHandler} variant={"primary"}>Создать группу</Button>
        </div>
    )
}

export default CreateGroupModal