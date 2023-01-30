import React, { useEffect } from 'react';
import './styles/index.scss'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from './pages/AuthPage';
import MyEvents from "./pages/MyEvents/MyEvents";
import { useAuthStore, useEventsStore } from './stores';
import CreateEnevntPage from './pages/CreateEnevntPage';
import PersonalPage from './pages/PersonalPage';
import Navbar from './components/Navbar';
import { NotificationContainer } from './components/UI';
import CreateReportPage from './pages/CreateReportPage';


const groupColors = () => {
    const colors = []

    for (let i = 0; i < 1000; i++) {
        colors.push('#' + Math.floor(Math.random() * 16777215).toString(16) + "1f")
    }

    return colors
}

export const randomColors = groupColors()

const App = () => {
    const { user } = useAuthStore(state => state)
    const { getData } = useEventsStore(state => state)

    useEffect(() => {
        getData()
    }, [user])

    return (
        <BrowserRouter>
            {user.token
                ? <>
                    <Navbar />
                    <Routes>
                        <Route path="/events" element={<MyEvents />} />
                        {user.role > 0 &&
                            <Route path="/authors/" element={<PersonalPage personal={"authors"} />} />
                        }
                        {user.role > 1 &&
                            <Route path="/moderators" element={<PersonalPage personal={"moderators"} />} />
                        }
                        {user.role < 2
                            ? <>
                                <Route path="/create-event/" element={<CreateEnevntPage edited={false} />} />
                                <Route path="/create-event/:eventId" element={<CreateEnevntPage edited={true} />} />
                                <Route path='/create-report/:eventId' element={<CreateReportPage />} />
                                <Route path='/edit-report/:eventId' element={<CreateReportPage />} />
                            </>
                            : null
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
            <NotificationContainer />
        </BrowserRouter>
    );
};

export default App;