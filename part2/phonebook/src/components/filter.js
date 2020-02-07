import React from 'react'

const Filter = ({ searchInput, handleSearchInputChange }) => (
  <p>
    filter shown with{' '}
    <input type="text" value={searchInput} onChange={handleSearchInputChange} />
  </p>
)

export default Filter
