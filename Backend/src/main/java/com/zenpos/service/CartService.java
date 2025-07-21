package com.zenpos.service;

import com.zenpos.entity.CartEntry;
import com.zenpos.entity.Item;
import com.zenpos.repository.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CartServiceTest {

    @Mock
    private ItemRepository itemRepo;

    @InjectMocks
    private CartService cartService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetCart_EmptyCart() {
        List<CartEntry> cart = cartService.getCart("user1");
        assertNotNull(cart);
        assertTrue(cart.isEmpty());
    }

    @Test
    void testAddItem_Success() {
        Item item = new Item();
        item.setId(1L);
        item.setName("Apple");
        item.setPrice(1.5);

        when(itemRepo.findById(1L)).thenReturn(Optional.of(item));

        cartService.addItem("user1", 1L);
        List<CartEntry> cart = cartService.getCart("user1");

        assertEquals(1, cart.size());
        assertEquals("Apple", cart.get(0).getName());
    }

    @Test
    void testAddItem_ItemNotFound() {
        when(itemRepo.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                cartService.addItem("user1", 99L));
        assertEquals("Item not found", exception.getMessage());
    }

    @Test
    void testAddCustom_MultipleItems() {
        cartService.addCustom("user1", "CustomWater", 2.0, 3);
        List<CartEntry> cart = cartService.getCart("user1");

        assertEquals(3, cart.size());
        assertEquals("CustomWater", cart.get(0).getName());
    }

    @Test
    void testRemoveItem_ValidIndex() {
        cartService.addCustom("user1", "Juice", 1.0, 2);
        cartService.removeItem("user1", 1);

        List<CartEntry> cart = cartService.getCart("user1");
        assertEquals(1, cart.size());
        assertEquals("Juice", cart.get(0).getName());
    }

    @Test
    void testRemoveItem_InvalidIndex() {
        cartService.addCustom("user1", "Bread", 1.2, 1);
        cartService.removeItem("user1", 5); // Invalid index

        List<CartEntry> cart = cartService.getCart("user1");
        assertEquals(1, cart.size()); // Item should still be there
    }

    @Test
    void testClearCart() {
        cartService.addCustom("user1", "Milk", 1.8, 2);
        cartService.clearCart("user1");

        List<CartEntry> cart = cartService.getCart("user1");
        assertTrue(cart.isEmpty());
    }
}

