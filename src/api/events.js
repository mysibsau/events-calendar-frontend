import axios from "axios"

export const getEventsByDate = async (month, year) => {
    try {
        const response = await axios.get(`/events/${month}.${year}/`)
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const getEventData = async (id) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`/event/${id}/`, {headers: {Authorization: `Token ${token}`}})
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const editEvent = async (id, name, date, stopDate, place, count, direction, organization) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.put(`/event/${id}/`, {
            direction: Number(direction), 
            organization: Number(organization), 
            name: name, 
            start_date: date, 
            stop_date: stopDate,
            place: place, 
            coverage_participants_plan: Number(count)}, {headers: {Authorization: `Token ${token}`}})

        return response.data;
    } catch (err) {
        return {error: err.response.data[Object.keys(err.response.data)[0]][0]}
    }
}; 

export const addEvent = async (name, date, stopDate, place, count, direction, organization) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post('/event/', {
            direction: Number(direction), 
            organization: Number(organization), 
            name: name, 
            start_date: date, 
            stop_date: stopDate,
            place: place, 
            coverage_participants_plan: Number(count)}, {headers: {Authorization: `Token ${token}`}})

        return response.data;
    } catch(err) {
        return {error: err.response.data[Object.keys(err.response.data)[0]][0]}
    }
}

export const verificateEvent = async (id) => {
    try {
        const token = localStorage.getItem('token')
        await axios.post(`/event/vereficate/${id}`, {}, {headers: {Authorization: `Token ${token}`}})
        return true;
    } catch(err) {
        console.log(err)
        return false;
    }
}

export const unvereficateEvent = async (id) => {
    try {
        const token = localStorage.getItem('token')
        await axios.delete(`/event/vereficate/${id}`, {headers: {Authorization: `Token ${token}`}})
        return true;
    } catch(err) {
        return false;
    }
}