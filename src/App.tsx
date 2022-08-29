import React, { useEffect } from 'react';
import './styles/index.scss'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from './pages/AuthPage';
import MyEvents from "./pages/MyEvents/MyEvents";
import { useAuthStore, useEventsStore } from './stores';
import CreateEnevntPage from './pages/CreateEnevntPage';
import MyNotification from './components/UI/MyNotification';
import PersonalPage from './pages/PersonalPage';
import Navbar from './components/Navbar';


const App = () => {
    const { user } = useAuthStore(state => state)
    const { getData } = useEventsStore(state => state)

    useEffect(() => {
        if (user.token) {
            getData()
        }
    }, [user])

    return (
        <BrowserRouter>
            {user.token
                ? <>
                    <Navbar />
                    <Routes>
                        <Route path="/events" element={<MyEvents />} />
                        <Route path="/create-event/" element={<CreateEnevntPage edited={false} />} />
                        <Route path="/create-event/:eventId" element={<CreateEnevntPage edited={true} />} />
                        {user.role > 0 &&
                            <Route path="/authors/" element={<PersonalPage personal={"authors"} />} />
                        }
                        {user.role > 1 &&
                            <Route path="/moderators" element={<PersonalPage personal={"moderators"} />} />
                        }
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