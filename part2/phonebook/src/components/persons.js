import React from 'react'
import Person from './person'

const Persons = ({ persons, search }) => (
  <ul>
    {persons
      .filter(
        person =>
          person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1,
      )
      .map(person => (
        <Person person={person} />
      ))}
  </ul>
)

export default Persons
