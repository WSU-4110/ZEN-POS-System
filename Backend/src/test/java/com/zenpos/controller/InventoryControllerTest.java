package com.zenpos.controller;

import com.zenpos.entity.Department;
import com.zenpos.entity.Item;
import com.zenpos.repository.DepartmentRepository;
import com.zenpos.repository.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InventoryControllerTest {

    @Mock
    private ItemRepository itemRepo;

    @Mock
    private DepartmentRepository deptRepo;

    @InjectMocks
    private InventoryController inventoryController;

    private Item sampleItem;
    private Department sampleDept;

    @BeforeEach
    void setUp() {
        sampleDept = new Department();
        sampleDept.setId(1L);
        sampleDept.setName("Electronics");

        sampleItem = new Item("Laptop", 1200.0, 10, sampleDept);
        sampleItem.setId(100L);
    }

    @Test
    void testAllItems() {
        when(itemRepo.findAll()).thenReturn(Collections.singletonList(sampleItem));
        List<Item> items = inventoryController.all();
        assertEquals(1, items.size());
        assertEquals("Laptop", items.get(0).getName());
        verify(itemRepo, times(1)).findAll();
    }

    @Test
    void testCreateItemSuccess() {
        Map<String, Object> request = new HashMap<>();
        request.put("name", "Phone");
        request.put("quantity", 5);
        request.put("price", 999.99);
        request.put("departmentId", 1);

        when(deptRepo.findById(1L)).thenReturn(Optional.of(sampleDept));
        when(itemRepo.save(any(Item.class))).thenReturn(sampleItem);

        ResponseEntity<Item> response = inventoryController.create(request);

        assertEquals(201, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        verify(itemRepo, times(1)).save(any(Item.class));
    }

    @Test
    void testCreateItemDepartmentNotFound() {
        Map<String, Object> request = new HashMap<>();
        request.put("name", "Phone");
        request.put("quantity", 5);
        request.put("price", 999.99);
        request.put("departmentId", 99);

        when(deptRepo.findById(99L)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> inventoryController.create(request));
        verify(itemRepo, never()).save(any());
    }

    @Test
    void testUpdateItemSuccess() {
        Map<String, Object> updateRequest = new HashMap<>();
        updateRequest.put("name", "Updated Laptop");
        updateRequest.put("price", 1500.0);

        when(itemRepo.findById(100L)).thenReturn(Optional.of(sampleItem));
        when(itemRepo.save(any(Item.class))).thenReturn(sampleItem);

        ResponseEntity<Item> response = inventoryController.update(100L, updateRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Updated Laptop", response.getBody().getName());
    }

    @Test
    void testUpdateItemNotFound() {
        Map<String, Object> updateRequest = new HashMap<>();
        updateRequest.put("name", "DoesNotExist");

        when(itemRepo.findById(200L)).thenReturn(Optional.empty());

        ResponseEntity<Item> response = inventoryController.update(200L, updateRequest);
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void testUpdateItemQuantityOnly() {
        Map<String, Object> updateRequest = new HashMap<>();
        updateRequest.put("quantity", 50);

        when(itemRepo.findById(100L)).thenReturn(Optional.of(sampleItem));
        when(itemRepo.save(any(Item.class))).thenReturn(sampleItem);

        ResponseEntity<Item> response = inventoryController.update(100L, updateRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(50, response.getBody().getStock());
    }
}
