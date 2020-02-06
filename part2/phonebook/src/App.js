import React, { useState, useEffect } from 'react'
import axios from 'axios'
import shortid from 'shortid'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNewNameChange = event => setNewName(event.target.value)
  const handleNewNumberChange = event => setNewNumber(event.target.value)
  const handleSearchChange = event => setSearch(event.target.value)

  const handleFormSubmit = event => {
    event.preventDefault()
    const newEntry = {
      name: newName,
      number: newNumber,
      id: shortid.generate(),
    }
    persons.some(person => person.name === newName)
      ? alert(
          `${newName} is already in the phonebook. If you meant another ${newName} then that's too bad.`,
        )
      : axios
          .post('http://localhost:3001/persons', newEntry)
          .then(response => setPersons(persons.concat(response.data)))
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>Add new entry:</h2>
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Entries</h2>
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App
