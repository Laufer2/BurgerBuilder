import React from 'react';
import Modal from '../../components/UI/Modal/Modal';

const OrderModal = (props) => {


  const stanje = Object.keys(props.stanje).map(el => {
    return <p key={el}>{el}: {props.stanje[el]}</p>
  })

  return (
    <Modal close={props.close}>
      {stanje}
      <p>Total: {props.total.toFixed(2)}</p>
      <button onClick={props.close}>Cancel</button>
      <button onClick={props.buy}>Continue</button>

    </Modal>
  )
}

export default OrderModal;