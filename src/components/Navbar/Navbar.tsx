import React from 'react';
import { Link } from 'react-router-dom';
import { useActionsAuth } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MyButton, { ButtonVariant } from '../UI/MyButton/MyButton';
import './Navbar.scss'

const Navbar = () => {
    const logo = require('../../assets/logo.png')
    const { user } = useTypedSelector(state => state.auth)
    const { fetchLogout } = useActionsAuth()

    const clickBtnLogin = () => {
        
    }

    const clickBtnLogout = () => {
        fetchLogout()
        window.location.reload()
    }

    return (
        <div className={'navbar'}>
            <nav>
                <div className={'navbar-left'}>
                    <Link to={'/'}>
                        <img src={logo} alt="logo"/>
                        <span style={{'color': 'black'}}>СибГУ им.Решетнева</span>
                    </Link>
                </div>
                <div className={'navbar-center'}>
                    <ul>
                        <li><Link to={'/'}>Главная</Link></li>
                        <li><Link to={'/calendar'}>Календарь</Link></li>
                        <li><Link to={'/events'}>Мероприятия</Link></li>
                        <li><Link to={'/contacts'}>Контакты</Link></li>
                    </ul>
                </div>
                <div className={'navbar-right'}>
                    {user.token
                        ? <div>
                            <span className={'username'}>{user.name}</span>
                            <MyButton onClick={() => clickBtnLogout()} variant={ButtonVariant.primary}>Выйти</MyButton>
                        </div>
                        : <div>
                            <MyButton onClick={() => clickBtnLogin()} variant={ButtonVariant.primary}>Вход</MyButton>
                            <MyButton onClick={() => console.log('Регистрация')} variant={ButtonVariant.default}>Регистрация</MyButton>
                        </div>
                    }
                </div>
            </nav>
        </div>
    );
};

export default Navbar;