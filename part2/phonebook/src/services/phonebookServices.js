import axios from "axios"
const baseUrl = 'https://stormy-sierra-33072.herokuapp.com/api/persons'


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