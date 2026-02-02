# Stock Comparison Web Application

This project is a simple full-stack web application that allows users to compare the price performance of two stocks over a selected date range.

The application was built as part of a technical assessment and is fully containerized using Docker and Docker Compose.

---

## 🚀 Features

* Select **start date** and **end date** (based on available CSV data)
* Select **two stocks** from the available list
* View:

  * Individual returns for each stock
  * Difference in returns between the two stocks
* Interactive **line chart** showing price movement of both stocks
* Automatic update when dates or stocks are changed

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Chart.js + react-chartjs-2
* Fetch API

### Backend

* Python (Flask)
* Pandas
* Flask-CORS

### Data

* `stock_prices.csv` – historical stock prices
* `stock_identifiers.csv` – stock ID to symbol mapping

### Containerization

* Docker
* Docker Compose

---

## 📁 Project Structure

```
react_stock_app/
│
├── backend/
│   ├── app.py
│   ├── stock_prices.csv
│   ├── stock_identifiers.csv
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## 🐳 Running the Application (Recommended)

### Prerequisites

* Docker
* Docker Compose

### Steps

1. Clone the repository or extract the ZIP

2. From the project root, run:

```bash
docker-compose up --build
```

3. Access the application:

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend API: [http://localhost:5000](http://localhost:5000)

---

## 🔌 API Endpoint

### GET `/data`

**Query Parameters:**

* `s1` – Stock symbol (e.g. `AAPL`)
* `s2` – Stock symbol (e.g. `MSFT`)
* `start` – Start date (`YYYY-MM-DD`)
* `end` – End date (`YYYY-MM-DD`)

**Example:**

```
http://localhost:5000/data?s1=AAPL&s2=MSFT&start=2025-01-20&end=2025-01-28
```

---

## 📝 Notes

* `node_modules` is intentionally excluded (installed during Docker build)
* CSV numeric values with commas are cleaned during ingestion
* If no data exists for a selected stock/date range, the application gracefully returns zero values

---

## 📦 Submission Note

Some email providers block `.js` files in ZIP attachments. If applicable, this project can be shared via:

* GitHub repository (preferred)

---

## 👤 Author

Radhika R

---

Thank you for reviewing this submission.
