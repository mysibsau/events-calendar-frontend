import React from 'react';
import {NavLink} from 'react-router-dom';
import { useActionsAuth } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MyButton, { ButtonVariant } from '../UI/MyButton/MyButton';
import './Navbar.scss'

const Navbar = () => {
    const logo = require('../../assets/logo.png')
    const { user } = useTypedSelector(state => state.auth)
    const { fetchLogout } = useActionsAuth()

    const clickBtnLogout = () => {
        fetchLogout()
        window.location.reload()
    }

    return (
        <div className={'navbar'}>
            <nav>
                <div className={'navbar-left'}>
                    <NavLink to={'/'}>
                        <img src={logo} alt="logo"/>
                        <span style={{'color': 'black'}}>СибГУ им.Решетнева</span>
                    </NavLink>
                </div>
                <div className={'navbar-center'}>
                    <ul>
                        <li><NavLink to={'/'}>Календарь</NavLink></li>
                        <li><NavLink to={'/my-events'}>Мои мероприятия</NavLink></li>
                        <li><NavLink to={'/authors'}>Мои авторы</NavLink></li>
                        <li><NavLink to={'/moderators'}>Модераторы</NavLink></li>
                    </ul>
                </div>
                <div className={'navbar-right'}>
                    {user.token
                        ? <div>
                            <span className={'username'}>{user.name}</span>
                            <MyButton onClick={() => clickBtnLogout()} variant={ButtonVariant.primary}>Выйти</MyButton>
                        </div>
                        : <div>
                            <MyButton variant={ButtonVariant.primary}>Вход</MyButton>
                            <MyButton variant={ButtonVariant.default}>Регистрация</MyButton>
                        </div>
                    }
                </div>
            </nav>
        </div>
    );
};

export default Navbar;