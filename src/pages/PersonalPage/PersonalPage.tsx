import React, { useEffect, useState } from 'react'
import MyModal from '../../components/UI/MyModal'
import { useAuthStore, usePersonalStore } from '../../stores'
import { IAuth } from '../../types/auth'
import AddPersonal from './AddPersonal'
import PersonalCard from './PersonalCard'
import "./PersonalPage.scss"


interface IProps {
    personal: "authors" | "moderators"
}

const PersonalPage: React.FC<IProps> = ({ personal }) => {
    const { user } = useAuthStore(state => state)
    const { clearInvite } = usePersonalStore(state => state)
    const [authors, setAuthors] = useState<IAuth[]>([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        const newUsers = []

        for (let i = 0; i < 0; i++) {
            newUsers.push(user)
        }

        setAuthors(newUsers)
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
            }</h1>
            {authors.length === 0 &&
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
                {authors.map(item =>
                    <PersonalCard author={item} />
                )}
            </div>
            <MyModal isShow={show} setIsShow={setShow} title={`Добавление новго ${personal === "authors" ? "автора" : "модератора"} 😊`} >
                <AddPersonal personal={personal} />
            </MyModal>
        </main>
    )
}

export default PersonalPage