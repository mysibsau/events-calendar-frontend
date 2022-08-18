import classNames from 'classnames';
import React, { useState } from 'react';
import MyButton from '../../components/UI/MyButton';
import MyInput from '../../components/UI/MyInput';
import MyTextarea from '../../components/UI/MyTextarea';
import "./CreateEnevntPage.scss";

type TStep = "main" | "dop"

const CreateEnevntPage = () => {
    const [step, setStep] = useState<TStep>("main")

    const [val1, setVal1] = useState("")
    const [val10, setVal10] = useState("")
    const [val2, setVal2] = useState("")
    const [val3, setVal3] = useState("")
    const [val4, setVal4] = useState("")
    const [val5, setVal5] = useState("")
    const [val6, setVal6] = useState("")
    const [val7, setVal7] = useState("")
    const [val8, setVal8] = useState<string[]>([])

    return (
        <main className={"create-event"}>
            <h1>Создание мероприятия</h1>
            <div className={"create-event-container"}>
                <div className={"select-field"}>
                    <div className={"select-field__top"}>
                        <div className={classNames("select-field__top__item", { "active": step === "main" })} onClick={() => setStep("main")}>Основная информация</div>
                        <div className={classNames("select-field__top__item", { "active": step === "dop" })} onClick={() => setStep("dop")}>Дополнительная информация</div>
                    </div>
                    <div className={"select-field__bot"}>
                        <MyButton variant={"primary"}>Сохранить</MyButton>
                    </div>
                </div>
                <div className={"create-form"}>
                    <div className={"create-form__main"}>
                        <div className={"descriptions"}>
                            <div>
                                <label htmlFor={""}>Название мероприятия</label>
                                <MyInput value={val1} onChange={setVal1} type={"text"} id={""} />
                            </div>
                            <div>
                                <label htmlFor={""}>Место проведения</label>
                                <MyInput value={val3} onChange={setVal3} type={"text"} id={""} />
                            </div>
                            <div>
                                <label htmlFor={""}>Охват участников</label>
                                <MyInput value={val4} onChange={setVal4} type={"text"} id={""} />
                            </div>
                            <div>
                                <label htmlFor="">Описание мероприятия</label>
                                <MyTextarea maxLength={100} onChange={setVal10} value={val10} />
                            </div>
                        </div>
                        <div className={"dates"}>
                            <div className={"main-dates"}>
                                <div>
                                    <label htmlFor={""}>Дата начала</label>
                                    <MyInput value={val2} onChange={setVal2} type={"date"} id={""} />
                                </div>
                                <div>
                                    <label htmlFor={""}>Дата окончания</label>
                                    <MyInput value={val5} onChange={setVal5} type={"date"} id={""} />
                                </div>
                            </div>
                            <div className={"special-dates"}>
                                <h3>Специальные даты</h3>
                                <div className={"special-dates__input"}>
                                    <div>
                                        <label htmlFor="">Название даты</label>
                                        <MyInput value={val6} onChange={setVal6} type={"text"} id={""} />
                                    </div>
                                    <div>
                                        <label htmlFor="">Дата</label>
                                        <MyInput value={val7} onChange={setVal7} type={"date"} id={""} />
                                    </div>
                                    <div>
                                        <label htmlFor="" style={{opacity: 0}}>asd</label>
                                        <MyButton variant={"success"} onClick={() => setVal8(prev => [...prev, "1"])}>Добавить</MyButton>
                                    </div>
                                </div>
                                <div className={"special-dates__list"}>
                                    {val8.map(item => <div>Название и дата</div>)}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default CreateEnevntPage