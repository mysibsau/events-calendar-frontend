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
        const response = await axios.get(`/event/${id}/`)
        return response.data;
    } catch (err) {
        console.log(err);
        return false;
    }
}