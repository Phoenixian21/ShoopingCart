import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CreatSlice';
import { Link } from 'react-router-dom';
import './CartItem.css';

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total number of items in the cart
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
  };

  const handleContinueShopping = () => {
    // Logic for navigating back to shopping page
  };

  const handleCheckoutShopping = () => {
    alert("Coming Soon");
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3 style={{ color: 'black' }}>Total Number of Plants: {calculateTotalItems()}</h3>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Price: ${item.cost}</div>
              <div className="cart-item-quantity">
                {/* Decrement button */}
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                
                {/* Increment button */}
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              
              {/* Delete button */}
              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
        <h3>Total Amount: ${calculateTotalAmount()}</h3>
      </div>
      <div className="continue_shopping_btn">
        <Link to="/products">
          <button className="get-started-button">Continue Shopping</button>
        </Link>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
