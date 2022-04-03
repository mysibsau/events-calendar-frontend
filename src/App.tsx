import React from 'react';
import './index.scss'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { useTypedSelector } from './hooks/useTypedSelector';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';


const App = () => {
    const {user} = useTypedSelector(state => state.auth)
    
    return (
        <BrowserRouter>
            <Navbar />
            {user.token
                ? <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/calendar" element={<h1>Календарь!</h1>} />
                    <Route path="/events" element={<h1>Мероприятия!</h1>} />
                    <Route path="/contacts" element={<h1>Контакты!</h1>} />
                </Routes>
                : <Routes>
                    <Route path="/" element={<AuthPage />}/>
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            }
        </BrowserRouter>
    );
};

export default App;