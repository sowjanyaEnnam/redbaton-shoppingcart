import React, { Component } from 'react';
import { connect } from 'react-redux';
import canon from './../assets/canon1.jpeg';
import * as API from '../api/ApisList';
import SideBar from './SideBar';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            brands: null,
            categories: null,
            features: null,            
            actualProducts: null,
            hoveredIndex: null,
        };        
    }

    componentDidMount = () => {

        API.products.then(data => {
            this.setState({ products: data });
            this.setState({ actualProducts: data });
        });

        API.brands.then(data => {
            this.setState({ brands: data });
        });

        API.categories.then(data => {
            this.setState({ categories: data });
        });

        API.features.then(data => {
            this.setState({ features: data });
        });
    }

    applyFilters = (filteredItems) => {
        this.setState({ products: filteredItems })
    }

    getType = (items, id) => {
        if (items) {
            let type = items.find(item => item.id === id);
            return type.name;
        }
        return null;
    }

    displayItems = () => {
        let products = [];
        if (this.props.filteredSearchItems.length) {
            products = [...this.props.filteredSearchItems];
        } else if (this.props.isSearchActive || !this.state.products.length) {
            return <p className="center-align">No Items</p>
        } else {
            products = [...this.state.products];
        }
        
        return (
            products.map((item, index) => {
                return (
                    <div className="card hoverable transparent lighten-5" key={item.id}
                        style={{
                            borderRadius: '4px',
                            marginBottom: '70px',
                        }}
                    >
                        <div className="card-image">
                            <img src={canon} alt={item.name} />
                        </div>

                        <div className="card-content"
                            style={{
                                padding: '10px'
                            }}
                        >
                            <div className="row" style={{ margin: '0px', }}>
                                <div className="col s8 left-align"
                                    style={{
                                        padding: '0px',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    <b>
                                        {item.name}
                                    </b>
                                </div>
                                <div className="col s4 right-align">
                                    <b>
                                        ${+item.price + 0.00}
                                    </b>

                                </div>
                            </div>                            
                            <p className="left-align" style={{ margin:'6px 0px', }}>
                                <b>Brand : </b>
                                <span>
                                    {
                                        this.getType(this.state.brands, item.brand_id)
                                    }
                                </span>
                            </p>
                            <p className="left-align">
                                <b>Category : </b>
                                <span>
                                    {
                                        this.getType(this.state.categories, item.category_id)
                                    }
                                </span>
                            </p>
                            <p className="left-align"
                                style={
                                    !(this.state.hoveredIndex === index) ? {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        content: 'txt',
                                        textOverflow: 'ellipsis',
                                        marginTop: '6px',
                                    } : {marginTop: '6px',}}
                                onMouseOver={() => { this.setState({ hoveredIndex: index }) }}
                                onMouseOut={() => { this.setState({ hoveredIndex: null }) }}
                            >{item.description}</p>
                            {
                                this.displayCartButtons(item)
                            }
                        </div>
                    </div>
                );
            })
        );
    }

    displayCartButtons = (item) => {

        let selectedItem = this.props.addedItems.find(addedItem => addedItem.id === item.id);

        return selectedItem ? (
            <div className="row teal"
                style={{
                    border: '1px solid teal',
                    borderRadius: '3px',
                    margin: '20px 0px 0px 0px',
                    lineHeight: '35px',
                }}
            >
                <div className="col s4 center-align"
                    onClick={() => this.props.addQuantity(selectedItem)}
                >
                    <i className="tiny material-icons" style={{ verticalAlign: 'middle', paddingBottom: '3px', }}>add</i>
                </div>

                <div className="col s4 center-align white">
                    {selectedItem.quantity}
                </div>
                <div className="col s4 center-align" onClick={() => this.props.removeItemFromCart(selectedItem)}>
                    <i className="tiny material-icons" style={{ verticalAlign: 'middle', paddingBottom: '3px', }}>remove</i>
                </div>
            </div>
        ) : (
                <button className="btn white teal-text"
                    style={{
                        borderRadius: '2px',
                        border: '1px solid teal',
                        width: '100%',
                        marginTop: '20px',
                    }}
                    onClick={() => this.props.addItemToCart({ ...item, quantity: 1 })}
                >Add To Cart</button>
            );
    }

    render() {
        const products = this.state.actualProducts;
        return (
            <div>
                <div className="row" style={{ margin: '0px', }}>
                    <div className="col s12 m4 l3 left-align"
                        style={{
                            // height: '93vh',
                            padding: '0px'
                        }}
                    >
                        {
                            <SideBar products={products} handleProducts={this.applyFilters} />
                        }
                    </div>
                    <div className="col s12 m8 l9 grey lighten-4"
                        style={{
                            height: '93vh',
                            overflowY: 'scroll',
                            padding: '20px'

                        }}
                    >
                        <div className="box">
                            {
                                this.displayItems()                               
                            }
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.cart.addedItems,
        filteredSearchItems: state.product.filteredProducts,
        isSearchActive: state.product.isSearchActive,
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);