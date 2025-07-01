package com.zenpos.controller;

import com.zenpos.dto.OrderRequest;
import com.zenpos.entity.Order;
import com.zenpos.entity.OrderItem;
import com.zenpos.repository.OrderRepository;
import com.zenpos.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest request) {
        if (request.getPhoneNumber() == null || request.getPhoneNumber().isBlank()) {
            return ResponseEntity.badRequest().body("Phone number is required");
        }

        if (request.getItems() == null || request.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("Order must contain items");
        }

        Order order = new Order();
        order.setUser(request.getUser());
        order.setPhoneNumber(request.getPhoneNumber());
        order.setItems(request.getItems());

        double total = request.getItems().stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();
        order.setTotal((float) total);

        for (OrderItem item : request.getItems()) {
            item.setOrder(order);
        }

        Order saved = orderRepository.save(order);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/latest")
    public ResponseEntity<Order> getLatestOrder(@RequestParam String phone) {
        List<Order> all = orderRepository.findByPhoneNumber(phone);
        if (all.isEmpty()) return ResponseEntity.notFound().build();

        Order latest = all.stream()
                .max(Comparator.comparing(Order::getCreatedAt))
                .orElse(null);

        return ResponseEntity.ok(latest);
    }
    }
