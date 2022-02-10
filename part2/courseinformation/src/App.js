import React from 'react'

const PageHeader = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

const CourseHeader = ({courseHeader}) => {
  return (
    <h2>{courseHeader}</h2>
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
      <CourseHeader courseHeader={course.name} />
      <Content courseParts={course.parts} />
      <Total courseParts={course.parts} />
    </div>
  )
}

const CoursesList = ({courses}) => {
  return (
    <>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <PageHeader header={"Web Development Curriculum"} />
      <CoursesList courses={courses} />
    </div>
  )
}

export default App;
