import axios from "axios";

export const getUsersApiCall = async (url) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(url, {headers: {Authorization: `Token ${token}`}})
        console.log(response.data)
        return response.data;
    } catch(err) {
        console.log(err)
        return [];
    }
}

export const banUserApiCall = async (id) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`/users/${id}/ban/`, {headers: {Authorization: `Token ${token}`}});

        return response.data;
    } catch(err) {
        console.log(err);
        return false;
    }
}

export const confirmUserApiCall = async (id) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`/users/${id}/confirmed/`, {headers: {Authorization: `Token ${token}`}});

        return response.data;
    } catch(err) {
        console.log(err);
        return false;
    }
}