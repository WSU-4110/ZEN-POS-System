package com.zenpos.service;

import com.zenpos.entity.CartEntry;
import com.zenpos.entity.Order;
import com.zenpos.entity.OrderItem;
import com.zenpos.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder(String user, List<CartEntry> cart) {
        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> items = cart.stream().map(c -> {
            OrderItem item = new OrderItem();
            item.setName(c.getName());
            item.setPrice(c.getPrice());
            item.setQuantity(c.getQuantity());
            item.setOrder(order); // ✅ set reference to parent
            return item;
        }).toList();

        double total = cart.stream().mapToDouble(c -> c.getPrice() * c.getQuantity()).sum();
        order.setTotal((float) total);
        order.setItems(items);

        return orderRepository.save(order);
    }
}
