import React, { Component } from 'react';
import * as API from '../api/ApisList';

class SideBar extends Component {

    constructor() {
        super();
        this.state = {            
            brands: null,
            categories: null,
            features: null,
            checkedBrands: new Map(),
            checkedCategories: new Map(),
            checkedFeatures: new Map(), 
        };
        this.activeTab = false;
        this.count = {
            brandsCount: 0,
            categoriesCount: 0,
            featuresCount: 0,
        };            
    }

    componentDidMount = () => {       
        
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

    applyFilters = () => {
        this.activeTab = false;
        let filteredItems = [];
        for (let brand of this.state.checkedBrands) {
            if (brand[1]) {
                filteredItems.push(this.props.products.filter(prod => prod.brand_id === brand[0]));

            }
        }

        for (let category of this.state.checkedCategories) {
            if (category[1]) {
                filteredItems.push(this.props.products.filter(prod => prod.category_id === category[0]));

            }
        }

        filteredItems = filteredItems.flat(Infinity);
        filteredItems = [...new Set(filteredItems)];
        // this.setState({ products: filteredItems });        
        this.props.handleProducts(filteredItems);
    }

    clearFilters = () => {
        this.activeTab = false;
        this.setState({ checkedBrands: new Map() });
        this.setState({ checkedCategories: new Map() });
        this.setState({ checkedFeatures: new Map() });
        this.count = {
            brandsCount: 0,
            categoriesCount: 0,
            featuresCount: 0,
        }
        this.props.handleProducts(this.props.products);
    }

    handleChange = (e, filterType) => {
        const isChecked = e.target.checked;
        const brand = e.target.name;
        switch (filterType) {
            case "brands":
                this.setState(prevState => ({ checkedBrands: prevState.checkedBrands.set(brand, isChecked) }));
                isChecked ? this.count.brandsCount++ : this.count.brandsCount--;
                break;
            case "categories":
                this.setState(prevState => ({ checkedCategories: prevState.checkedCategories.set(brand, isChecked) }));
                isChecked ? this.count.categoriesCount++ : this.count.categoriesCount--;
                break;
            case "features":
                this.setState(prevState => ({ checkedFeatures: prevState.checkedFeatures.set(brand, isChecked) }));
                isChecked ? this.count.featuresCount++ : this.count.featuresCount--;
                break;
        }
    }

    brandList = () => {
        return (
            this.state.brands.map((brand, index) => {
                return (
                    <div key={`checkbox-${brand.name}`} style={{ margin: '4px', }} className="collection-item">
                        <label>
                            <input
                                type="checkbox"
                                className="filled-in"
                                onChange={(e) => {                                    
                                    this.handleChange(e, "brands")

                                }} value={brand.name}
                                name={brand.id}
                                checked={this.state.checkedBrands.get(brand.id)}
                            />
                            <span>{brand.name}</span>
                        </label>                        
                    </div>
                )
            })
        )
    }

    categoryList = () => {
        return (
            this.state.categories.map(category => {
                return (
                    <div key={`checkbox-${category.name}`} style={{ margin: '4px', }} className="collection-item">
                        <label>
                            <input
                                type="checkbox"
                                className="filled-in"
                                onChange={(e) => {
                                    this.handleChange(e, "categories")

                                }} value={category.name}
                                name={category.id}
                                checked={this.state.checkedCategories.get(category.id)}
                            />
                            <span>{category.name}</span>
                        </label>
                    </div>
                )
            })
        )
    }

    featureList = () => {
        return (
            this.state.features.map(feature => {
                return (
                    <div key={`checkbox-${feature.name}`} style={{ margin: '4px', }} className="collection-item">
                        <label>
                            <input
                                type="checkbox"
                                className="filled-in"
                                onChange={(e) => {
                                    this.handleChange(e, "features")

                                }} value={feature.name}
                                name={feature.id}
                                checked={this.state.checkedFeatures.get(feature.id)}
                            />
                            <span>{feature.name}</span>
                        </label>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className="collection" style={{ margin: '0px', border: 'none' }}>

                <div>
                    <a href="#" className="collection-item active" onClick={this.clearFilters}>ALL</a>
                </div>

                <div>
                    <a href="#" className="collection-item" onClick={() => this.activeTab ? this.activeTab = false : this.activeTab = "brand"}>
                        Brand
                        {
                            this.count.brandsCount ? <span style={{ float: 'right' }}>{this.count.brandsCount}</span> : null
                        }
                    </a>
                    {
                        this.activeTab === "brand" ? this.brandList() : null
                    }
                </div>

                <div>
                    <a href="#" className="collection-item" onClick={() => this.activeTab ? this.activeTab = false : this.activeTab = "category"}>
                        Category
                        {
                            this.count.categoriesCount ? <span style={{ float: 'right' }}>{this.count.categoriesCount}</span> : null
                        }
                    </a>
                    {
                        this.activeTab === "category" ? this.categoryList() : null
                    }
                </div>

                <div>
                    <a href="#" className="collection-item" onClick={() => this.activeTab ? this.activeTab = false : this.activeTab = "feature"}>
                        Feature
                        {
                            this.count.featuresCount ? <span style={{ float: 'right' }}>{this.count.featuresCount}</span> : null
                        }
                    </a>
                    {
                        this.activeTab === "feature" ? this.featureList() : null
                    }
                </div>

                <div className="row">
                    <div className="col s6" style={{ padding: '0px', margin: '0px', background: "yellow" }}>
                        <button className="btn teal white-text" style={{ width: "100%", borderRadius: '0px', }} onClick={this.applyFilters}>Apply</button>
                    </div>
                    <div className="col s6" style={{ padding: '0px', margin: '0px', background: "green" }}>
                        <button className="btn teal white-text" style={{ width: "100%", borderRadius: '0px', }} onClick={this.clearFilters}>Clear</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default SideBar;