import axios from "axios"

export const getEventsByDate = async (month, year) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`/events/${month}.${year}/`, {headers: {
            Authorization: `Basic ${token}`
        }})
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}