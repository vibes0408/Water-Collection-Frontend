import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; 

const App = () => {
  const [data, setData] = useState({ temperature: "", pressure: "", depth: "" });
  const [loading, setLoading] = useState(true);

  const fetchLatestEntry = async () => {
    try {
      const response = await axios.get("https://backend-watercollection.onrender.com/getLatestEntry");
      setData({
        temperature: response.data.temperature,
        pressure: response.data.pressure,
        depth: response.data.depth,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestEntry(); 
    const interval = setInterval(fetchLatestEntry, 5000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="container">
      <h1 className="title">Real Time Sensor Data</h1>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="data-container">
          <div className="data-card">
            <h2>Temperature</h2>
            <p>{data.temperature} °C</p>
          </div>
          <div className="data-card">
            <h2>Pressure</h2>
            <p>{data.pressure} hPa</p>
          </div>
          <div className="data-card">
            <h2>Depth</h2>
            <p>{data.depth} meters</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
