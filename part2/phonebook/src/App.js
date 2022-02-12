import { useState } from 'react'

const Person = ({name, number}) => {
  return (
    <li>{name} {number}</li>
  )
}

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

  const filteredNames = persons.filter(person => person.name.toLowerCase().includes(nameToSearch.toLowerCase()))

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
      <h2>Search by name</h2>
      <div>
        search: <input value={nameToSearch} onChange={handleNameToSearch} />
      </div>
      <h2>Add entry to phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} required />
        </div>
        <div>
          number: <input value={newNum} onChange={handleNewNum} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredNames.map(person => 
          <Person key={person.name} name={person.name} number={person.number} />)}
      </ul>
    </div>
  )
}

export default App