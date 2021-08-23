import axios from 'axios';

export const getUnverifiedApiCall = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/events/unverified/', {headers: {Authorization: `Token ${token}`}})

        return response.data;
    } catch(err) { 
        console.log(err)
        return [];
    }
};