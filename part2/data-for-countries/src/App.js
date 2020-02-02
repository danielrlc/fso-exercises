import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleSearchChange = event => setSearch(event.target.value)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    setFilteredCountries(
      countries.filter(
        country =>
          country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1,
      ),
    )
  }, [search, countries])

  return (
    <>
      <div>
        find countries:
        <input type="text" value={search} onChange={handleSearchChange} />
      </div>
      {filteredCountries.length > 10 && search.length > 0 ? (
        <p>Too many matches. Make your search more specific.</p>
      ) : filteredCountries.length > 1 && search.length > 0 ? (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.alpha2Code}>{country.name}</li>
          ))}
        </ul>
      ) : filteredCountries.length === 1 ? (
        <>
          <h1>{filteredCountries[0].name}</h1>
          <p>capital {filteredCountries[0].capital}</p>
          <p>population {filteredCountries[0].population}</p>
          <h2>languages</h2>
          <ul>
            {filteredCountries[0].languages.map(language => (
              <li>{language.name}</li>
            ))}
          </ul>
          <img
            style={{width: 100}}
            src={filteredCountries[0].flag}
            alt={`flag of ${filteredCountries[0].name}`}
          />
        </>
      ) : null}
    </>
  )
}

export default App
