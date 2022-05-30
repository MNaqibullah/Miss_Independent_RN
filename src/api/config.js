import axios from 'axios';

const BASE_URL = 'http://wordpress.appcrates.co/miss-independent/api'
const img_BASE_URL = 'http://wordpress.appcrates.co/miss-independent/public/'

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Accept": "application/json",
    },
})

export { BASE_URL, client,img_BASE_URL};