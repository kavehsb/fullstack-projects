import { useState, useEffect } from "react"
import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

const CountryNameList = ({countryName, countryInfoClicked}) => {
    return (
      <li>{countryName} <button onClick={countryInfoClicked(countryName)}>info</button></li>
    )
}

const CountryNameHeader = ({countryName}) => {
    return (
      <h1>{countryName}</h1>
    )
}
 
const CountryCapital = ({capital}) => {
    return (
        <p><b>Capital: </b> {capital}</p>
    )
}

const CountryPop = ({pop}) => {
    return (
        <p><b>Country Population: </b> {pop}</p>
    )
}

const Language = ({language}) => {
    return (
        <li>{language}</li>
    )
}

const CountryLanguages = ({languages}) => {
    return (
        <>
            <b>Languages: </b>
            <ul>
                {languages.map(language => <Language key={language} language={language}/>)}
            </ul>   
        </>
    )
}

const CountryFlag = ({flag}) => {
    return (
      <img src={flag} alt="Country Flag" width={100} size={100} />
    )
}

const Weather = ({weather}) => {
    const iconLink = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"
    
    return (
        <>
            <p>Temperature: {weather.main.temp} Fahrenheit</p>
            <img src={iconLink} alt="Weather icon"/>
            <p>Wind Speed: {weather.wind.speed} MPH</p>
        </>
    )
}

const CapitalWeather = ({capital, coords}) => {
    const [weather, setWeather] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchWeather = () => {
        axios
        .get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: coords[0],
                lon: coords[1],
                appid: api_key,
                units: 'imperial'
            }
        })
        .then(response => 
            {
                setWeather(response.data)
                setIsLoading(false)
            })
    }
    useEffect(fetchWeather, [])

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <>
            <p><b>Weather in {capital}</b></p>
            <Weather weather={weather} />
        </>
    )
}
  
const CountryInfo = (country) => {
    const {country: {name}} = country
    const {country: {flags}} = country
    const {country: {capital}} = country
    const {country: {languages}} = country
    const {country: {population}} = country
    const {country: {latlng}} = country

    return (
      <div>
        <CountryNameHeader countryName={name.common} />
        <CountryCapital capital={capital} />
        <CountryPop pop={population} />
        <CountryLanguages languages={Object.values(languages)} />
        <CountryFlag flag={flags.png} />
        <CapitalWeather capital={capital} coords={latlng} />
      </div>
    )
}
  
const Countries = ({filterCountries, countryInfoClicked}) => {
    // If the number of countries that matches the search parameters
    // is within the range of 2-10 inclusive
    if (filterCountries.length <= 10 && filterCountries.length > 1) {
        return (
        <ul>
            {filterCountries.map(country => 
                <CountryNameList 
                    key={country.name.common} 
                    countryName={country.name.common} 
                    countryInfoClicked={countryInfoClicked}
                /> 
            )}
        </ul>
        )
    // If exactly one country matches the search parameters
    } else if (filterCountries.length === 1) {
        return (
            <CountryInfo country={filterCountries[0]} />
        )
    // If no country matches the search parameters
    } else if (filterCountries.length === 0) {
        return (
            <p>No country found</p>
        )
    }
    // If the amount of countries to display is greater than 10
    return (
        <p>Too many countries to show, try searching for one</p>
    )
}
  
export default Countries