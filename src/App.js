import './App.css';
import data from "./data.json"
import {useState } from 'react';
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

function App() {
 const[items, setItems] = useState({
   products: data.products,
   size: "",
   sort: "",
 });
 const [itemsInCart, setItemsInCart] = useState({cartItems: JSON.parse(localStorage.getItem("cartItems"))?
 JSON.parse(localStorage.getItem("cartItems")): [],});

//creating order
const createOrder = (order) => {
  alert(`Dear ${order.name}, Thank you for shopping with us\n
   Delivery address: ${order.address} \n
   Total Amount: ${order.total} \n
   payment : Cash on delivery \n
   Please check your email "${order.email}" for further details`);
  setItemsInCart({cartItems:[]});
  localStorage.clear("cartItems");
  window.location.reload();
};
 //removing product from the cart
const removeFromCart = (product) =>{
const cartItems = itemsInCart.cartItems.slice();
setItemsInCart({cartItems : cartItems.filter( (x) => x._id !== product._id),});
localStorage.setItem("cartItems",JSON.stringify(cartItems.filter( (x) => x._id !== product._id)));
};

//adding product to the cart
 const addToCart = (product) => {
   const cartItems = itemsInCart.cartItems.slice();
   let alreadyInCart = false;
   cartItems.forEach((item) => {
     if(item._id === product._id){
       alreadyInCart = true;
       item.count++;
     }
   });
   if(!alreadyInCart){
     cartItems.push({...product, count: 1});
   }
   setItemsInCart({cartItems});
   localStorage.setItem("cartItems",JSON.stringify(cartItems));
 };

 //sorting product
 const sortProducts = (event) => {
   const sort = event.target.value;
    setItems(
      (items) =>(
        {
           sort: sort,
           products: items.products.slice().sort((a,b)=>(
             sort === "lowest" ?
             ((a.price > b.price) ? 1 : -1):
             sort === "highest"?
             ((a.price < b.price) ? 1 : -1):
             ((a._id < b._id) ? 1 : -1)
           ))
        }
      )
    );
 }


 //filtering product
 const filterProducts = (event)  => {
   if(event.target.value===""){
     setItems({
       size:event.target.value, products: data.products
     });
   }
   else{
    setItems({
      size:event.target.value,
      products: data.products.filter(product => product.availableSizes.indexOf(event.target.value)>=0),
         });
   }
 }

  return (
    <>
          <div className="grid-container">
            <header>
              E-commerce Website Using Reactjs
            </header>
            <main>
            
        <div className="content">
          <div className="main">
          <Filter count = {items.products.length}
            size={items.size}
            sorts = {items.sort}
            filterProducts={filterProducts}
            sortProducts={sortProducts}
          />
        <Products products = {items.products} addToCart = {addToCart}/>
          </div>
          <div className="sidebar">
            <Cart cartItems = {itemsInCart.cartItems} 
            removeFromCart={removeFromCart}
              createOrders = {createOrder}
            />
          </div>
        </div>
            </main>
            <footer>Created by Nikita Samdani &copy; {new Date().getFullYear()} All rights reserved</footer>
          </div>
      
    </>
  );
}

export default App;
