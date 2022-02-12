import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [nameToSearch, setNameToSearch] = useState('')

  const filteredNames = persons.filter(
    person => person.name.toLowerCase().includes(nameToSearch.toLowerCase())
  )

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
  const handleNameToSearch = event => setNameToSearch(event.target.value)

  return (
    <div>

      <h1>Phonebook</h1>

      <Filter 
      nameToSearch={nameToSearch} 
      handleNameToSearch={handleNameToSearch} 
      />

      <PersonForm 
        addPerson={addPerson}
        newName={newName} 
        newNum={newNum} 
        handleNewName={handleNewName} 
        handleNewNum={handleNewNum} 
      />

      <h2>Numbers</h2>

      <Persons
        filteredNames={filteredNames}
      />

    </div>
  )
}

export default App