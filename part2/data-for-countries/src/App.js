import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [matchedCountry, setMatchedCountry] = useState(null)
  const [search, setSearch] = useState('')

  const handleSearchChange = event => setSearch(event.target.value)

  const toggleCountryData = selectedCountry => () =>
    setCountries(
      countries.map(country => {
        return country.name === selectedCountry
          ? {
              ...country,
              countryDataIsShown: !country.countryDataIsShown,
            }
          : {
              ...country,
            }
      }),
    )

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(
        response.data.map(countryData => ({
          ...countryData,
          countryDataIsShown: false,
        })),
      )
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

  useEffect(() => {
    return filteredCountries.length === 1
      ? setMatchedCountry(filteredCountries[0])
      : setMatchedCountry(null)
  }, [filteredCountries])

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
            <>
              <li key={country.name}>
                {country.name}{' '}
                <button onClick={toggleCountryData(country.name)}>
                  {country.countryDataIsShown ? 'hide details' : 'show details'}
                </button>
              </li>
              {country.countryDataIsShown ? (
                <>
                  <h1>{country.name}</h1>
                  <p>capital {country.capital}</p>
                  <p>population {country.population}</p>
                  <h2>languages</h2>
                  <ul>
                    {country.languages.map(language => (
                      <li key={language.name}>{language.name}</li>
                    ))}
                  </ul>
                  <img
                    style={{ width: 100 }}
                    src={country.flag}
                    alt={`flag of ${country.name}`}
                  />
                </>
              ) : null}
            </>
          ))}
        </ul>
      ) : matchedCountry ? (
        <>
          <h1>{matchedCountry.name}</h1>
          <p>capital {matchedCountry.capital}</p>
          <p>population {matchedCountry.population}</p>
          <h2>languages</h2>
          <ul>
            {matchedCountry.languages.map(language => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img
            style={{ width: 100 }}
            src={matchedCountry.flag}
            alt={`flag of ${matchedCountry.name}`}
          />
        </>
      ) : null}
    </>
  )
}

export default App
