import axios from "axios";

async function CheckSignedin() {
    const URL = import.meta.env.VITE_REACT_APP_HOSTED_URL
    try {
        const token = localStorage.getItem('token')
        if (!token) return false;
        const response = await axios.post(`${URL}/api/v1/user/me`, null, { headers: { "Authorization": `Bearer ${token}` } })
        console.log(response.data.msg)
        return true
    } catch (error) {
        console.log(error.response?.data?.msg || "Error Occured!")
        return false
    }
}

export default CheckSignedin
