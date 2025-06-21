import React from 'react';
import '../index.css';

export default function ManagerDashboard() {
  return (
    <div>
      <button className="btn btn-outline-secondary back-button" onClick={() => window.history.back()}>
        ← Back
      </button>

      <div className="card card-pos p-4 text-center">
        <h4>Manager Dashboard</h4>
        <p>Coming soon: sales reports, inventory management, and more.</p>
      </div>
    </div>
  );
}
