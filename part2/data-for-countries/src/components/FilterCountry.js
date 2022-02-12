import React from "react"

const FilterCountry = ({countryToSearch, handleCountryToSearch}) => {
    return (
      <div>
        search country: <input value={countryToSearch} onChange={handleCountryToSearch} />
      </div>
    )
}

export default FilterCountry