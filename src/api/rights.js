import axios from "axios";

export const getAddVerifyRight = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/user/', {headers: {Authorization: `Token ${token}`}})
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        return false;
    }
}