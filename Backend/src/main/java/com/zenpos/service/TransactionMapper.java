package com.zenpos.service;

import com.zenpos.dto.*;
import com.zenpos.entity.*;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Component
public class TransactionMapper {
    public Transaction toEntity(TransactionDto d) {
        Transaction tx = new Transaction();
        tx.setTotalAmount(d.totalAmount);
        tx.setEmployee(d.employee);
        tx.setStatus(d.status);
        tx.setPaymentMethod(d.paymentMethod);
        tx.setTimestamp(d.timestamp != null ? d.timestamp : LocalDateTime.now());
        tx.setItems(d.items.stream().map(i -> {
            TransactionItem ti = new TransactionItem();
            ti.setItemName(i.itemName);
            ti.setQuantity(i.quantity);
            ti.setPrice(i.price);
            ti.setTransaction(tx);
            return ti;
        }).collect(Collectors.toList()));
        return tx;
    }

    public TransactionDto toDto(Transaction tx) {
        TransactionDto d = new TransactionDto();
        d.id            = tx.getId();
        d.totalAmount   = tx.getTotalAmount();
        d.employee      = tx.getEmployee();
        d.status        = tx.getStatus();
        d.paymentMethod = tx.getPaymentMethod();
        d.timestamp     = tx.getTimestamp();
        d.items         = tx.getItems().stream().map(i -> {
            TransactionItemDto ti = new TransactionItemDto();
            ti.itemName = i.getItemName();
            ti.quantity = i.getQuantity();
            ti.price    = i.getPrice();
            return ti;
        }).collect(Collectors.toList());
        return d;
    }
}
