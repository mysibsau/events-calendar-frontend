import React, { useEffect } from 'react';
import './styles/index.scss'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import MyEvents from "./pages/MyEvents/MyEvents";
import { useAuthStore, useEventsStore } from './stores';
import CreateEnevntPage from './pages/CreateEnevntPage';
import EventPage from './pages/EventPage';
import MyNotification from './components/UI/MyNotification';
import AuthorsPage from './pages/AuthorsPage';


const App = () => {
    const { user } = useAuthStore(state => state)
    const {getData} = useEventsStore(state => state)

    useEffect(() => {
        getData()
    }, [])

    return (
        <BrowserRouter>
            {user.token
                ? <>
                    <Navbar />
                    <Routes>
                        <Route path="/events" element={<MyEvents />} />
                        <Route path="/events/:eventId" element={<EventPage />} />
                        <Route path="/authors" element={<AuthorsPage />} />
                        <Route path="/create-event" element={<CreateEnevntPage />} />
                        <Route path="/moderators" element={<MainPage />} />
                        <Route
                            path="*"
                            element={<Navigate to="/events" replace />}
                        />
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
            <MyNotification />
        </BrowserRouter>
    );
};

export default App;