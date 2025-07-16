package com.zenpos.dto;

import java.time.LocalDateTime;
import java.util.List;

public class TransactionDto {
    public Long id;
    public double totalAmount;
    public String employee;
    public String status;
    public String paymentMethod;
    public LocalDateTime timestamp;
    public List<TransactionItemDto> items;
}
