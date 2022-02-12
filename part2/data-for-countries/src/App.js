import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import FilterCountry from './components/FilterCountry'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryToSearch, setCountryToSearch] = useState('')

  const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryToSearch.toLowerCase()))

  const fetchData = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }
  useEffect(fetchData, [])


  const handleCountryToSearch = (event) => setCountryToSearch(event.target.value)

  return (
    <div >
      <FilterCountry 
        countryToSearch={countryToSearch} 
        handleCountryToSearch={handleCountryToSearch} 
      />
      
      <Countries 
        filterCountries={filterCountries}
      />
    </div>
  );
}

export default App;
