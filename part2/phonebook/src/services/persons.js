import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
  return axios.get(baseUrl)
}

const createPerson = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const deletePerson = ({ id, name }) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updatePerson = updatedPerson => {
  const request = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
  return request.then(response => response.data)
}

export default {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson,
}
