import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const GOOD = 'good'
  const NEUTRAL = 'neutral'
  const BAD = 'bad'

  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = feedback => () =>
    feedback === GOOD
      ? setGood(good + 1)
      : feedback === NEUTRAL
      ? setNeutral(neutral + 1)
      : setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleFeedback(GOOD)}>{GOOD}</button>
      <button onClick={handleFeedback(NEUTRAL)}>{NEUTRAL}</button>
      <button onClick={handleFeedback(BAD)}>{BAD}</button>
      <h1>Give statistics</h1>
      <p>
        {GOOD} {good}
      </p>
      <p>
        {NEUTRAL} {neutral}
      </p>
      <p>
        {BAD} {bad}
      </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
