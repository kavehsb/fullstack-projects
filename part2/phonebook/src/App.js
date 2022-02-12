import { useState } from 'react'

const Person = ({name, number}) => {
  return (
    <li>{name} {number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNum
    }

    if (persons.some(person => person.name === newName)) {
      alert(`Name: ${newName} already exists in the phonebook`)
      resetInputFields()
    } else if (persons.some(person => person.number === newNum)) {
      alert(`Phone number: ${newNum} already exists in the phonebook`)
      resetInputFields()
    } else {
      setPersons(persons.concat(newPerson))
      resetInputFields()
    }   
  }

  const resetInputFields = () => {
    setNewName('')
    setNewNum('')
  }
  const handleNewName = event => setNewName(event.target.value)
  const handleNewNum = event => setNewNum(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNum} onChange={handleNewNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.name} name={person.name} number={person.number} />)}
      </ul>
    </div>
  )
}

export default App