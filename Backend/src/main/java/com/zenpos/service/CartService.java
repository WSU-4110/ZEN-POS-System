package com.zenpos.service;

import com.zenpos.entity.CartEntry;
import com.zenpos.entity.Item;
import com.zenpos.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartService {
    private final ItemRepository itemRepo;
    private final Map<String, List<CartEntry>> carts = new HashMap<>();

    @Autowired
    public CartService(ItemRepository itemRepo) {
        this.itemRepo = itemRepo;
    }

    public List<CartEntry> getCart(String user) {
        return carts.getOrDefault(user, new ArrayList<>());
    }

    public void addItem(String user, Long itemId) {
        Item item = itemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        carts.computeIfAbsent(user, u -> new ArrayList<>())
                .add(new CartEntry(item.getName(), item.getPrice(), 1));
    }

    public void addCustom(String user, String name, Double price, int qty) {
        List<CartEntry> cart = carts.computeIfAbsent(user, u -> new ArrayList<>());
        for (int i = 0; i < qty; i++) {
            cart.add(new CartEntry(name, price, 1));
        }
    }

    public void removeItem(String user, int index) {
        List<CartEntry> cart = carts.get(user);
        if (cart != null && index >= 0 && index < cart.size()) {
            cart.remove(index);
        }
    }

    public void clearCart(String user) {
        carts.remove(user);
    }

}
