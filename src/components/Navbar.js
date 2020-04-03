import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from './../assets/blue_logo.svg';
import Searchbar from './Searchbar';

class Navbar extends Component {
    render() {
        return (
            <nav style={{ height: '100%', width: '100%' }}>
                <div className="nav-wrapper valign-wrapper" style={{
                    margin: '0px 10px'
                }}>
                    <Link to="/" className="left" style={{
                        textAlign: 'left',
                        width: '50%'
                    }}
                    >
                        <img src={Logo} alt="Logo"
                            style={{ verticalAlign: 'middle', height: '24px', paddingBottom: '3px' }}
                        />
                        <span style={{ fontSize: '18px', margin: '0px 6px' }}>
                            <b>RED BATON</b>
                        </span>
                    </Link>
                    <div><Searchbar /></div>
                    <div style={{
                        width: '43%',
                        textAlign: 'right',
                    }}>
                        <Link to="/summary" style={{ display: 'inline' }}>
                            <i className="material-icons">shopping_cart</i>
                        </Link>
                    </div>
                    <span
                        style={{
                            borderRadius: '50%',
                            border: 'solid blue 2px',
                            padding: '4px',
                            position: 'relative',
                            background: 'blue',
                            bottom: '10px',
                            right: '10px',
                            lineHeight: '3px',
                            fontSize: '10px',
                        }}
                    >
                        <b>{this.props.addedItems.length}</b>
                    </span>
                    <div style={{
                        width: '7%',
                        textAlign: 'center',
                    }}>
                        <i className="material-icons">account_circle</i>
                    </div>
                </div>
            </nav >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.cart.addedItems,
    }
}

export default connect(mapStateToProps)(Navbar);