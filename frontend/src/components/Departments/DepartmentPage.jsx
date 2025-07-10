import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from"../api/api"
import "./Department.css";

export default function DepartmentPage() {
    const { user } = useAuth();
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await api.get('/departments');
                setDepartments(res.data);
            } catch (err) {
                console.error('Failed to load departments:', err);
                setDepartments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    return (
        <div className="p-4">
            <h2>Welcome, {user}</h2>
            <h5>Select Department</h5>
            {loading ? (
                <p>Loading departments...</p>
            ) : (
                <div className="department-list">
                    {departments.map(dep => (
                        <Link
                            key={dep.id}
                            to={`/departments/${dep.id}/items`}
                            className="department-btn"
                        >
                            {dep.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

