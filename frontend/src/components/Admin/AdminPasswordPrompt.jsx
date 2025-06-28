import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function AdminPasswordPrompt() {
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Admin Login',
      html:
          '<input id="swal-username" class="swal2-input" placeholder="Username">' +
          '<input id="swal-password" type="password" class="swal2-input" placeholder="Password">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Login',
      preConfirm: () => {
        const username = document.getElementById('swal-username').value;
        const password = document.getElementById('swal-password').value;
        if (!username || !password) {
          Swal.showValidationMessage('Please enter both username and password');
          return false;
        }
        return { username, password };
      }
    });

    if (!formValues) return;

    try {
      const res = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });

      const result = await res.json();

      if (res.ok && result.status === 'success') {
        localStorage.setItem('isAdmin', 'true');
        Swal.fire('Success', 'Admin login successful', 'success');
        navigate('/manager');
      } else {
        Swal.fire('Access Denied', result.error || 'Invalid credentials', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Unable to contact server or invalid credentials', 'error');
    }
  };

  return (
      <button onClick={handleAdminLogin} className="btn btn-warning">
        Admin Login
      </button>
  );
}
