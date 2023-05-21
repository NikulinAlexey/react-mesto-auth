import React from "react";

function Spinner({ isSpinnerVisible }) {
  return (
    <div className={`spinner ${isSpinnerVisible ? 'spinner_visible' : ''}`}>
      <i></i>
    </div>
  )
}

export default Spinner;