import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconLock, IconUser } from '../../components/UI/Icons/Icons';
import { Button, Input, Loader } from '../../components/UI';
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
                    <Input
                        inputIcon={<IconUser color={"primary"} />}
                        type="text"
                        placeholder='Введите ваш логин'
                        value={login}
                        onChange={(value) => setLogin(value)}
                        id='login'
                    />
                    <Input
                        inputIcon={<IconLock color={"primary"} />}
                        value={password}
                        onChange={(value) => setPassword(value)}
                        type="password"
                        placeholder='Введите ваш пароль'
                        id='password'
                    />
                    <Button variant={!loading ? "primary" : "disabled"}>
                        {loading
                            ? <Loader />
                            : <span>Вход</span>
                        }
                    </Button>
                </fieldset>
            </form>
        </main>
    );
}

export default AuthPage;