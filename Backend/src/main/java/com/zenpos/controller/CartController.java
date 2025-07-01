package com.zenpos.controller;

import com.zenpos.dto.CartCustomRequest;
import com.zenpos.entity.CartEntry;
import com.zenpos.entity.Item;
import com.zenpos.repository.ItemRepository;
import com.zenpos.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;
    private final ItemRepository itemRepository;

    @Autowired
    public CartController(CartService cartService, ItemRepository itemRepository) {
        this.cartService = cartService;
        this.itemRepository = itemRepository;
    }

    @GetMapping
    public List<CartEntry> getCart(@RequestParam String user) {
        return cartService.getCart(user);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItem(
            @RequestParam String user,
            @RequestParam Long itemId,
            @RequestParam(defaultValue = "1") int quantity
    ) {
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        if (optionalItem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
        }

        Item item = optionalItem.get();
        if (item.getStock() < quantity) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Only " + item.getStock() + " units left of " + item.getName());
        }

        item.setStock(item.getStock() - quantity);
        itemRepository.save(item);

        cartService.addCustom(user, item.getName(), item.getPrice(), quantity);
        return ResponseEntity.ok("Item added with quantity " + quantity);
    }

    @PostMapping("/addCustom")
    public ResponseEntity<Void> addCustom(
            @RequestParam String user,
            @RequestBody CartCustomRequest req
    ) {
        cartService.addCustom(user, req.getName(), req.getPrice(), req.getQuantity());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> removeItem(
            @RequestParam String user,
            @RequestParam int index
    ) {
        cartService.removeItem(user, index);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestParam String user) {
        cartService.getCart(user).clear();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody List<CheckoutItem> items) {
        for (CheckoutItem item : items) {
            Item dbItem = itemRepository.findById(item.getItemId()).orElse(null);
            if (dbItem == null) continue;

            if (dbItem.getStock() < item.getQuantity()) {
                return ResponseEntity.badRequest().body("Not enough stock for item: " + dbItem.getName());
            }

            dbItem.setStock(dbItem.getStock() - item.getQuantity());
            itemRepository.save(dbItem);
        }

        return ResponseEntity.ok().build();
    }

    public static class CheckoutItem {
        private Long itemId;
        private int quantity;

        public Long getItemId() { return itemId; }
        public void setItemId(Long itemId) { this.itemId = itemId; }

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }
}
