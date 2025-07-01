import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DepartmentPage.css'
const DEPARTMENTS = [
  { id: 1, name: 'Produce' },
  { id: 2, name: 'Dairy' },
  { id: 3, name: 'Meat & Seafood' },
  { id: 4, name: 'Bakery' },
  { id: 5, name: 'Household' },
  { id: 6, name: 'Pantry' },
  { id: 7, name: 'Beverages' },
  { id: 8, name: 'Restaurant' }
];

export default function DepartmentPage() {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h2>Welcome, {user}</h2>
      <h5>Select Department</h5>
      <div className="department-list">
        {DEPARTMENTS.map(dep => (
          <Link
            key={dep.id}
            to={`/departments/${dep.id}/items`}
            className="department-btn"
          >
            {dep.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
