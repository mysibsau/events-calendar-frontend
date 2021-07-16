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

    const name = localStorage.getItem('name');

    return(
        <div className={'header-container'}>
            <h3>Календарь событий СибГУ</h3>
            <div style={{display: 'flex', flexDirection: 'row'}}>
             <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: 20, fontFamily: 'Oswald', fontSize: 20}}>
             Привет, {name}
             </div>
            <div className={'button-container'}>
            <Button onClick={() => logout()} type={'button'} className={'button'} variant={'contained'}>Выйти</Button>
            </div>
            </div>
        </div>
    )
}