import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-a4314-default-rtdb.firebaseio.com/'
})

export default instance