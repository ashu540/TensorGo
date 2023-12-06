import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [usageDetails, setUsageDetails] = useState({});
  const [billingInfo, setBillingInfo] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/api/usage-details')
      .then((response) => setUsageDetails(response.data))
      .catch((error) => console.error(error));

    axios.get('http://localhost:3001/api/billing-information')
      .then((response) => setBillingInfo(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleGenerateInvoice = () => {
    axios.post('http://localhost:3001/api/generate-invoice')
      .then((response) => {
        console.log(response.data);
        // Handle the response or update UI accordingly
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Usage Details</h2>
        <pre>{JSON.stringify(usageDetails, null, 2)}</pre>
      </div>
      <div>
        <h2>Billing Information</h2>
        <pre>{JSON.stringify(billingInfo, null, 2)}</pre>
      </div>
      <button onClick={handleGenerateInvoice}>Generate Invoice</button>
    </div>
  );
};

export default Dashboard;
