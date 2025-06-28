package com.zenpos.controller;

import com.zenpos.entity.Employee;
import com.zenpos.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private EmployeeRepository employeeRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<Employee> userOpt = employeeRepo.findByUsername(username);
        if (userOpt.isPresent()) {
            Employee user = userOpt.get();
            if (user.getPasswordHash().equals(password) && "MANAGER".equalsIgnoreCase(user.getRole())) {
                return ResponseEntity.ok(Map.of("status", "success", "username", user.getUsername()));
            }
        }

        return ResponseEntity.status(401).body(Map.of("status", "error", "error", "Invalid credentials"));
    }
}
