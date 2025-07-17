import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { pinLogin } from '../api/api';  //

export default function AdminPasswordPrompt() {
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    const { value: pin } = await Swal.fire({
      title: 'Admin PIN Login',
      input: 'password',
      inputLabel: 'Enter your admin PIN',
      inputAttributes: {
        maxlength: 6,
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Login',
      preConfirm: v => v || Swal.showValidationMessage('PIN is required')
    });
    if (!pin) return;

    try {
      const result = await pinLogin(pin);  // calls POST /api/admin/pin-login
      if (result.status === 'success' && result.role === 'MANAGER') {
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('username', result.username);
        localStorage.setItem('role', result.role);
        await Swal.fire('Welcome', `Hello ${result.username}`, 'success');
        navigate('/manager');
      } else {
        Swal.fire('Access Denied', result.error || 'Invalid PIN or insufficient role', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Server unreachable or bad PIN', 'error');
    }
  };

  return (
      <button onClick={handleAdminLogin} className="btn btn-warning">
        Admin Login
      </button>
  );
}
