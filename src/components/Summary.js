import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderTotal from './OrderTotal';

class Summary extends Component {

    getItems = () => {
        let count = 1;
        return (
            <table>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>ITEMS</th>
                        <th>QTY</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        this.props.addedItems.map(item => {
                            return (
                                <tr key={item.id} style={{ textTransform: 'capitalize', }}>
                                    <td>{count++}</td>
                                    <td>{item.name}</td>
                                    <td>

                                        <div className="row teal"
                                            style={{
                                                border: '1px solid teal',
                                                borderRadius: '3px',
                                                marginBottom: '0px',
                                            }}
                                        >
                                            <div className="col s4 center-align"
                                                onClick={() => this.props.addQuantity(item)}
                                            >
                                                <i className="tiny material-icons" style={{ verticalAlign: 'middle', paddingBottom: '3px', }}>add</i>
                                            </div>

                                            <div className="col s4 center-align white">
                                                {item.quantity}
                                            </div>
                                            <div className="col s4 center-align" onClick={() => this.props.removeItemFromCart(item)}>
                                                <i className="tiny material-icons" style={{ verticalAlign: 'middle', paddingBottom: '3px', }}>remove</i>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

        );
    }

    showAddedItems = () => {
        return (
            this.props.addedItems.length ? (
                this.getItems()
            ) : (<p className='center-align'>No Items</p>)
        );
    }

    render() {
        return (
            <div className="container" >
                <div className="cart" style={{ marginTop: '20px' }}>
                    <Link to='/'>
                        <i className="tiny material-icons" style={{ verticalAlign: 'middle', paddingBottom: '3px', }}>arrow_back</i>
                        <span>  Back to Home</span>
                    </Link>
                    <h5>Order Summary ({this.props.addedItems.length} items)</h5>
                    <div className="row">
                        <div className="col s6">
                            <ul className="collection">
                                <div className="container">
                                    {
                                        this.showAddedItems()
                                    }
                                    <div className="divider"></div>
                                    <div style={{ margin: '19px 0px', }}>
                                        <Link to='/'>
                                            <i className="tiny material-icons" style={{ verticalAlign: 'middle', paddingBottom: '3px', }}>add</i>
                                            <span>Add More Items</span>
                                        </Link>
                                    </div>
                                </div>

                            </ul>
                        </div>
                        {
                            this.props.addedItems.length ? (
                                <div className="col s6">
                                    <ul className="collection  blue lighten-5">
                                        {
                                            <OrderTotal />
                                        }
                                    </ul>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.cart.addedItems
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (item) => {
            dispatch({ type: 'ADD_ITEM', item: item })
        },
        removeItemFromCart: (item) => {
            dispatch({ type: 'REMOVE_ITEM', item: item })
        },
        addQuantity: (item) => {
            dispatch({ type: 'INCREMENT_QUANTITY', item: item })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary)