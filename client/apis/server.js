import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://minipc-miniwp-anggabanny.anggabanny.online'
});

export default instance