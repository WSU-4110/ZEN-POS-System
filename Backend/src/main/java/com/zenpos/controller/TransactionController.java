// src/main/java/com/zenpos/controller/TransactionController.java
package com.zenpos.controller;

import com.zenpos.entity.Transaction;
import com.zenpos.repository.TransactionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    private final TransactionRepository repo;

    public TransactionController(TransactionRepository repo) {
        this.repo = repo;
    }

    // Save a new transaction (with items & promotional flag)
    @PostMapping
    public Transaction saveTransaction(@RequestBody Transaction tx) {
        // cascade will save TransactionItem list as well
        return repo.save(tx);
    }

    // Retrieve all transactions
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return repo.findAll();
    }
}

