import React from 'react';
import '../index.css';
import api from '../api/api';


export default function RewardsScreen() {
  return (
    <div>
      <button className="btn btn-outline-secondary back-button" onClick={() => window.history.back()}>
        ← Back
      </button>

      <div className="card card-pos p-4 text-center">
        <h4>Rewards</h4>
        <p>Coming soon: track loyalty points, redeem rewards, etc.</p>
      </div>
    </div>
  );
}
