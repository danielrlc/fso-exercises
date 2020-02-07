import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personsService from './services/persons'
import ConfirmationMessage from './components/confirmationMessage'
import ErrorMessage from './components/errorMessage'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameInput, setNameInput] = useState('')
  const [numberInput, setNumberInput] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [confirmationMessage, setConfirmationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
        personsService
          .updatePerson(updatedPerson)
          .then(() => {
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
            setConfirmationMessage(`Updated ${updatedPerson.name}`)
            setTimeout(() => {
              setConfirmationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `${updatedPerson.name} was already deleted from the server`,
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== updatedPerson.id))
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

      setConfirmationMessage(`Added ${newPerson.name}`)
      setTimeout(() => {
        setConfirmationMessage(null)
      }, 5000)
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
      {confirmationMessage ? (
        <ConfirmationMessage message={confirmationMessage} />
      ) : null}
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
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
