import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'


const fetchData = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const createData = personObj => {
    return axios.post(baseUrl, personObj).then(response => response.data)
}

const exportFunctions = {fetchData, createData}

export default exportFunctions