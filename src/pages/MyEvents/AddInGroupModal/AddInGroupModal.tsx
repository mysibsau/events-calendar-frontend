import React from 'react'
import { randomColors } from '../../../App';
import { useEventsStore } from '../../../stores'
import "./AddInGroupModal.scss";


interface IProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddInGroupModal: React.FC<IProps> = ({ setShowModal }) => {
    const { updateGroup, eventList, groupList } = useEventsStore(state => state);

    const updateGroupHanler = (groupId: number) => {
        const eventIds: number[] = []

        for (const event of eventList) {
            if (event.isChecked) {
                eventIds.push(event.id)
            }
        }

        for (const group of groupList) {
            if (group.id === groupId) {
                eventIds.push(...group.events.map(item => item.id))
            }
        }

        if (eventIds.length) {
            updateGroup({ events_ids: eventIds }, groupId)
            setShowModal(false)
        }
    }

    return (
        <div className='add-in-group-modal-container'>
            <h2>Выберите группу</h2>
            <div className='group-list-modal-container'>
                {groupList.map((item, index) =>
                    <div onClick={() => updateGroupHanler(item.id)} style={{backgroundColor: randomColors[index]}} className={"group-list-item"} key={item.id}>{item.name}</div>
                )}
            </div>
        </div>
    )
}

export default AddInGroupModal