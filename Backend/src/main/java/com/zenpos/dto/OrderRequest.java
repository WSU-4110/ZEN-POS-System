package com.zenpos.dto;

import com.zenpos.entity.OrderItem;
import java.util.List;

public class OrderRequest {
    private String user;
    private String phoneNumber;
    private List<OrderItem> items;

    public OrderRequest() {}

    public OrderRequest(String user, String phoneNumber, List<OrderItem> items) {
        this.user = user;
        this.phoneNumber = phoneNumber;
        this.items = items;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}
