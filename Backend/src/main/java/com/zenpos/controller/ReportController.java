package com.zenpos.controller;

import com.zenpos.entity.Transaction;
import com.zenpos.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    @Autowired
    private TransactionRepository transactionRepo;

    @GetMapping("/daily")
    public Map<String, Object> getDailyReport() {
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.atTime(LocalTime.MAX);

        List<Transaction> todayTx = transactionRepo.findAll()
                .stream()
                .filter(t -> t.getTimestamp() != null && !t.getTimestamp().isBefore(start) && !t.getTimestamp().isAfter(end))
                .collect(Collectors.toList());

        int totalItems = todayTx.stream()
                .flatMap(t -> t.getItems().stream())
                .mapToInt(item -> item.getQuantity())
                .sum();

        double revenue = todayTx.stream()
                .mapToDouble(Transaction::getTotalAmount)
                .sum();

        Map<String, Integer> itemCount = new HashMap<>();
        todayTx.forEach(t -> t.getItems().forEach(item -> {
            String name = item.getItemName() != null ? item.getItemName() : "Unknown";
            itemCount.put(name, itemCount.getOrDefault(name, 0) + item.getQuantity());
        }));

        String mostSoldItem = itemCount.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("-");

        Map<String, Object> report = new HashMap<>();
        report.put("totalItems", totalItems);
        report.put("revenue", revenue);
        report.put("mostSoldItem", mostSoldItem);

        return report;
    }
}
