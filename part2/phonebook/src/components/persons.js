import React from 'react'
import Person from './person'

const Persons = ({ persons, searchInput, deletePerson }) => (
  <ul>
    {persons
      .filter(
        person =>
          person.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1,
      )
      .map(person => (
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      ))}
  </ul>
)

export default Persons
