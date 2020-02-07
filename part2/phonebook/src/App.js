import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameInput, setNameInput] = useState('')
  const [numberInput, setNumberInput] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const handleNameInputChange = event => setNameInput(event.target.value)
  const handleNumberInputChange = event => setNumberInput(event.target.value)
  const handleSearchInputChange = event => setSearchInput(event.target.value)

  const handleFormSubmit = event => {
    event.preventDefault()
    if (persons.some(person => person.name === nameInput)) {
      if (
        window.confirm(
          `${nameInput} is already in the phonebook. Replace the old number with the new one?`,
        )
      ) {
        const personToUpdate = persons.find(person => person.name === nameInput)
        const updatedPerson = {
          ...personToUpdate,
          number: numberInput,
        }
        personsService.updatePerson(updatedPerson).then(() => {
          setPersons(
            persons.map(person => {
              if (person.id === updatedPerson.id) {
                return {
                  ...person,
                  number: updatedPerson.number,
                }
              } else {
                return person
              }
            }),
          )
        })
      }
    } else {
      const newPerson = {
        name: nameInput,
        number: numberInput,
        id: shortid.generate(),
      }

      personsService
        .createPerson(newPerson)
        .then(response => setPersons(persons.concat(response.data)))
    }

    setNameInput('')
    setNumberInput('')
  }

  const deletePerson = ({ id, name }) => {
    if (window.confirm(`Delete ${name}`)) {
      personsService.deletePerson({ id, name }).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  useEffect(() => {
    personsService.getAllPersons().then(response => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchInput={searchInput}
        handleSearchInputChange={handleSearchInputChange}
      />
      <h2>Add new entry:</h2>
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
        nameInput={nameInput}
        numberInput={numberInput}
      />
      <h2>Entries</h2>
      <Persons
        persons={persons}
        searchInput={searchInput}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
