import React from 'react'

const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ course }) => (
  <ul>
    {course.parts.map(part => (
      <Part part={part} key={part.id} />
    ))}
  </ul>
)

const Total = ({ course }) => (
  <p>
    Number of exercises{' '}
    {course.parts.reduce(
      (accumulator, part) => accumulator + part.exercises,
      0,
    )}
  </p>
)

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
)

export default Course
