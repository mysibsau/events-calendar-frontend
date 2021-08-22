import React from 'react';
import './UserElement.scss';
import { Button } from '@material-ui/core';
import { banUserApiCall, confirmUserApiCall } from '../../../api/users';


export default function UserElement({userInfo}){
    const [user, setUser] = React.useState(userInfo)

    const ban = async () => {
        const data = await banUserApiCall(user.id)
        if (data) {
            setUser(data)
        }
    }

    const confirm = async () => {
        const data = await confirmUserApiCall(user.id)
        if (data) {
            setUser(data);
        }
    }

    return(
        <div className={'user-div'}>
            <p>{user.last_name} {user.first_name}</p>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            {user.is_active ? 
            <div onClick={() => ban()} className={'button-container'}><Button className={'button red'}>Забанить</Button></div> : 
            <div onClick={() => ban()} className={'button-container'}><Button className={'button blue'}>Разбанить</Button></div>}
            {user.confirmed ?
            <div onClick={() => confirm()} className={'button-container'}><Button className={'button red'}>Забрать права</Button></div> : 
            <div onClick={() => confirm()} className={'button-container'}><Button className={'button blue'}>Подтвердить</Button></div>}
            </div>
        </div>
    )
}