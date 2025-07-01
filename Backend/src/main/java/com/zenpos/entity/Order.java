package com.zenpos.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username") // ✅ fix here
    private String user;

    private float total;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderItem> items;

    public Order() {
        this.createdAt = LocalDateTime.now();
    }

    public Order(String user, float total, List<OrderItem> items) {
        this.user = user;
        this.total = total;
        this.items = items;
        this.createdAt = LocalDateTime.now();
        this.items.forEach(i -> i.setOrder(this));
    }

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Long getId() { return id; }

    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }

    public float getTotal() { return total; }
    public void setTotal(float total) { this.total = total; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
}
