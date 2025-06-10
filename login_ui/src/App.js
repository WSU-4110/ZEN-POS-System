import React, { useState } from 'react';
import './App.css';
import DepartmentSelection from './Components/DepartmentSelection/DepartmentSelection';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div> 
      <h1>Departments</h1>
      <button onClick={() => setIsPopupOpen(true)}>Open Popup</button>
      <DepartmentSelection 
        trigger={isPopupOpen} 
        setTrigger={setIsPopupOpen}
      >
        <h3>My Popup</h3>
      </DepartmentSelection>
    </div>
  );
}

export default App;