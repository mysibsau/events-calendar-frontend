import React from 'react';
import { Button } from '@material-ui/core';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useRights } from '../../helpers/UserRightsContext';


export default function Header() {
    const {isStaff} = useRights()

    const logout = () => {
        console.log('logout')
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('confirmed');
        localStorage.removeItem('id')
        window.location.reload();
    }

    const hello = ['Привет', 'Здравствуй', 'Доброго времени суток', 'Приветствую', 'Салют']

    const name = localStorage.getItem('name');

    return(
        <div className={'header-container'}>
            <Link to={'/'} style={{textDecoration: 'none'}}><h3>Календарь событий СибГУ</h3></Link>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {isStaff &&
                <>
                <Link to="/unverified" style={{display: 'flex', textDecoration: 'none', color: '#006AB3', flexDirection: 'column', justifyContent: 'center', marginRight: 20, fontFamily: 'Oswald', fontSize: 20, cursor: 'pointer'}}>
                Неверифицированные мероприятия
                </Link>
                <Link to="/users" style={{display: 'flex', textDecoration: 'none', color: '#006AB3', flexDirection: 'column', justifyContent: 'center', marginRight: 20, fontFamily: 'Oswald', fontSize: 20, cursor: 'pointer'}}>
                Пользователи
                </Link>
                </>}
             <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: 20, fontFamily: 'Oswald', fontSize: 20}}>
             {hello[Math.floor(Math.random() * hello.length)]}, {name}
             </div>
            <div className={'button-container'}>
            <Button onClick={() => logout()} type={'button'} className={'button'} variant={'contained'}>Выйти</Button>
            </div>
            </div>
        </div>
    )
}