const handleAdminLogin = async () => {
  const { value: password } = await Swal.fire({
    title: 'Admin Authentication',
    text: 'Enter administrator credentials to proceed',
    icon: 'shield',
    customClass: 'admin-password-popup',
    input: 'password',
    inputPlaceholder: 'Enter your password...',
    inputAttributes: {
      'autocomplete': 'current-password',
      'aria-label': 'Enter administrator password'
    },
    showCancelButton: true,
    confirmButtonText: 'Authenticate',
    cancelButtonText: 'Cancel',
    allowOutsideClick: false,
    backdrop: 'rgba(0,0,0,0.7)',
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage('Password is required');
      }
      return value;
    }
  });

  if (password === 'admin123') {
    Swal.fire({
      icon: 'success',
      title: 'Access Granted',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
    navigate('/manager');
  } else if (password) {
    Swal.fire({
      icon: 'error',
      title: 'Access Denied',
      text: 'Incorrect password',
      confirmButtonText: 'Try Again'
    });
  }
};