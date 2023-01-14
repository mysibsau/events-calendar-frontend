import React, { useState } from 'react';
import { Button, Input } from '../../../../components/UI';
import { useEventsStore } from '../../../../stores';
import { IEvent } from '../../../../types/events';
import { IEventsGroup, IUpdateEventsGroup } from '../../../../types/groups';
import "./EditGroupModal.scss";


interface IProps {
    events: IEvent[];
    group: IEventsGroup;
}

const EditGroupModal: React.FC<IProps> = ({ events, group }) => {
    const { updateGroup, deleteGroup } = useEventsStore(state => state)

    const [name, setName] = useState(group.name)
    const [deleteEventList, setDeleteEventList] = useState<number[]>([])

    const onChangeDelete = (eventId: number) => {
        if (deleteEventList.includes(eventId)) {
            setDeleteEventList(deleteEventList.filter(item => item !== eventId))
        } else {
            setDeleteEventList(prev => [...prev, eventId])
        }
    }

    const editGroupHandler = () => {
        const data: IUpdateEventsGroup = {}

        data.events_ids = group.events.map(item => item.id).filter(item => !deleteEventList.includes(item))
        data.name = name

        if (data.events_ids.length) {
            updateGroup(data, group.id)
        } else {
            deleteGroup(group.id)
        }
    }

    return (
        <div className='edit-group-modal-container'>
            <div className='edit-group-container'>
                <div className='edit-name-container'>
                    <label htmlFor="editGroupName">Название группы</label>
                    <Input value={name} onChange={setName} type="text" id='editGroupName' />
                </div>
                <div className='edit-events-container'>
                    <div className='events-head'>
                        <div className='event-name'>Название мероприятия</div>
                        <div>Удалить из группы</div>
                    </div>
                    {events.map((item, index) =>
                        <div className='event-item' key={item.id}>
                            <div className='event-name'>
                                <label htmlFor={`delete-event-checkbox-${item.id}`}>
                                    {index + 1}. {item.name}
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" onChange={() => onChangeDelete(item.id)} id={`delete-event-checkbox-${item.id}`} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='buttons-container'>
                <Button variant={"primary"} onClick={editGroupHandler}>Сохранить</Button>
            </div>
        </div>
    )
}

export default EditGroupModal