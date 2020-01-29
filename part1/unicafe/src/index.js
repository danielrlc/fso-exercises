import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// constants
const ALL = 'all'
const AVERAGE = 'average'
const BAD = 'bad'
const GOOD = 'good'
const NEUTRAL = 'neutral'
const POSITIVE = 'positive'

const Button = ({ feedback, handleFeedback }) => (
  <button onClick={handleFeedback(feedback)}>{feedback}</button>
)

const Statistic = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
)

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
    <Statistic text={GOOD} value={good} />
    <Statistic text={NEUTRAL} value={neutral} />
    <Statistic text={BAD} value={bad} />
    <Statistic text={ALL} value={numberOfFeedbacks} />
    <Statistic text={AVERAGE} value={average} />
    <Statistic text={POSITIVE} value={percentPositive} />
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
  let percentPositiveRaw = (good / numberOfFeedbacks) * 100
  let percentPositive = isNaN(percentPositiveRaw)
    ? `0%`
    : `${percentPositiveRaw}%`

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
      <Button feedback={GOOD} handleFeedback={handleFeedback} />
      <Button feedback={NEUTRAL} handleFeedback={handleFeedback} />
      <Button feedback={BAD} handleFeedback={handleFeedback} />
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
