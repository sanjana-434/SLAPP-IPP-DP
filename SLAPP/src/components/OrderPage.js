import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderPage(){

  const [orders, setOrders] = useState([]);
  // const [globalVariable,setGlobalVarible] = useState([1,0]);
  const [newOrder, setNewOrder] = useState({
    potatoChips: 0,
    chocolateBar: 0,
    cookies: 0
    // mixedBerries: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddOrder = () => {
    // Validate the input values before adding an order
    if (validateOrder(newOrder)) {
      setOrders([...orders, newOrder]);
      setNewOrder({
        potatoChips: 0,
        chocolateBar: 0,
        cookies: 0,
        // mixedBerries: 0,
      });
      setIsModalOpen(false); // Close the modal
      // sendOrdersToServer();
    } else {
      alert('Please enter valid quantities (greater than 0) for all items.');
    }
  };

  const validateOrder = (order) => {
    return (
      order.potatoChips >= 0 &&
      order.chocolateBar >= 0 &&
      order.cookies >= 0 
      // order.mixedBerries >= 0
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Ensure the input value is an integer greater than or equal to 0
    const parsedValue = parseInt(value, 10);
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: isNaN(parsedValue) ? 0 : Math.max(0, parsedValue),
    }));
  };
  const navigate = useNavigate();

  const handleShowData = () => {
    if (orders.length > 0) {
      var data_;
      fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orders), // Send the entire orders array
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Orders sent to the server:", data);
          navigate('/data',{ state: { data: data } });
        })
        .catch((error) => {
          console.error("Error sending orders:", error);
        });
        
    } else {
      alert('No orders to submit.');
    }
  }

  return (
    <div className="App">
      <h1>Storage Location Assignment Planning for Snack Shop</h1>
      <button onClick={() => setIsModalOpen(true)}>Create New Order</button>
      <button onClick={handleShowData}>Submit All Orders</button>
      {isModalOpen && (
        <div className="modal">
          <h2>New Order</h2>
          <div className="item">
            <label>Potato Chips:</label>
            <input
              type="number"
              name="potatoChips"
              value={newOrder.potatoChips}
              onChange={handleInputChange}
            />
          </div>
          <div className="item">
            <label>Chocolate Bar:</label>
            <input
              type="number"
              name="chocolateBar"
              value={newOrder.chocolateBar}
              onChange={handleInputChange}
            />
          </div>
          <div className="item">
            <label>Cookies:</label>
            <input
              type="number"
              name="cookies"
              value={newOrder.cookies}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="item">
            <label>Mixed Berries:</label>
            <input
              type="number"
              name="mixedBerries"
              value={newOrder.mixedBerries}
              onChange={handleInputChange}
            />
          </div> */}
          <button onClick={handleAddOrder}>Make Order</button>
          
        </div>
      )}
      {orders.map((order, index) => (
        <div key={index} className="order">
          <h2>Order {index + 1}</h2>
          <div className="item">
            {/* <img src="path/to/potatoChips.jpg" alt="Potato Chips" /> */}
            <label>Potato Chips:</label>
            <span>{order.potatoChips}</span>
          </div>
          <div className="item">
            {/* <img src="path/to/potatoChips.jpg" alt="Chocolate Bar" /> */}
            <label>Chocolate Bar:</label>
            <span>{order.chocolateBar}</span>
          </div>
          <div className="item">
            {/* <img src="path/to/potatoChips.jpg" alt="Cookies" /> */}
            <label>Cookies:</label>
            <span>{order.cookies}</span>
          </div>
          {/* <div className="item">
            <label>Mixed Berries:</label>
            <span>{order.mixedBerries}</span>
          </div> */}
          {/* (Repeat the same structure for other snack items) */}
        </div>
      ))}
    </div>
  );
}
export var globalVariable;
export default OrderPage;
