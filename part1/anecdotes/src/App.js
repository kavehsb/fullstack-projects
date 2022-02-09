import React, { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Anecdote = ({anecdote, votes}) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>Votes: {votes}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const iOfMax = votes.indexOf(Math.max(...votes))

  const handleAnec = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const temp = [...votes]
    temp[selected] += 1
    setVotes(temp)
  }

  return (
    <div>
      <Header text="Anecdote of the day:" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVote} text="Vote" />
      <Button handleClick={handleAnec} text="Next Anecdote" />
      <Header text="Anecdote with the most votes:" />
      <Anecdote anecdote={anecdotes[iOfMax]} votes={votes[iOfMax]} />
    </div>
  )
}

export default App