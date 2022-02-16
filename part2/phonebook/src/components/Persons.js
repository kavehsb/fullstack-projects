import React from 'react'

const Person = ({id, name, number, buttonHandler}) => {
    return (
      <li>{name} {number} <button onClick={() => buttonHandler(id, name)}>delete</button></li>
    )
}
  
const Persons = ({filteredNames, buttonHandler}) => {
    return (
      <ul>
        {filteredNames.map(person => 
          <Person 
            key={person.name}
            id={person.id}
            name={person.name} 
            number={person.number}
            buttonHandler={buttonHandler}
          />)}
      </ul>
    )
}

export default Persons