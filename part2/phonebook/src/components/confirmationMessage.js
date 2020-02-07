import React from 'react'

const ConfirmationMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="confirmation-message">{message}</div>
}

export default ConfirmationMessage
