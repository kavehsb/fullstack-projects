import React from "react"

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
  
const CountryInfo = (country) => {
    const {country: {name}} = country
    const {country: {flags}} = country
    const {country: {capital}} = country
    const {country: {languages}} = country
    const {country: {population}} = country

    return (
      <div>
        <CountryNameHeader countryName={name.common} />
        <CountryCapital capital={capital} />
        <CountryPop pop={population} />
        <CountryLanguages languages={Object.values(languages)} />
        <CountryFlag flag={flags.png} />
      </div>
    )
}
  
const Countries = ({filterCountries, countryInfoClicked}) => {
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
    } else if (filterCountries.length === 1) {
        return (
            <CountryInfo country={filterCountries[0]} />
        )
    } else if (filterCountries.length === 0) {
        return (
            <p>No country found</p>
        )
    }
    return (
        <p>Too many countries to show, try searching for one</p>
    )
}
  
export default Countries