import React from 'react';
import { Button, Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'
import './LoginPage.scss'
import logo from '../../assets/logo.png';
import { auth } from '../../api/auth';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


export default function LoginPage() {
    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const toLogin = async (e) => {
        e.preventDefault();
        const res = await auth(login, password);
        if (res) {
            setIsSuccess(true);
            localStorage.setItem('token', res.token);
            localStorage.setItem('name', res.name);
            localStorage.setItem('confirmed', res.confirmed);
            window.location.reload()
        } else {
            setIsError(true);
        }
    }

    return(
        <div className={'loginPage'}>
            <div className={'formContainer'}>
                <img src={logo} className={'logo'}/>
                <form className={'loginForm'} onSubmit={toLogin}>
                    <TextField required onChange={e => setLogin(e.target.value)} id="outlined-basic" className={'input'} label="Логин" variant="outlined" autoFocus/>
                    <TextField required onChange={e => setPassword(e.target.value)} id="outlined-basic" type={'password'} className={'input'} label="Пароль" variant="outlined" />
                    <Button className={'button'} type={'submit'} onSubmit={toLogin} variant="contained">Войти</Button>
                </form>
            </div>
            <Snackbar open={isSuccess} autoHideDuration={4000} onClose={() => setIsSuccess(false)} >
                <Alert severity="success">
                    Вы успешно вошли в систему
                </Alert>
            </Snackbar>
            <Snackbar open={isError} autoHideDuration={4000} onClose={() => setIsError(false)}>
                <Alert severity="warning">
                    Неверный логин или пароль
                </Alert>
            </Snackbar>
        </div>
    )
}