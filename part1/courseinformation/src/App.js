import React from 'react'

const Header = (courseName) => {
  return (
    <h1>{courseName.course}</h1>
  )
}

const Part = (part) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = (parts) => {
  return (
    <div>
      <Part name={parts.part1.name} exercises={parts.part1.exercises} />
      <Part name={parts.part2.name} exercises={parts.part2.exercises} />
      <Part name={parts.part3.name} exercises={parts.part3.exercises} />
    </div>
  )
}

const Total = (numExercises) => {
  return (
    <p>Number of exercises {numExercises.totalExercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total totalExercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App;
