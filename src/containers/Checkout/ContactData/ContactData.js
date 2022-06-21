import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

const ContactData = (props) => {

    const [loading, setLoading] = useState(false);
    const ingredients = useSelector((state) => state.burger.ingredients);
    const totalPrice = useSelector((state) => state.burger.totalPrice);
    const navigate = useNavigate();

    const orderHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        const order = {
            ingredients: ingredients,
            price: totalPrice,
            customer: {
                name: 'Lao Tzu',
                address: {
                    street: 'Main street 23',
                    zipCode: '90782',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'prio'
        }
        axios.post('/orders.json', order)
            .then(response => {
                setLoading(false);
                navigate('/');
            })
            .catch(error => {
                setLoading(false);
            });
    }

    let form = (
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={orderHandler}>ORDER</Button>
        </form>
    );
    if (loading) {
        form = <Spinner />;
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
}

// const mapStateToProps = state => {
//     return {
//         ingredients: state.burger.ingredients,
//         totalPrice: state.burger.totalPrice
//     }
// }

export default ContactData;