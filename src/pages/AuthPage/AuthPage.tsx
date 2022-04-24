import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import MyButton, {ButtonVariant} from '../../components/UI/MyButton/MyButton';
import MyInput from '../../components/UI/MyInput/MyInput';
import MyLoader from '../../components/UI/MyLoader/MyLoader';
import {useActionsAuth} from '../../hooks/useActions';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import './AuthPage.scss'


const AuthInfo = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const {error, loading} = useTypedSelector(state => state.auth)
    const {fetchAuth} = useActionsAuth()

    const userIcon = require('../../assets/userIcon.png')
    const lockIcon = require('../../assets/lockIcon.png')
    const userPhoto = require('../../assets/userPhoto.png')


    const authentication = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetchAuth(login, password)
    }

    return (
        <main>
            <form onSubmit={authentication}>
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
                        id='password'
                    />
                    <MyButton variant={!loading ? ButtonVariant.primary: ButtonVariant.disabled} disabled={loading}>
                        {loading
                            ? <MyLoader height={20} width={20}/>
                            : <span>Вход</span>
                        }
                    </MyButton>
                    <Link to={'#'}>Нажмите, если забыли пароль</Link>
                    <MyButton variant={!loading ? ButtonVariant.default: ButtonVariant.disabled}>Создать
                        новый профиль</MyButton>
                </fieldset>
            </form>
        </main>
    );
}

export default AuthInfo;