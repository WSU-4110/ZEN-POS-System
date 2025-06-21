import React from 'react';
import { Link } from 'react-router-dom';

const DEPARTMENTS = [
  { id: 1, name: 'Produce' },
  { id: 2, name: 'Dairy' },
  { id: 3, name: 'Meat & Seafood' },
  { id: 4, name: 'Bakery' },
  { id: 5, name: 'Household' },
  { id: 6, name: 'Pantry' },
  { id: 7, name: 'Beverages' },
  { id: 8, name: 'Restaurant' },
];

export default function DepartmentList() {
  return (
    <div className="col-md-8">
      <h2 className="mb-3">Welcome, Cashier1 — pick a department:</h2>
      <div className="list-group">
        {DEPARTMENTS.map(dep => (
          <Link
            key={dep.id}
            to={`/departments/${dep.id}/items`}
            className="list-group-item list-group-item-action"
          >
            {dep.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

