import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {

    axios.get('/orders.json')
      .then(res => {
        const data = Object.keys(res.data).map(el => {
          return {
            ingredients: res.data[el].ingredients,
            price: res.data[el].price,
            id: el
          };
        })
        this.setState({ orders: data, loading: false })
      })
      .catch(error => {
        console.log(error)
      })
    //}
  }

  render() {
    const lista = this.state.orders.map(el => {
      return <Order key={el.id} ingredients={el.ingredients} price={el.price} />
    });

    return (
      <div>
        {lista}
      </div>
    )
  }
}

export default Orders;