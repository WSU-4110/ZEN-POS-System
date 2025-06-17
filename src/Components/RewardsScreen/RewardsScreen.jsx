import React, { useState } from 'react';

function RewardsScreen({ onContinue }) {
  const [phone, setPhone] = useState('');
  const [enroll, setEnroll] = useState(false);

  const handleContinue = () => {
    onContinue();
  };

  return (
    <div className="rewards-container">
      <h2>Customer Rewards</h2>
      <input
        placeholder="Phone Number"
        onChange={e => setPhone(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={enroll}
          onChange={e => setEnroll(e.target.checked)}
        />
        Enroll in Rewards Program
      </label>
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
}

export default RewardsScreen;
