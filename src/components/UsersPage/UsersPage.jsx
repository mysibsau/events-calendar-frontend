import React from 'react';
import './UsersPage.scss'
import { getUsersApiCall } from '../../api/users';
import { CircularProgress } from '@material-ui/core';
import UserElement from './UserElement/UserElement';


export default function UsersPage(){
    const [usersData, setUsersData] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false)

    React.useEffect(() => {
        getUsers('/users/');
    }, [])

    const getUsers = async (url) => {
        const data = await getUsersApiCall(url);
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
            <div>
                {usersData.previous ? 
                <img className={'arrow active'} onClick={() => getUsers(usersData.previous)} src="https://img.icons8.com/ios-glyphs/60/4a90e2/previous.png"/> : 
                <img className={'arrow inactive'} src="https://img.icons8.com/ios-glyphs/60/dddddd/previous.png"/>}
                {usersData.next ? 
                <img className={'arrow active'} onClick={() => getUsers(usersData.next)} src="https://img.icons8.com/ios-glyphs/60/4a90e2/next.png"/> :
                <img className={'arrow inactive'} src="https://img.icons8.com/ios-glyphs/60/dddddd/next.png"/>}
            </div>
        </div> : <CircularProgress style={{borderColor: '#006AB3', position: 'absolute', left: '50%', top: '45%'}}/>}
        </>
    )
}