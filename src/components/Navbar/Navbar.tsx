import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconLogo } from '../../assets/Icons';
import { useAuthStore } from '../../stores';
import MyButton from '../UI/MyButton';
import './Navbar.scss'

const roles = {
    "author" : "Автор",
    "moder" : "Модератор",
    "admin" : "Администратор",
    "default" : "Милорд"
}

const Navbar = () => {
    const { logOut, user } = useAuthStore(state => state);

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
                    </NavLink>

                    <ul>
                        <li><NavLink to={'/my-events'}>Мои мероприятия</NavLink></li>
                        <li><NavLink to={'/create-event'}>Создать мероприятие</NavLink></li>
                        <li><NavLink to={'/authors'}>Мои авторы</NavLink></li>
                        <li><NavLink to={'/moderators'}>Модераторы</NavLink></li>
                    </ul>
                </div>
                <div className={'navbar-right'}>
                    <div>
                        <div className={'userInfo'}>
                            <span className={"name"}>{user.name}</span>
                            <span className={"role"}>{roles[`${user.role}`]}</span>
                        </div>
                        <MyButton onClick={() => clickBtnLogout()} variant={"primary"}>Выйти</MyButton>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;