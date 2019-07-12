import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from "../../components/Order/Order";
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Orders extends Component {

    componentDidMount = () => {
        this.props.onLoadUserOrders();
    }
    
    render () {

        let orders = <Spinner />;
        console.log(this.props.orders);
        if (this.props.orders && this.props.orders.length) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ));
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
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadUserOrders: () => dispatch(actions.loadUserOrders()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);