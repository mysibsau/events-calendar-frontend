import axios from "axios"

export const auth = async (username, password) => {
  try {
    const response = await axios.post('/auth', {username: username, password: password});
    return response.data
  } catch (err) {
    console.log(err.toJSON())
    return null;
  }
}