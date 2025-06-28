import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../index.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Espresso Machine', category: 'Equipment', quantity: 5, lowStock: false },
    { id: 2, name: 'Coffee Beans (1kg)', category: 'Consumables', quantity: 12, lowStock: false },
    { id: 3, name: 'Paper Cups (100pk)', category: 'Packaging', quantity: 3, lowStock: true },
  ]);

  const handleAddNewItem = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Inventory Item',
      html:
        '<div class="swal2-form">' +
        '<input id="swal-name" class="swal2-input" placeholder="Item Name" required>' +
        '<select id="swal-category" class="swal2-input">' +
        '  <option value="">Select Category</option>' +
        '  <option value="Equipment">Equipment</option>' +
        '  <option value="Consumables">Consumables</option>' +
        '  <option value="Packaging">Packaging</option>' +
        '  <option value="Other">Other</option>' +
        '</select>' +
        '<input id="swal-quantity" class="swal2-input" placeholder="Quantity" type="number" min="0">' +
        '<div class="swal2-checkbox">' +
        '  <input type="checkbox" id="swal-lowstock">' +
        '  <label for="swal-lowstock">Mark as Low Stock</label>' +
        '</div>' +
        '</div>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add Item',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        return {
          name: document.getElementById('swal-name').value,
          category: document.getElementById('swal-category').value,
          quantity: parseInt(document.getElementById('swal-quantity').value) || 0,
          lowStock: document.getElementById('swal-lowstock').checked
        };
      },
      validationMessage: 'Please fill all required fields'
    });

    if (formValues) {
      if (!formValues.name || !formValues.category) {
        Swal.showValidationMessage('Name and category are required');
        return false;
      }

      const newItem = {
        id: inventory.length + 1,
        name: formValues.name,
        category: formValues.category,
        quantity: formValues.quantity,
        lowStock: formValues.lowStock || formValues.quantity < 5
      };

      setInventory([...inventory, newItem]);
      
      Swal.fire({
        icon: 'success',
        title: 'Item Added!',
        text: `${newItem.name} has been added to inventory`,
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  <button className="btn btn-primary me-2" onClick={handleAddNewItem}>
    <i className="bi bi-plus-circle"></i> Add New Item
  </button>

}