package com.zenpos.service;

import com.zenpos.dto.TransactionDto;
import com.zenpos.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    private final TransactionRepository repo;
    private final TransactionMapper map;

    public TransactionService(TransactionRepository r, TransactionMapper m){
        this.repo = r;
        this.map  = m;
    }

    @Transactional
    public TransactionDto create(TransactionDto d){
        return map.toDto(repo.save(map.toEntity(d)));
    }

    public List<TransactionDto> list(){
        return repo.findAll().stream().map(map::toDto).collect(Collectors.toList());
    }
}
