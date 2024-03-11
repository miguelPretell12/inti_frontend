import axios from 'axios'

const apiAxios = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_API}/api`
})

export default apiAxios;