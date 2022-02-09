import React, { useState } from 'react'

const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0) {
    return (
      <p>No feedback gathered</p>
    )
  }

  return (
    <>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {(good + (bad * -1)) / all}</p>
      <p>Positive: {(good/all) * 100}%</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const goodHandler = () => {
    setAll(all + 1)
    setGood(good + 1)
  }
  const neutralHandler = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }
  const badHandler = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header="Give Feedback" />
      <Button handleClick={goodHandler} text="Good" />
      <Button handleClick={neutralHandler} text="Neutral" />
      <Button handleClick={badHandler} text="Bad" />
      <Header header={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App