import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconLogo } from '../../assets/Icons';
import { useAuthStore } from '../../stores';
import MyButton from '../UI/MyButton';
import './Navbar.scss'

const roles = {
    0 : "Автор",
    1 : "Модератор",
    2 : "Администратор"
}

const Navbar = () => {
    const { logOut, user } = useAuthStore(state => state);
    const logo = require('../../assets/logo.jpg')

    const clickBtnLogout = () => {
        logOut()
        window.location.reload()
    }

    return (
        <div className={'navbar'}>
            <nav>
                <div className={'navbar-left'}>
                    <NavLink to={'/'} className={"logo"}>
                        <IconLogo />
                        {/* <img src={logo} alt="" /> */}
                    </NavLink>

                    <ul>
                        <li><NavLink to={'/create-event'}>Создать мероприятие</NavLink></li>
                        <li><NavLink to={'/events'}>Мои мероприятия</NavLink></li>
                        {user.role > 0 && <li><NavLink to={'/authors'}>Мои авторы</NavLink></li>}
                        {user.role > 1 && <li><NavLink to={'/moderators'}>Модераторы</NavLink></li>}
                    </ul>
                </div>
                <div className={'navbar-right'}>
                    <div>
                        <div className={'userInfo'}>
                            <span className={"name"}>{user.name}</span>
                            <span className={"role"}>{roles[`${user.role}`]}</span>
                        </div>
                        <div className={"buttons-container"}>
                            <MyButton onClick={() => clickBtnLogout()} variant={"secondary"}>Выйти</MyButton>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;