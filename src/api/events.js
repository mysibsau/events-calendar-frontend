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
        return response.data;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const editEvent = async (id, name, date, place, count, direction, organization) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.put(`/event/${id}/`, {
            direction_id: Number(direction), 
            organization_id: Number(organization), 
            name: name, 
            start_date: date, 
            place: place, 
            coverage_participants_plan: Number(count)}, {headers: {Authorization: `Token ${token}`}})

        return response.data;
    } catch (err) {
        return {error: err.response.data[Object.keys(err.response.data)[0]][0]}
    }
}; 