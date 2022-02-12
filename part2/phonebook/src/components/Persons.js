import React from 'react'

const Person = ({name, number}) => {
    return (
      <li>{name} {number}</li>
    )
}
  
const Persons = ({filteredNames}) => {
    return (
      <ul>
        {filteredNames.map(person => 
          <Person key={person.name} name={person.name} number={person.number} />)}
      </ul>
    )
}

export default Persons