import React from 'react';
import './UsersPage.scss'
import { getUsersApiCall } from '../../api/users';
import { Button, CircularProgress } from '@material-ui/core';
import UserElement from './UserElement/UserElement';


export default function UsersPage(){
    const [usersData, setUsersData] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false)

    React.useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        const data = await getUsersApiCall();
        setUsersData(data);
        setIsLoaded(true)
    }
 
    return(
        <>
        {isLoaded ? 
        <div className={'users-div'}>
            {usersData.results.map(user => {
                return (
                    <UserElement userInfo={user}/>
                )
            })}
        </div> : <CircularProgress style={{borderColor: '#006AB3', position: 'absolute', left: '50%', top: '45%'}}/>}
        </>
    )
}