package com.zenpos.controller;

import com.zenpos.entity.*;
import com.zenpos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "http://localhost:3000")
public class ManagerController {
    @Autowired private EmployeeRepository empRepo;

    @GetMapping("/employees")
    public List<Employee> getAll() {
        return empRepo.findAll();
    }

    @PostMapping("/employees")
    public Employee create(@RequestBody Employee e) {
        return empRepo.save(e);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> update(
            @PathVariable Long id,
            @RequestBody Employee data
    ) {
        return empRepo.findById(id)
                .map(e -> {
                    e.setUsername(data.getUsername());
                    e.setRole(data.getRole());
                    e.setPasswordHash(data.getPasswordHash());
                    return ResponseEntity.ok(empRepo.save(e));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!empRepo.existsById(id)) return ResponseEntity.notFound().build();
        empRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
