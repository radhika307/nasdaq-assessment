import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./App.css"; // We'll create this for styling

function App() {
  const [stocks, setStocks] = useState(["AAPL", "MSFT", "GOOG", "NVDA", "SPX"]);
  const [stock1, setStock1] = useState("AAPL");
  const [stock2, setStock2] = useState("MSFT");
  const [startDate, setStartDate] = useState("2025-01-20");
  const [endDate, setEndDate] = useState("2025-01-28");
  const [data, setData] = useState(null);

  // Fetch data from Flask backend
  const loadData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/data?s1=${stock1}&s2=${stock2}&start=${startDate}&end=${endDate}`,
      );
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching data:", err);
      setData(null);
    }
  };

  useEffect(() => {
    loadData();
  }, [stock1, stock2, startDate, endDate]);

  // Prepare chart data
  const chartData =
    data &&
    data[s1] &&
    data[s2] &&
    data[s1].dates.length > 0 &&
    data[s2].dates.length > 0
      ? {
          labels: data[s1].dates,
          datasets: [
            {
              label: s1,
              data: data[s1].prices,
              borderWidth: 2,
            },
            {
              label: s2,
              data: data[s2].prices,
              borderWidth: 2,
            },
          ],
        }
      : null;

  return (
    <div className="container">
      <h1>Stock Comparison</h1>

      <div className="controls">
        <div>
          <label>Stock 1:</label>
          <select value={stock1} onChange={(e) => setStock1(e.target.value)}>
            {stocks.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Stock 2:</label>
          <select value={stock2} onChange={(e) => setStock2(e.target.value)}>
            {stocks.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={loadData}>Load</button>
      </div>

      {data && (
        <>
          <table className="results-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stock1}</td>
                <td>{data[stock1].return.toFixed(2)}</td>
              </tr>
              <tr>
                <td>{stock2}</td>
                <td>{data[stock2].return.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Difference</td>
                <td>
                  {(data[stock1].return - data[stock2].return).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          {chartData && (
            <div className="chart-container">
              {chartData && <Line data={chartData} />}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
