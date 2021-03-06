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

const StatisticLine = ({text, value}) => {
  if (text === "Positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  }

  return (  
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all, average, positivePer}) => {
  if (all === 0) {
    return (
      <p>No feedback gathered</p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positivePer} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  let average = (good + (bad * -1)) / all
  let positivePer = (good/all) * 100

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
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={all}
        average={average}
        positivePer={positivePer}
      />
    </div>
  )
}

export default App