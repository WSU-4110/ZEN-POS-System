package com.zenpos.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double totalAmount;
    private String employee;
    private String status;
    private String paymentMethod;
    private LocalDateTime timestamp = LocalDateTime.now();
    private boolean promotional;
    private String phoneNumber;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private int discount = 0;


    @OneToMany(mappedBy = "transaction", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TransactionItem> items;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public String getEmployee() { return employee; }
    public void setEmployee(String employee) { this.employee = employee; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public boolean isPromotional() { return promotional; }
    public void setPromotional(boolean promotional) { this.promotional = promotional; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public List<TransactionItem> getItems() { return items; }
    public void setItems(List<TransactionItem> items) { this.items = items; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public int getDiscount() { return discount; }
    public void setDiscount(int discount) { this.discount = discount; }
}
