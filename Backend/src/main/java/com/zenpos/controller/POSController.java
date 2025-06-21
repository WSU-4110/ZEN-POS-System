package com.zenpos.controller;

import com.zenpos.entity.Department;
import com.zenpos.entity.Item;
import com.zenpos.repository.DepartmentRepository;
import com.zenpos.repository.EmployeeRepository;
import com.zenpos.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class POSController {

    private final DepartmentRepository deptRepo;
    private final EmployeeRepository empRepo;
    private final ItemRepository itemRepo;

    @Autowired
    public POSController(DepartmentRepository deptRepo,
                         EmployeeRepository empRepo,
                         ItemRepository itemRepo) {
        this.deptRepo = deptRepo;
        this.empRepo = empRepo;
        this.itemRepo = itemRepo;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody Map<String,String> req) {
        return empRepo.findByUsername(req.get("username"))
                .filter(e -> e.getPasswordHash().equals(req.get("password")))
                .map(e -> Map.of("username", e.getUsername(), "role", e.getRole()))
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of("error", "Invalid credentials"))
                );
    }

    @GetMapping("/departments")
    public List<Department> getDepartments() {
        return deptRepo.findAll();
    }

    @GetMapping("/departments/{id}/items")
    public List<Item> getItems(@PathVariable Long id) {
        return itemRepo.findByDepartmentId(id);
    }
}
