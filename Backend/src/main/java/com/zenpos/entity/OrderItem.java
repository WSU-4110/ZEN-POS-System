package com.zenpos.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "order_item")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private float price;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;


    public OrderItem() {}

    public OrderItem(String name, int quantity, float price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = (float) price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
