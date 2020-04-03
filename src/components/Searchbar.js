import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../api/ApisList';

class Searchbar extends Component {

    constructor() {
        super();
        this.state = {
            filtered: [],
        };
        this.products = null;
    }

    componentDidMount = () => {
        API.products.then(data => {
            this.products = data;
        });
    }

    handleChange = (e) => {        
        if (e.target.value) {
            const filter = e.target.value.toLowerCase();
            let filteredItems = this.products.filter(prod => {                
                return prod.name.toLowerCase().includes(filter) || prod.description.toLowerCase().includes(filter)
            });
            this.setState({ filtered: filteredItems });
            this.props.addSearchedProducts(filteredItems);
        } else {
            this.props.isSearchActive();
        }
    }

    render() {
        return (
            <div>
                <input type="text" className="input black-text" placeholder="Search..."
                    onChange={this.handleChange}
                    style={{
                        background: 'white',
                        padding: '1px',
                        margin: '0px',
                        borderRadius: '4px',
                        border: 'none',
                        height: '30px'
                    }}
                />
                {
                    this.props.searchActive ? (
                        <div class="collection" style={{
                            position: 'absolute',
                            top: '6vh',
                            zIndex: '1',
                            width: 'parent',
                            margin: '0px',
                        }}>
                            {
                                this.state.filtered.map(item => (
                                    <a href="#!" class="collection-item">{item.name}</a>
                                ))
                            }
                        </div>
                    ): null
                }                
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filteredSearchItems: state.product.filteredProducts,
        searchActive: state.product.isSearchActive,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addSearchedProducts: (items) => {
            dispatch({ type: 'ADD_SEARCHED_PRODUCTS', items: items })
        },
        isSearchActive: () => {
            dispatch({ type: 'NO_Data',})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);