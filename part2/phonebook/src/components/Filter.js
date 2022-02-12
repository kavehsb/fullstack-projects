import React from 'react'

const Filter = ({nameToSearch, handleNameToSearch}) => {
    return (
      <>
        <h2>Search by name</h2>
        <div>
          search: <input value={nameToSearch} onChange={handleNameToSearch} />
        </div>
      </>
    )
}

export default Filter