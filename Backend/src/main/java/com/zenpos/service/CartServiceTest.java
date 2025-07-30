package com.zenpos.service;

import com.zenpos.entity.CartEntry;
import com.zenpos.entity.Item;
import com.zenpos.repository.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CartServiceTest {

    private CartService cartService;
    private ItemRepository itemRepo;

    @BeforeEach
    void setUp() {
        itemRepo = mock(ItemRepository.class);
        cartService = new CartService(itemRepo);
    }

    @Test
    void testGetCartReturnsEmptyForNewUser() {
        assertTrue(cartService.getCart("newUser").isEmpty());
    }

    @Test
    void testAddItemSuccessfullyAddsToCart() {
        Item mockItem = new Item(1L, "Burger", 5.99);
        when(itemRepo.findById(1L)).thenReturn(Optional.of(mockItem));

        cartService.addItem("user1", 1L);
        assertEquals(1, cartService.getCart("user1").size());
    }

    @Test
    void testAddItemThrowsWhenItemNotFound() {
        when(itemRepo.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> cartService.addItem("user1", 99L));
    }

    @Test
    void testAddCustomAddsMultipleItems() {
        cartService.addCustom("user2", "Fries", 2.99, 3);
        assertEquals(3, cartService.getCart("user2").size());
    }

    @Test
    void testRemoveItemRemovesCorrectEntry() {
        cartService.addCustom("user3", "Soda", 1.50, 2);
        cartService.removeItem("user3", 0);
        assertEquals(1, cartService.getCart("user3").size());
    }

    @Test
    void testClearCartRemovesAllItems() {
        cartService.addCustom("user4", "Pizza", 8.99, 2);
        cartService.clearCart("user4");
        assertTrue(cartService.getCart("user4").isEmpty());
    }
}
