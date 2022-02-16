import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'


const fetchData = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const createData = personObj => {
    return axios.post(baseUrl, personObj).then(response => response.data)
}

const deleteData = id => {
    return axios.delete(baseUrl + `/${id}`)
}

const exportFunctions = {fetchData, createData, deleteData}

export default exportFunctions