import axios from "axios";

export const deleteCommentApiCall = async (id) => {
    try {
        const token = localStorage.getItem('token')
        await axios.delete(`/comment/${id}/`, {headers: {Authorization: `Token ${token}`}})

        return true
    } catch(err){
        console.log(err)
        return false
    }
}

export const editCommentApiCall = async (id, text) => {
    try {
        const token = localStorage.getItem('token')
        await axios.put(`/comment/${id}/`, {text: text}, {headers: {Authorization: `Token ${token}`}})

        return true
    } catch(err) {
        console.log(err)
        return false;
    }
}

export const createCommentApiCall = async (id, text) => {
    try {
        const token = localStorage.getItem('token')
        await axios.post(`/comment/`, {text: text, event: id}, {headers: {Authorization: `Token ${token}`}})

        return true
    } catch(err) {
        console.log(err)
        return false
    }
}