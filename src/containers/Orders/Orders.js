import React, { Component } from 'react';
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class orders extends Component {
    componentDidMount(){
        // axios.get('/orders.json')
        //     .then(response => {
        //         const fetchedOrders = []
        //         for(let key in response.data){
        //             fetchedOrders.push({
        //                 ...response.data[key],
        //                 id: key
        //             })
        //         }
        //         this.setState({
        //             loading: false,
        //             orders: fetchedOrders
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({ 
        //             loading: false
        //         })
        //     })
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render() {
        let orders = <Spinner />
        if(!this.props.loading){
            orders = (
            this.props.orders.map(order => {
                return(
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        price={order.price} />
                )
            })
            )
        }
        return (
            <div>
              {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));