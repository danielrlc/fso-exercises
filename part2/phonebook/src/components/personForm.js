import React from 'react'

const PersonForm = ({
  handleFormSubmit,
  handleNameInputChange,
  handleNumberInputChange,
  nameInput,
  numberInput,
}) => (
  <form onSubmit={handleFormSubmit}>
    <div>
      name:{' '}
      <input type="text" value={nameInput} onChange={handleNameInputChange} />
    </div>
    <div>
      number:{' '}
      <input
        type="text"
        value={numberInput}
        onChange={handleNumberInputChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm
