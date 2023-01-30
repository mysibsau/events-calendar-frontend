import React from "react";
import { NavLink } from "react-router-dom";
import { IconlogOut } from "../UI/Icons";
import { useAuthStore } from "../../stores";
import "./Navbar.scss";

const roles = {
    0: "Автор",
    1: "Модератор",
    2: "Администратор"
};

const Navbar = () => {
    const { logOut, user } = useAuthStore((state) => state);

    const logo = require("../../assets/logo.jpg");

    const clickBtnLogout = () => {
        logOut();
        window.location.reload();
    };

    return (
        <div className={"navbar"}>
            <nav>
                <div className={"navbar-left"}>
                    <NavLink to={"/"} className={"logo"}>
                        <img src={logo} alt="" />
                    </NavLink>

                    <ul>
                        {user.role < 2 && (
                            <li>
                                <NavLink to={"/create-event"}>
                                    Создать мероприятие
                                </NavLink>
                            </li>
                        )}
                        {user.role < 2
                            ?
                            <li>
                                <NavLink to={"/events"}>Мои мероприятия</NavLink>
                            </li>
                            :
                            <li>
                                <NavLink to={"/events"}>Мероприятия</NavLink>
                            </li>
                        }
                        {user.role === 1 && (
                            <li>
                                <NavLink to={"/authors"}>Мои авторы</NavLink>
                            </li>
                        )}
                        {user.role > 1 && (
                            <>
                                <li>
                                    <NavLink to={"/moderators"}>Модераторы</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/authors"}>Авторы</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div className={"navbar-right"}>
                    <div>
                        <div className={"userInfo"}>
                            <span className={"name"}>{user.name}</span>
                            <span className={"role"}>
                                {roles[`${user.role}`]}
                            </span>
                        </div>
                        <div className={"buttons-container"}>
                            <span onClick={() => clickBtnLogout()}>
                                <IconlogOut size={30} color="black" />
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
