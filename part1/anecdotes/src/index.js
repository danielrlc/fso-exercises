import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const App = ({ anecdotes }) => {
  const [votesPerAnecdote, setVotesPerAnecdote] = useState(
    anecdotes.map(anecdote => 0),
  )

  const [selected, setSelected] = useState(0)
  const [anecdoteWithMostVotes, setAnecdoteWithMostVotes] = useState(null)

  const chooseRandomAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const addVote = () => {
    setVotesPerAnecdote(
      votesPerAnecdote.map((votes, index) =>
        index === selected ? votes + 1 : votes,
      ),
    )

    if (votesPerAnecdote[selected] === Math.max(...votesPerAnecdote)) {
      setAnecdoteWithMostVotes(anecdotes[selected])
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votesPerAnecdote[selected]} votes</p>
      <button onClick={addVote}>Vote</button>
      <button onClick={chooseRandomAnecdote}>next anecdote</button>
      {anecdoteWithMostVotes ? (
        <>
          <h1>Anecdote with most votes</h1>
          <p>{anecdoteWithMostVotes}</p>
          <p>has {Math.max(...votesPerAnecdote)} votes</p>
        </>
      ) : null}
    </div>
  )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
