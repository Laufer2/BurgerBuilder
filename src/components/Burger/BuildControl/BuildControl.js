import React from 'react';

const BuildControl = (props) => {

  const sastojci = Object.keys(props.ing).map(el => {
    return (
      <div key={el}>
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
      <button onClick={props.order} disabled={!props.orderPossible}>Order</button>
    </div>
  );
}

export default BuildControl;