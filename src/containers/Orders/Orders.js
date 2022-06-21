import React from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useGetOrdersQuery } from '../../store/reducers/orderReducer';

const Orders = (props) => {

  const { data, error, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops, an error occured</div>;
  }

  const lista = Object.values(data).map((el, idx) => {
    return <Order key={idx} ingredients={el.ingredients} price={el.price} />
  })

  return (
    <div>
      {lista}
    </div>
  );
}

export default Orders;