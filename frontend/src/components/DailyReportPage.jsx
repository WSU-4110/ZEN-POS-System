import React from 'react';

export default function DailyReportPage() {
  const dailySales = 123;
  const revenue = 456.78; // Replace with real data
  const mostSoldItem = 'Banana'; // Replace with real data

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Daily Report</h2>
      <div className="card p-3 mb-3">
        <h5>Sales Today</h5>
        <p>{dailySales} items sold</p>
      </div>
      <div className="card p-3 mb-3">
        <h5>Total Revenue</h5>
        <p>${revenue.toFixed(2)}</p>
      </div>
      <div className="card p-3">
        <h5>Most Sold Item</h5>
        <p>{mostSoldItem}</p>
      </div>
    </div>
  );
}
