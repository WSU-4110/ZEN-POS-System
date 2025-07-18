package com.zenpos.controller;

import com.zenpos.entity.Department;
import com.zenpos.entity.Item;
import com.zenpos.repository.DepartmentRepository;
import com.zenpos.repository.ItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private final DepartmentRepository repo;
    private final ItemRepository itemRepo;

    public DepartmentController(DepartmentRepository repo, ItemRepository itemRepo) {
        this.repo = repo;
        this.itemRepo = itemRepo;
    }

    @GetMapping
    public List<Department> list() {
        return repo.findAll();
    }

    @GetMapping("/{id}/items")
    public List<Item> getItemsByDepartment(@PathVariable Long id) {
        return itemRepo.findByDepartmentId(id);
    }
}
