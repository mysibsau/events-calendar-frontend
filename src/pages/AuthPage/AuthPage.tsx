import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconLock, IconUser } from '../../assets/Icons/Icons';
import MyButton from '../../components/UI/MyButton';
import MyInput from '../../components/UI/MyInput';
import MyLoader from '../../components/UI/MyLoader/MyLoader';
import { useAuthStore } from '../../stores';
import './AuthPage.scss'


const AuthPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState("")

    const { logIn, loading } = useAuthStore(state => state)

    const [params] = useSearchParams()

    const authentication = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        logIn(login, password, code)
    }

    useEffect(() => {
        const invite = params.get("invite")
        if (invite) {
            setCode(invite)
        }
    }, [params])

    return (
        <main className={'authPage'}>
            <form onSubmit={authentication}>
                <fieldset>
                    <h1>Вход</h1>
                    <p>Войдите в свой аккаунт</p>
                    <MyInput
                        inputIcon={<IconUser color={"primary"} />}
                        type="text"
                        placeholder='Введите ваш логин'
                        value={login}
                        onChange={(value) => setLogin(value)}
                        id='login'
                    />
                    <MyInput
                        inputIcon={<IconLock color={"primary"} />}
                        value={password}
                        onChange={(value) => setPassword(value)}
                        type="password"
                        placeholder='Введите ваш пароль'
                        id='password'
                    />
                    <MyButton variant={!loading ? "primary" : "disabled"}>
                        {loading
                            ? <MyLoader height={20} width={20} />
                            : <span>Вход</span>
                        }
                    </MyButton>
                </fieldset>
            </form>
        </main>
    );
}

export default AuthPage;