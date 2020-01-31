import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const handleNewNameChange = event => setNewName(event.target.value)
  const handleFormSubmit = event => {
    event.preventDefault()
    persons.some(person => person.name === newName)
      ? alert(
          `${newName} is already in the phonebook. If you meant another ${newName} then that's too bad.`,
        )
      : setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const handleSearchChange = event => setSearch(event.target.value)

  const handleNewNumberInputChange = event => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with{' '}
        <input type="text" value={search} onChange={handleSearchChange} />
      </p>
      <form onSubmit={handleFormSubmit}>
        <div>
          name:{' '}
          <input type="text" value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number:{' '}
          <input
            type="text"
            value={newNumber}
            onChange={handleNewNumberInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter(
            person =>
              person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1,
          )
          .map(person => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default App
