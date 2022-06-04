import React from 'react';

const BuildControl = (props) => {
  console.log(props.ing)
  const sastojci = Object.keys(props.ing).map(el => {
    return (
      <div>
        <span>{el.toUpperCase()}: {props.ing[el]} </span>
        <button onClick={props.addIng} value={el}>More</button>
        <button onClick={props.removeIng} value={el}>Less</button>
      </div>
    );

  });

  return (
    <div>
      <p>Total: ${props.total.toFixed(2)}</p>
      {sastojci}
    </div>
  );
}

export default BuildControl;