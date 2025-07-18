package com.zenpos.controller;

import com.zenpos.dto.TransactionDto;
import com.zenpos.service.TransactionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @PostMapping
    public TransactionDto saveTransaction(@RequestBody TransactionDto dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<TransactionDto> getAllTransactions() {
        return service.list();
    }
}
