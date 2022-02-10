import React from 'react'

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

export default CoursesList