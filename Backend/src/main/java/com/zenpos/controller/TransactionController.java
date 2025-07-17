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

    @PostMapping
    public Transaction saveTransaction(@RequestBody Transaction tx) {
        return repo.save(tx);
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return repo.findAll();
    }
}

