import React from 'react';
import './styles/index.scss'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import MyEvents from "./pages/MyEvents/MyEvents";
import { useAuthStore } from './stores';
import CreateEnevntPage from './pages/CreateEnevntPage';
import CalendarPage from './pages/CalendarPage';


const App = () => {
    const { user } = useAuthStore(state => state)

    return (
        <BrowserRouter>
            {user.token
                ? <>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<CalendarPage />} />
                        <Route path="/my-events" element={<MyEvents />} />
                        <Route path="/authors" element={<MainPage />} />
                        <Route path="/create-event" element={<CreateEnevntPage />} />
                        <Route path="/moderators" element={<MainPage />} />
                    </Routes>
                </>
                : <Routes>
                    <Route path="/" element={<AuthPage />} />
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