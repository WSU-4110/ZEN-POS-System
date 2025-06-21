package com.zenpos;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.zenpos.entity.Department;
import com.zenpos.entity.Item;
import com.zenpos.entity.Employee;
import com.zenpos.repository.DepartmentRepository;
import com.zenpos.repository.EmployeeRepository;
import com.zenpos.repository.ItemRepository;

@Component
public class DataLoader implements CommandLineRunner {
    private final EmployeeRepository empRepo;
    private final DepartmentRepository deptRepo;
    private final ItemRepository itemRepo;

    public DataLoader(EmployeeRepository empRepo,
                      DepartmentRepository deptRepo,
                      ItemRepository itemRepo) {
        this.empRepo = empRepo;
        this.deptRepo = deptRepo;
        this.itemRepo = itemRepo;
    }

    @Override
    public void run(String... args) {
        if (empRepo.count() == 0) {
            Employee admin = new Employee();
            admin.setUsername("admin");
            admin.setPasswordHash("password");
            admin.setRole("MANAGER");
            empRepo.save(admin);

            Employee cashier = new Employee();
            cashier.setUsername("cashier");
            cashier.setPasswordHash("password");
            cashier.setRole("CASHIER");
            empRepo.save(cashier);
        }

        if (deptRepo.count() == 0) {
            Department produce = new Department();
            produce.setName("Produce");
            deptRepo.save(produce);

            Department dairy = new Department();
            dairy.setName("Dairy");
            deptRepo.save(dairy);

            itemRepo.save(new Item("Apple", 0.99, 100, produce));
            itemRepo.save(new Item("Milk",  1.49,  50, dairy));
        }

        // only insert Restaurant if it doesn't exist yet
        if (!deptRepo.existsByName("Restaurant")) {
            Department restaurant = new Department();
            restaurant.setName("Restaurant");
            deptRepo.save(restaurant);

            // seed a default burger item so /cart/add can use a real itemId
            itemRepo.save(new Item("Custom Burger", 9.99, 100, restaurant));
        }
    }
}
