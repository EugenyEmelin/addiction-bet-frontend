import ky from 'ky'

const http = ky.create({
    prefixUrl: 'http://localhost:3000',
})

const accessToken = localStorage.getItem('access_token')

const secureHttp = http.extend({
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    hooks: {

    }
})

export default secureHttp
