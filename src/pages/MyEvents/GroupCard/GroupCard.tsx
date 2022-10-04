import React from 'react'
import "./GroupCard.scss";
import { IEventsGroup } from '../../../types/events'
import EventCard from '../EventCard/EventCard';
import { useEventsStore } from '../../../stores';
import MyButton from '../../../components/UI/MyButton';


interface IProps {
    group: IEventsGroup;
}

const GroupCard: React.FC<IProps> = ({ group }) => {
    const { deleteGroup } = useEventsStore(state => state)

    const start_date = new Date(group.start_date).toLocaleDateString()
    const stop_date = new Date(group.stop_date).toLocaleDateString()

    return (
        <div className={"group-container"}>
            <details>
                <summary>
                    <div className={"group-info-container"}>
                        <div className={"left-content"}>
                            <h3>{group.name} (группа)</h3>
                            <div>Даты проведения: &nbsp;
                                {group.start_date === group.stop_date
                                    ? <span>{start_date}</span>
                                    : <span>с {start_date} по {stop_date}</span>
                                }
                            </div>
                            <div className={"description"}>
                                Описание: &nbsp;
                                {group.description}
                            </div>
                        </div>
                        <div className={"right-content"}>
                            <MyButton variant={"danger"} onClick={() => deleteGroup(group.id)}>Удалить группу</MyButton>
                        </div>
                    </div>
                </summary>
                <div className={"events-container"}>
                    {group.events.map(item =>
                        <EventCard event={item} key={item.id} />
                    )}
                </div>
            </details>
        </div>
    )
}

export default GroupCard