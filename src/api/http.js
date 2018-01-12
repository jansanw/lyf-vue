import axios from 'axios'

let http = axios.create({
    baseURL: HOST + '/api/',
    timeout: 10000,
    headers: {
        'Authorization': 'Bearer 123'
    }
});
export default {
    userGet(url, cb, error) {
        http.get(url).then(res => {
            cb(res)
        }).catch(err => {
            error(err)
        });
    },
    userPost(url, data, cb, error) {
        http.post(url, data).then(res => {
            cb(res)
        }).catch(err => {
            error(err)
        });
    }
}
