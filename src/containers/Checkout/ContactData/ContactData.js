import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: { 
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault()
        //node(your choice) .json(firebase)
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            //TODO: link to form inputs
            customer: {
                name: "Lizzie",
                address: {
                    street: 'test street',
                    zipCode: '23910',
                    country: 'Germany'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="name" />
                <input className={classes.Input} type="email" name="email" placeholder="email" />
                <input className={classes.Input} type="text" name="street" placeholder="street" />
                <input className={classes.Input} type="text" name="postal" placeholder="postal code" />
                <Button className={classes.Input} btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;