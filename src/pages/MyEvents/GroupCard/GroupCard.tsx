import React, { useState } from 'react'
import "./GroupCard.scss";
import EventCard from '../EventCard/EventCard';
import { useEventsStore } from '../../../stores';
import { IEventsGroup } from '../../../types/groups';
import { IconCloseX, IconGroup, ExpandableWrapper, IconSetting, Modal } from '../../../components/UI';
import EditGroupModal from './EditGroupModal';


interface IProps {
    group: IEventsGroup;
    color: string;
}

const GroupCard: React.FC<IProps> = ({ group, color }) => {
    const { deleteGroup } = useEventsStore(state => state)
    const [openGroup, setOpenGroup] = useState(false)

    const [editGroupModal, setEditGroupModal] = useState(false)

    return (
        <div className={`group-container${openGroup ? " open" : ""}`} style={{ backgroundColor: `${color}` }}>
            <div className={"group-info-container"}>
                <div className={"left-content"} onClick={() => setOpenGroup(!openGroup)}>
                    <h3><IconGroup color={"black"} size={25} /> {group.name} (группа)</h3>
                </div>
                <div className={"settings-container"} onClick={() => setEditGroupModal(true)}>
                    <IconSetting color={"default"} size={25} />
                </div>
                <div className={"right-content"} onClick={() => deleteGroup(group.id)}>
                    <IconCloseX color={"default"} size={25} />
                </div>
            </div>
            <div className={"events-container"}>
                {group.events.map(item =>
                    <ExpandableWrapper isExpanded={openGroup} key={item.id}>
                        <EventCard event={item} />
                    </ExpandableWrapper>
                )}
            </div>
            <Modal isShow={editGroupModal} setIsShow={setEditGroupModal} title={"Редактирование группы"}>
                <EditGroupModal events={group.events} group={group} />
            </Modal>
        </div>
    )
}

export default GroupCard