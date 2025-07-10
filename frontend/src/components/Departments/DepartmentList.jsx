import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';

export default function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/departments')
            .then(res => {
                const data = res.data;
                if (Array.isArray(data)) {
                    setDepartments(data);
                } else {
                    setDepartments([]);
                    console.error('Expected an array but got:', data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching departments:', err);
                setError('Failed to load departments.');
                setLoading(false);
            });
    }, []);

    const handleDepartmentClick = (id) => {
        navigate(`/departments/${id}/items`);
    };

    if (loading) return <Spinner animation="border" variant="primary" />;

    return (
        <div className="row">
            <h2 className="mb-4">Select a Department</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {departments.length === 0 ? (
                <p>No departments found.</p>
            ) : (
                departments.map(dept => (
                    <div className="col-md-3 mb-4" key={dept.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <Card.Title>{dept.name}</Card.Title>
                                <Button variant="primary" onClick={() => handleDepartmentClick(dept.id)}>
                                    View Items
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            )}
        </div>
    );
}
