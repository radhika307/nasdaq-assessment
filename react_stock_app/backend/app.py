from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# ---------------------------
# Load stock identifiers
# ---------------------------
stock_ids = pd.read_csv("stock_identifiers.csv")
# Ensure id_stock is string and remove commas
stock_ids["id_stock"] = stock_ids["id_stock"].astype(str).str.replace(",", "")
stock_ids["symbol"] = stock_ids["symbol"].str.strip()

# ---------------------------
# Load stock prices
# ---------------------------
prices = pd.read_csv("stock_prices.csv")
# Ensure id_stock is string and remove commas
prices["id_stock"] = prices["id_stock"].astype(str).str.replace(",", "")
# Convert date column to datetime
prices["date"] = pd.to_datetime(prices["date"], dayfirst=True)
# Merge symbol into prices
prices = prices.merge(stock_ids[["id_stock", "symbol"]], on="id_stock", how="left")
# Convert price columns to float (remove commas if any)
prices["close"] = prices["close"].astype(str).str.replace(",", "").astype(float)
prices["high"] = prices["high"].astype(str).str.replace(",", "").astype(float)
prices["low"] = prices["low"].astype(str).str.replace(",", "").astype(float)

# ---------------------------
# API endpoint
# ---------------------------
@app.route("/data")
def data():
    s1 = request.args.get("s1")
    s2 = request.args.get("s2")
    start = pd.to_datetime(request.args.get("start"))
    end = pd.to_datetime(request.args.get("end"))

    # Filter date range
    df = prices[(prices["date"] >= start) & (prices["date"] <= end)]

    def build(stock):
        d = df[df["symbol"] == stock].sort_values("date")
        if d.empty:
            return {
                "dates": [],
                "prices": [],
                "return": 0
            }
        return {
            "dates": d["date"].dt.strftime("%Y-%m-%d").tolist(),
            "prices": d["close"].tolist(),
            "return": float(d.iloc[-1]["close"] - d.iloc[0]["close"])
        }

    return jsonify({
        s1: build(s1),
        s2: build(s2)
    })

# ---------------------------
# Run app
# ---------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
