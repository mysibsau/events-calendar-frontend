import React, { useEffect, useState } from 'react'
import MyModal from '../../components/UI/MyModal'
import { useAuthStore, usePersonalStore } from '../../stores'
import AddPersonal from './AddPersonal'
import PersonalCard from './PersonalCard'
import "./PersonalPage.scss"


interface IProps {
    personal: "authors" | "moderators"
}

const PersonalPage: React.FC<IProps> = ({ personal }) => {
    const { user } = useAuthStore(state => state)
    const { clearInvite, getPersonal, personalList } = usePersonalStore(state => state)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (personal === "authors") {
            getPersonal(0)
        } else {
            getPersonal(1)
        }
    }, [])

    const addAuthorHandler = () => {
        setShow(true)
    }

    useEffect(() => {
        if (!show) {
            clearInvite()
        }
    }, [show])

    return (
        <main>
            <h1>Мои {personal === 'authors'
                ? <>авторы</>
                : <>модераторы</>
            }
            <span className={"addPers"} onClick={addAuthorHandler}>Добавить</span>
            </h1>
            {personalList.length === 0 &&
                <h2 style={{ "textAlign": "center" }}>У вас еще нету {personal === 'authors'
                    ? <>авторов</>
                    : <>модераторов</>
                } 😞. &nbsp;
                    <span className={"addContent"} onClick={addAuthorHandler}>
                        Добавить?
                    </span>
                </h2>
            }
            <div className={"authors-container"}>
                {personalList.map(item =>
                    <PersonalCard author={item} key={item.id} />
                )}
            </div>
            <MyModal isShow={show} setIsShow={setShow} title={`Добавление новго ${personal === "authors" ? "автора" : "модератора"} 😊`} >
                <AddPersonal personal={personal} />
            </MyModal>
        </main>
    )
}

export default PersonalPage