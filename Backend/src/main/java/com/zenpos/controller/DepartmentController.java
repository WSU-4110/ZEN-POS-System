package com.zenpos.controller;

import com.zenpos.entity.Department;
import com.zenpos.entity.Item;
import com.zenpos.repository.DepartmentRepository;
import com.zenpos.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

    @Autowired
    private DepartmentRepository deptRepo;

    @Autowired
    private ItemRepository itemRepo;

    @GetMapping
    public List<Department> getAllDepartments() {
        return deptRepo.findAll();
    }

    @GetMapping("/{id}/items")
    public List<Item> getItemsByDepartment(@PathVariable Long id) {
        return itemRepo.findByDepartmentId(id);
    }
}
