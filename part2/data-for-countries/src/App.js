import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import FilterCountry from './components/FilterCountry'

const App = () => {
  // State variables for the App functional component
  const [countries, setCountries] = useState([])
  const [countryToSearch, setCountryToSearch] = useState('')

  // Variable containing filtered countries that include the substring (countryToSearch)
  const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryToSearch.toLowerCase()))

  // Fetch data hook
  // -------------------------------------------------------------------
  const fetchData = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }
  useEffect(fetchData, [])
  // -------------------------------------------------------------------


  // Event handlers when given some sort of user input 
  // -------------------------------------------------------------------
  
  // handleCountryToSearch handles text input from user
  const handleCountryToSearch = (event) => setCountryToSearch(event.target.value)

  // countryInfoClicked handles button click input from the user
  const countryInfoClicked = (cts) => {
    return (
      () => setCountryToSearch(cts)
    )
  }
  // -------------------------------------------------------------------

  return (
    <div >
      <FilterCountry 
        countryToSearch={countryToSearch} 
        handleCountryToSearch={handleCountryToSearch} 
      />
      
      <Countries 
        filterCountries={filterCountries}
        countryInfoClicked={countryInfoClicked}
      />

    </div>
  );
}

export default App;
