import React from 'react'

const Person = ({ person, deletePerson }) => (
  <li key={person.name}>
    {person.name} {person.number}
    <button onClick={() => deletePerson({ id: person.id, name: person.name })}>
      Delete
    </button>
  </li>
)

export default Person
