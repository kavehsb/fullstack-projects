import React from 'react'

const Header = ({courseHeader}) => {
  return (
    <h1>{courseHeader}</h1>
  )
}

const Content = ({courseParts}) => {
  return (
      <ul>
        {courseParts.map(part => <Part key={part.id} part={part} />)}
      </ul>
  )
}

const Part = ({part}) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}

const Total = ({courseParts}) => {
  return (
    <b>Total exercies: {courseParts.reduce((sum, part) => sum + part.exercises, 0)}</b>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header courseHeader={course.name} />
      <Content courseParts={course.parts} />
      <Total courseParts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App;
