package com.zenpos.controller;

import com.zenpos.entity.Employee;
import com.zenpos.repository.EmployeeRepository;
import com.zenpos.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class POSController {

    private final EmployeeRepository empRepo;
    private final ItemRepository itemRepository;

    @Autowired
    public POSController(EmployeeRepository empRepo, ItemRepository itemRepository) {
        this.empRepo = empRepo;
        this.itemRepository = itemRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Employee> employeeOpt = empRepo.findByUsername(request.getUsername());
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            if (employee.getPasswordHash().equals(request.getPassword())) {
                return ResponseEntity.ok(employee); // returns full employee with role
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }
        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }

}
