import React from "react"

const PersonForm = ({addPerson, newName, newNum, handleNewName, handleNewNum}) => {
    return (
      <>
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
      </>
    )
}

export default PersonForm