import { IOrganizators } from "../../../../types/events";
import { IconCloseX } from "../../../../components/UI";
import "./Organizer.scss";

interface IProps {
    data: IOrganizators;
    removeOrganizators: (index: number) => void;
    editOrganizators: (index: number) => void;
    index: number;
}

const Organizer: React.FC<IProps> = ({
    data,
    removeOrganizators,
    editOrganizators,
    index,
}) => {
    return (
        <div className="organizer-data">
            <div
                className="organizer-data-name"
                onClick={() => editOrganizators(index)}
            >
                {data.name.replace(/(.+) (.).+ (.).+/, '$1 $2. $3.')}
            </div>
            <div onClick={() => removeOrganizators(index)}>
                <IconCloseX color={"default"} size={20} />
            </div>
        </div>
    );
};
export default Organizer;
