import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrderTotal extends Component {

    constructor(props) {
        super(props);
        this.shippingCharges = 5;
        this.extraCharges = 2;
        this.savings = 0;
    }

    showCharges = () => {
        return (
            <div className="row">
                <div style={{ padding: '20px 0px', }}>
                    <div className="col s8">Total Savings</div>
                    <div className="col s4 right-align blue-text">{`-$${this.savings}.00`}</div>
                </div>

                <div style={{ padding: '20px 0px', }}>
                    <div className="col s8">Delivery Charges</div>
                    <div className="col s4 right-align">{`$${this.shippingCharges}.00`}</div>
                </div>

                <div style={{ padding: '20px 0px', }}>
                    <div className="col s8">
                        <span>Taxes and Charges </span>
                        <i className="tiny material-icons" style={{ verticalAlign: 'middle', paddingBottom: '3px', }}>info_outline</i>
                    </div>
                    <div className="col s4 right-align">{`$${this.extraCharges}.00`}</div>
                </div>
            </div>
        )

    }

    showPriceList = () => {
        this.savings = 0;
        return (
            this.props.addedItems.map(item => {
                return (
                    <div className="row valign-wrapper" key={item.id}
                        style={{
                            padding: '0px',
                            margin: '0px',
                            height: '55px',
                        }}
                    >
                        <div className="col s6">
                            {`${item.quantity} X $${+item.price + 0.00}`}
                        </div>
                        <div className="col s6 right-align">
                            {`$${item.quantity * item.price + 0.00}`}
                        </div>
                    </div>
                );
            })
        );
    }

    calculateTotal = () => {
        let sum = this.props.total + this.shippingCharges + this.extraCharges
        return (
            sum.toFixed(3)
        );
    }

    render() {

        return (
            <div className="container">
                <p><b>Price Details</b></p>
                <div className="divider"></div>
                {
                    this.showPriceList()
                }
                <div className="divider"></div>
                {
                    this.showCharges()
                }
                <div className="divider"></div>
                <div className="row" style={{ marginTop: "10px" }}>
                    <div className="col s7"><b>To Pay</b></div>
                    <div className="col s5 right-align">
                        <b>
                            {
                                `$${this.calculateTotal()}`
                            }
                        </b>
                    </div>
                </div>
                <div style={{ margin: '12px 0px' }}>
                    <button className="waves-effect waves-light btn" style={{ width: "100%" }}> CHECKOUT</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.cart.addedItems,
        total: state.cart.total
    }
}

export default connect(mapStateToProps)(OrderTotal)