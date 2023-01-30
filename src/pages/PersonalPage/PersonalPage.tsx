import React, { useEffect, useState } from "react";
import { Button, Loader, Modal } from "../../components/UI";
import { useAuthStore, usePersonalStore } from "../../stores";
import AddPersonal from "./AddPersonal";
import PersonalCard from "./PersonalCard";
import "./PersonalPage.scss";

interface IProps {
    personal: "authors" | "moderators";
}

const PersonalPage: React.FC<IProps> = ({ personal }) => {
    const { user } = useAuthStore(state => state)
    const { clearInvite, getPersonal, personalList, loading } = usePersonalStore(
        (state) => state
    );
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (personal === "authors") {
            getPersonal(0, user.role === 2);
        } else {
            getPersonal(1, user.role === 2);
        }
    }, [personal]);

    const addAuthorHandler = () => {
        setShow(true);
    };

    useEffect(() => {
        if (!show) {
            clearInvite();
        }
    }, [show]);

    return (
        <main>
            <div className="header-container">
                <h1>Мои {personal === "authors" ? <>авторы</> : <>модераторы</>}</h1>
                <div className="add-authors-button-container">
                    <Button variant={"success"} onClick={addAuthorHandler}>Добавить {personal === "authors" ? "автора" : "модератора"}</Button>
                </div>
            </div>
            <div className="personal-page-table">
                <div className="table-header">
                    <div className="table-header-name">Имя</div>
                    <div className="table-header-specification">Должность</div>
                    <div className="table-header-phone">Телефон</div>
                    <div>Дата создания</div>
                    <div></div>
                </div>
                <div className={`authors-container${loading ? " loaded" : ""}`}>
                    {loading
                        ? <Loader />
                        : <>
                            {personalList.map((item) => (
                                <PersonalCard author={item} key={item.id} />
                            ))}
                        </>
                    }
                </div>
                <Modal
                    isShow={show}
                    setIsShow={setShow}
                    title={`Добавление новго ${personal === "authors" ? "автора" : "модератора"}`}
                >
                    <AddPersonal personal={personal} />
                </Modal>
            </div>
        </main>
    );
};

export default PersonalPage;
