import React, { useState } from 'react';
import formatCurrency from "../doller";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";


const Products = (props) => {

 const[productValue, setproductValue] = useState({product: null});
 const openModal = (product) => {
   setproductValue({product: product});
 };   
 const closeModal = () => {
  setproductValue({product: null});
};   
const product = productValue.product;
 return (
        <div>
        <Fade bottom cascade>
            <ul className="products">
              {props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a href= {"#" + product._id}
                    onClick={() => openModal(product)}>
                      <img src={product.image} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button className="button primary" onClick={() => props.addToCart(product)}>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            </Fade>
            {
              product &&(
                <Modal isOpen={true} onRequestClose={closeModal}>
            <Zoom>
              <button className="close-modal" onClick={closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={productValue.product.image} alt={productValue.product.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{productValue.product.title}</strong>
                  </p>
                  <p>{productValue.product.description}</p>
                  <p>
                    Avaiable Sizes:{" "}
                    {productValue.product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div>
                  Price:{" "}
                    {formatCurrency(productValue.product.price)}</div>
                
                </div>
              </div>
            </Zoom>
          </Modal>              )
            }
        </div>
    )
}

export default Products
