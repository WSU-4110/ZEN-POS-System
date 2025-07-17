package com.zenpos.controller;

import com.zenpos.entity.Department;
import com.zenpos.entity.Item;
import com.zenpos.repository.DepartmentRepository;
import com.zenpos.repository.ItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final ItemRepository      itemRepo;
    private final DepartmentRepository deptRepo;

    public InventoryController(ItemRepository itemRepo,
                               DepartmentRepository deptRepo) {
        this.itemRepo = itemRepo;
        this.deptRepo = deptRepo;
    }

    @GetMapping
    public List<Item> all() {
        return itemRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<Item> create(@RequestBody Map<String,Object> p) {
        String name = (String) p.get("name");
        Integer qty  = (Integer) p.get("quantity");
        Long    did = ((Number)p.get("departmentId")).longValue();

        Department dept = deptRepo.findById(did).orElseThrow();
        Item newItem = new Item(name, 0.0, qty, dept); // price = 0 for now
        Item saved   = itemRepo.save(newItem);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> update(
            @PathVariable Long id,
            @RequestBody Map<String,Object> p
    ) {
        return itemRepo.findById(id).map(item -> {
            if (p.containsKey("name")) {
                item.setName((String)p.get("name"));
            }
            if (p.containsKey("quantity")) {
                item.setStock(((Number)p.get("quantity")).intValue());
            }
            if (p.containsKey("departmentId")) {
                Long did = ((Number)p.get("departmentId")).longValue();
                Department dept = deptRepo.findById(did).orElseThrow();
                item.setDepartment(dept);
            }
            Item saved = itemRepo.save(item);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!itemRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        itemRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
