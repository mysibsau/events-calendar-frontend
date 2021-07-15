import React from 'react';
import { Button } from '@material-ui/core';
import './Header.scss';


export default function Header() {

    const logout = () => {
        console.log('logout')
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('confirmed');
        window.location.reload();
    }

    return(
        <div className={'header-container'}>
            <h3>Календарь событий СибГУ</h3>
            <div className={'button-container'}>
            <Button onClick={() => logout()} type={'button'} className={'button'} variant={'contained'}>Выйти</Button>
            </div>
        </div>
    )
}