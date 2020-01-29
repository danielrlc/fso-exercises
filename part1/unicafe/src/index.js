import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// constants
const GOOD = 'good'
const NEUTRAL = 'neutral'
const BAD = 'bad'

const Statistics = ({
  average,
  bad,
  good,
  neutral,
  numberOfFeedbacks,
  percentPositive,
}) => (
  <>
    <h1>statistics</h1>
    <p>
      {GOOD} {good}
    </p>
    <p>
      {NEUTRAL} {neutral}
    </p>
    <p>
      {BAD} {bad}
    </p>
    <p>all {numberOfFeedbacks}</p>
    <p>average {average}</p>
    <p>positive {percentPositive}%</p>
  </>
)

const App = () => {
  // hooks
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedbackExists, setFeedbackExists] = useState(false)

  // calculated values
  let numberOfFeedbacks = good + neutral + bad
  let average = (good - bad) / numberOfFeedbacks
  let percentPositive = (good / numberOfFeedbacks) * 100

  // event handler
  const handleFeedback = feedback => () => {
    setFeedbackExists(true)
    feedback === GOOD
      ? setGood(good + 1)
      : feedback === NEUTRAL
      ? setNeutral(neutral + 1)
      : setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleFeedback(GOOD)}>{GOOD}</button>
      <button onClick={handleFeedback(NEUTRAL)}>{NEUTRAL}</button>
      <button onClick={handleFeedback(BAD)}>{BAD}</button>
      {feedbackExists ? (
        <Statistics
          average={average}
          bad={bad}
          good={good}
          neutral={neutral}
          numberOfFeedbacks={numberOfFeedbacks}
          percentPositive={percentPositive}
        />
      ) : (
        <p>No feedback given yet</p>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
