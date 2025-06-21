// backend/src/main/java/com/zenpos/controller/CartController.java
package com.zenpos.controller;

import com.zenpos.dto.CartCustomRequest;
import com.zenpos.entity.CartEntry;
import com.zenpos.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")     // allow your React dev server
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    /** GET /api/cart?user={user} */
    @GetMapping
    public List<CartEntry> getCart(@RequestParam String user) {
        return cartService.getCart(user);
    }

    /** POST /api/cart/add?user={user}&itemId={itemId} */
    @PostMapping("/add")
    public ResponseEntity<Void> addItem(
            @RequestParam String user,
            @RequestParam Long itemId
    ) {
        cartService.addItem(user, itemId);
        return ResponseEntity.ok().build();
    }

    /** POST /api/cart/addCustom?user={user}
     *   body: { "name": "...", "price": 12.34, "quantity": 2 }
     */
    @PostMapping("/addCustom")
    public ResponseEntity<Void> addCustom(
            @RequestParam String user,
            @RequestBody CartCustomRequest req
    ) {
        cartService.addCustom(user, req.getName(), req.getPrice(), req.getQuantity());
        return ResponseEntity.ok().build();
    }

    /** DELETE /api/cart?user={user}&index={index} */
    @DeleteMapping
    public ResponseEntity<Void> removeItem(
            @RequestParam String user,
            @RequestParam int index
    ) {
        cartService.removeItem(user, index);
        return ResponseEntity.ok().build();
    }

    /** POST /api/cart/clear?user={user} */
    @PostMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestParam String user) {
        cartService.getCart(user).clear();
        return ResponseEntity.ok().build();
    }
}
