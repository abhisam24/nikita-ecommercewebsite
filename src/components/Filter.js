import React from 'react';
import Products from './Products';

const Filter = ({count,size,sorts,filterProducts,sortProducts,product}) => {

    return (
    
        <>
            <div className="filter">
        <div className="filter-result">
          {count} Products
        </div>
        <div className="filter-sort">
          Order{" "}
          <select
            value={sorts}
            onChange={sortProducts}>
            <option value="latest">Populer</option>
            <option value="lowest">Low to high</option>
            <option value="highest">High to low</option>
          </select>
        </div>
        <div className="filter-size">
          Filter{" "}
          <select
            value={size}
            onChange={filterProducts}
          >
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
        </>
    )
}

export default Filter
