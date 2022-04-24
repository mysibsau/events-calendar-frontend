import React from 'react';
import './index.scss'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { useTypedSelector } from './hooks/useTypedSelector';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import MyEvents from "./pages/MyEvents/MyEvents";


const App = () => {
    const {user} = useTypedSelector(state => state.auth)
    
    return (
        <BrowserRouter>
            <Navbar />
            {user.token
                ? <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/my-events" element={<MyEvents />} />
                    <Route path="/authors" element={<MainPage/>} />
                    <Route path="/moderators" element={<MainPage/>} />
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