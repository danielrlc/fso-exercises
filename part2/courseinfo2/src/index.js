import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
  </>
)

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
    {course.parts[0].exercises +
      course.parts[1].exercises +
      course.parts[2].exercises}
  </p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
