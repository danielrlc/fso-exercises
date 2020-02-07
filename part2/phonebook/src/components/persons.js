import React from 'react'
import Person from './person'

const Persons = ({ persons, search, deletePerson }) => (
  <ul>
    {persons
      .filter(
        person =>
          person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1,
      )
      .map(person => (
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      ))}
  </ul>
)

export default Persons
