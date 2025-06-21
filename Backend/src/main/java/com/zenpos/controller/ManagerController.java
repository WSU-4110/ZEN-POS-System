package com.zenpos.controller;

import com.zenpos.entity.*;
import com.zenpos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "http://localhost:3000")
public class ManagerController {
    @Autowired private EmployeeRepository empRepo;
    @Autowired private DepartmentRepository deptRepo;

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return empRepo.findAll();
    }

    @PostMapping("/departments")
    public Department addDepartment(@RequestBody Department dept) {
        return deptRepo.save(dept);
    }
}