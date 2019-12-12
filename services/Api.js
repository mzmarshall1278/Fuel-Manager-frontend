import axios from axios
export default () => {
    return axios.create({
        baserUrl : 'http://localhost:9090'
    })
}
