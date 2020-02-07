import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personsService from './services/persons'

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
    const newPerson = {
      name: newName,
      number: newNumber,
      id: shortid.generate(),
    }
    persons.some(person => person.name === newName)
      ? alert(
          `${newName} is already in the phonebook. If you meant another ${newName} then that's too bad.`,
        )
      : personsService
          .create(newPerson)
          .then(response => setPersons(persons.concat(response.data)))
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = ({id, name}) => {
    if (window.confirm(`Delete ${name}`)) {
      personsService.deletePerson({id, name}).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  useEffect(() => {
    personsService.getAll().then(response => {
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
      <Persons persons={persons} search={search} deletePerson={deletePerson} />
    </div>
  )
}

export default App
