package com.zenpos.controller;

import com.zenpos.dto.AdminLoginRequest;
import com.zenpos.entity.Employee;
import com.zenpos.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private EmployeeRepository employeeRepo;
}