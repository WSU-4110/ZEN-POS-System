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
    @Autowired private EmployeeRepository employeeRepo;

    @PostMapping("/pin-login")
    public ResponseEntity<?> pinLogin(@RequestBody Map<String,String> body) {
        String pin = body.get("pin");
        return employeeRepo.findByPasswordHash(pin)
                .map(user -> ResponseEntity.ok(Map.of(
                        "status","success",
                        "username", user.getUsername(),
                        "role",     user.getRole()
                )))
                .orElseGet(() -> ResponseEntity
                        .status(401)
                        .body(Map.of("status","error","error","Invalid PIN"))
                );
    }
}

