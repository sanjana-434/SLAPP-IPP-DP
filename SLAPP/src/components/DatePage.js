import React from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import {globalVariable} from './OrderPage';

function DataPage() {
  // Fetch and display the fetched data here
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state && location.state.data;

  const handleBackToOrders = () => {
    navigate('/'); // Navigate back to the order form page
  }
  const hello =() =>{
    console.log(globalVariable);
  }

  return (
    <div className = 'result'>
      {data && (
        <div>
          <h3>Reassignments</h3>
          <p>{JSON.stringify(data.x, null)}</p>
        </div>
      )}
      <button onClick={handleBackToOrders}>Back to Orders</button>
    </div>
  );
}

export default DataPage;
