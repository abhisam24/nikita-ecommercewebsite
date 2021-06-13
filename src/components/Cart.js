import React, {useState} from 'react';
import formatCurrency from "../doller";
import Fade from "react-reveal/Fade";

const Cart = ({cartItems, removeFromCart,createOrders}) => {
    const[checkOut, setCheckout] = useState({showCheckout: false,})
    const[formData,setFormData]=useState({
      name:"",
        email:"",
        address:"",
    })
   
   const handleInput = (e) => {
       const {name, value } = e.target;
        setFormData((preValue) => {
            return{...preValue, [name] : value} });
      };
    
      const createOrder = (event) => {
        event.preventDefault();
        const order = {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          cartItems: cartItems,
          total: cartItems.reduce((a, c) => a + c.price * c.count, 0),
        };
        createOrders(order);
      };      
  
      
    return (
        <>
        {/* showing cart summery */}
        <div>
           {cartItems.length === 0?
           (<div className="cart cart-header">
           Cart is Empty</div>):
           (
            <div className="cart cart-header">
            You have {cartItems.length} items in your cart{""}</div>
           )
           } 
           </div>
           {/* showing cart data */}
           <div className="cart">
           <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}{" "}
                        <button
                          className="button"
                          onClick={() => removeFromCart(item)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setCheckout({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {checkOut.showCheckout && (
                  <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input
                            name="email"
                            type="email"
                            value = {checkOut.email}
                            required
                            onChange={handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name="name"
                            type="text"
                            value = {checkOut.name}
                            required
                            onChange={handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            name="address"
                            type="text"
                            value = {checkOut.address}
                            required
                            onChange={handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className="button primary" type="submit">
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                  </Fade>
              )}
            </div>
          )}
        </>
    )
}

export default Cart
