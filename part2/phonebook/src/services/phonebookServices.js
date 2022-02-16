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

const updateNum = (id, updatedNum) => {
    return axios.put(baseUrl + `/${id}`, updatedNum).then(response => response.data)
}

const exportFunctions = {fetchData, createData, deleteData, updateNum}

export default exportFunctions