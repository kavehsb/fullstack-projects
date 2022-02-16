import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phonebookServices from './services/phonebookServices'
import OperationMessage from './components/OperationMessage'
import './index.css'

const App = () => {
  // States
  //-----------------------------------------------------
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [nameToSearch, setNameToSearch] = useState('')
  const [opMessage, setOpMessage] = useState(null)
  const [operation, setOperation] = useState('')
  //-----------------------------------------------------

  // Filtered array depending on user search input in the search text field
  //-----------------------------------------------------
  const filteredNames = persons.filter(person => 
    person.name.toLowerCase().includes(nameToSearch.toLowerCase())
  )
  //-----------------------------------------------------

  // Retrieve initial data
  //-----------------------------------------------------
  const fetchInitialData = () => {
    phonebookServices
    .fetchData()
    .then(initialData => {
      setPersons(initialData)
    })
  } 
  useEffect(fetchInitialData, [])
  //-----------------------------------------------------

  // Requests to the backend (json server)
  //-----------------------------------------------------
  /*
    Creates a person object that contains data given user input via the text 
    fields (with basic input validation). Then calls the create data service 
    that returns response data from the respective POST request to the json
    server and updates the local persons storage to that of the json server
  */
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNum
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (persons.some(person => person.number === newNum)) {
      alert(`Phone number: ${newNum} already exists in the phonebook`)
      resetInputFields()
    } else if (persons.some(person => person.name === newName) && existingPerson) {
        if (window.confirm(`${newName} already exists in the phonebook, replace old number with a new one?`)) {
          phonebookServices
          .updateNum(existingPerson.id, newPerson)
          .then(updateData => {
            setOpMessage(`Updated the number for ${newName} to ${newNum}`)
            setTimeout(() => {
              setOpMessage(null)
            }, 3000)
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : updateData))
          })
        }
        resetInputFields()
    } else {
      phonebookServices
      .createData(newPerson)
      .then(responseData => { 
        setOpMessage(`Added ${newName}`)
        setTimeout(() => {
          setOpMessage(null)
        }, 3000)
        setPersons(persons.concat(responseData))
        resetInputFields()
      })
    }   
  }

  /*
    Upon button click and confirmation from the user, calls the deleteData
    service in phonebookServices to send a delete request to the json server
    with the appropriate person id for that specific delete button. Then
    updates the local persons storage with the json server and rerenders
    the data accordingly
  */
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookServices
      .deleteData(id)
      .then(() => {
        setOperation('Delete')
        setOpMessage(`Deleted ${name}`)
        setTimeout(() => {
          setOpMessage(null)
          setOperation('')
        }, 3000)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }
  //-----------------------------------------------------

  // Helper functions/App component state handlers
  //-----------------------------------------------------
  const resetInputFields = () => {
    setNewName('')
    setNewNum('')
  }
  const handleNewName = event => setNewName(event.target.value)
  const handleNewNum = event => setNewNum(event.target.value)
  const handleNameToSearch = event => setNameToSearch(event.target.value)
  //-----------------------------------------------------

  return (
    <div>

      <h1>Phonebook</h1>

      <OperationMessage message={opMessage} operation={operation} />

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
        buttonHandler={deletePerson}
      />

    </div>
  )
}

export default App