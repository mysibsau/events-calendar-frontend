import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyButton, { ButtonVariant } from '../../components/UI/MyButton/MyButton';
import MyInput from '../../components/UI/MyInput/MyInput';
import MyLoader from '../../components/UI/MyLoader/MyLoader';
import { useActionsAuth } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './AuthPage.scss'


const AuthInfo = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const {error, loading} = useTypedSelector(state => state.auth)
    const {fetchAuth} = useActionsAuth()

    const userIcon = require('../../assets/userIcon.png')
    const lockIcon = require('../../assets/lockIcon.png')
    const userPhoto = require('../../assets/userPhoto.png')


    const auntefication = () => {
        fetchAuth(
            login,
            password
        )
    }

    return (
        <main>
            {!loading && !error
                ?<form>
                    <fieldset>
                        <img src={userPhoto} alt=""/>
                        <h1>Вход</h1>
                        <p>Войдите в свой аккаунт</p>
                        <MyInput
                            img={userIcon}
                            type="text"
                            placeholder='Введите ваш логин'
                            value={login}
                            onChange={(value) => setLogin(value)}
                            id='login'
                        />
                        <MyInput
                            img={lockIcon}
                            value={password}
                            onChange={(value) => setPassword(value)}
                            type="password"
                            placeholder='Введите ваш пароль'
                            id='password1'
                        />
                        <MyButton onClick={() => auntefication()} variant={ButtonVariant.primary}>Войти</MyButton>
                        <Link to={'#'}>Нажмите, если забыли пароль</Link>
                        <MyButton onClick={() => console.log('Регистрация')} variant={ButtonVariant.default}>Создать
                            новый профиль</MyButton>
                    </fieldset>
                </form>
                : !error
                    ?<MyLoader />
                    :<h1>{error}</h1>
            }
        </main>
    );
}

export default AuthInfo;