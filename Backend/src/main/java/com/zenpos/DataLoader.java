package com.zenpos;

import com.zenpos.entity.Department;
import com.zenpos.entity.Employee;
import com.zenpos.entity.Item;
import com.zenpos.repository.DepartmentRepository;
import com.zenpos.repository.EmployeeRepository;
import com.zenpos.repository.ItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DataLoader implements CommandLineRunner {

    private final EmployeeRepository empRepo;
    private final DepartmentRepository deptRepo;
    private final ItemRepository itemRepo;

    public DataLoader(EmployeeRepository empRepo, DepartmentRepository deptRepo, ItemRepository itemRepo) {
        this.empRepo = empRepo;
        this.deptRepo = deptRepo;
        this.itemRepo = itemRepo;
    }

    @Override
    public void run(String... args) {
        seedEmployees();
        Map<String, Department> departments = seedDepartments();
        seedItems(departments);
    }

    private void seedEmployees() {
        empRepo.findByUsername("admin").ifPresentOrElse(
                e -> {
                    e.setPasswordHash("1111");
                    e.setRole("MANAGER");
                    empRepo.save(e);
                },
                () -> empRepo.save(new Employee("admin","1111","MANAGER"))
        );

        empRepo.findByUsername("cashier").ifPresentOrElse(
                e -> {
                    e.setPasswordHash("2222");
                    e.setRole("CASHIER");
                    empRepo.save(e);
                },
                () -> empRepo.save(new Employee("cashier","2222","CASHIER"))
        );
    }


    private Map<String, Department> seedDepartments() {
        List<String> names = List.of(
                "Fruits", "Vegetables", "Dairy", "Meat & Seafood", "Bakery",
                "Household", "Pantry", "Beverages", "Restaurant"
        );

        Map<String, Department> map = new HashMap<>();
        for (String name : names) {
            Department dept = deptRepo.findByName(name).orElseGet(() -> {
                System.out.println("Seeding department: " + name);
                return deptRepo.save(new Department(name));
            });
            map.put(name, dept);
        }
        return map;
    }

    private void seedItems(Map<String, Department> dept) {

        seed("Apple", 0.99, 100, dept.get("Fruits"));
        seed("Banana", 0.59, 100, dept.get("Fruits"));
        seed("Orange", 0.79, 100, dept.get("Fruits"));
        seed("Strawberry (pack)", 3.99, 50, dept.get("Fruits"));
        seed("Grapes (lb)", 2.99, 75, dept.get("Fruits"));
        seed("Mango", 1.25, 80, dept.get("Fruits"));
        seed("Watermelon Slice", 2.50, 40, dept.get("Fruits"));
        seed("Blueberries (pack)", 3.25, 50, dept.get("Fruits"));


        seed("Carrot", 0.39, 100, dept.get("Vegetables"));
        seed("Broccoli (head)", 1.75, 50, dept.get("Vegetables"));
        seed("Spinach (bag)", 2.50, 60, dept.get("Vegetables"));
        seed("Cucumber", 0.89, 80, dept.get("Vegetables"));
        seed("Tomato", 0.99, 90, dept.get("Vegetables"));
        seed("Lettuce", 1.29, 60, dept.get("Vegetables"));
        seed("Onion", 0.69, 120, dept.get("Vegetables"));
        seed("Bell Pepper", 1.10, 70, dept.get("Vegetables"));


        seed("Milk (1 gal)", 2.99, 60, dept.get("Dairy"));
        seed("Cheese (block)", 4.50, 40, dept.get("Dairy"));
        seed("Yogurt (cup)", 1.25, 90, dept.get("Dairy"));
        seed("Butter", 3.99, 50, dept.get("Dairy"));
        seed("Sour Cream", 2.25, 40, dept.get("Dairy"));
        seed("Cream Cheese", 2.50, 40, dept.get("Dairy"));
        seed("Cottage Cheese", 2.89, 35, dept.get("Dairy"));
        seed("Eggs (dozen)", 3.49, 70, dept.get("Dairy"));


        seed("Chicken Breast", 6.99, 50, dept.get("Meat & Seafood"));
        seed("Ground Beef", 5.50, 50, dept.get("Meat & Seafood"));
        seed("Salmon Fillet", 9.99, 30, dept.get("Meat & Seafood"));
        seed("Bacon (pack)", 4.75, 40, dept.get("Meat & Seafood"));
        seed("Shrimp (lb)", 8.49, 35, dept.get("Meat & Seafood"));
        seed("Turkey Slices", 4.25, 40, dept.get("Meat & Seafood"));
        seed("Pork Chops", 6.75, 45, dept.get("Meat & Seafood"));
        seed("Tilapia Fillet", 5.99, 30, dept.get("Meat & Seafood"));


        seed("Bread", 1.99, 100, dept.get("Bakery"));
        seed("Croissant", 2.49, 60, dept.get("Bakery"));
        seed("Muffin", 1.75, 70, dept.get("Bakery"));
        seed("Bagel", 1.25, 60, dept.get("Bakery"));
        seed("Donut", 1.10, 80, dept.get("Bakery"));
        seed("Baguette", 2.00, 50, dept.get("Bakery"));
        seed("Dinner Roll (6 pack)", 3.25, 40, dept.get("Bakery"));
        seed("Pound Cake Slice", 2.50, 40, dept.get("Bakery"));


        seed("Dish Soap", 3.25, 50, dept.get("Household"));
        seed("Paper Towels", 4.99, 40, dept.get("Household"));
        seed("Trash Bags (15 ct)", 5.49, 30, dept.get("Household"));
        seed("Toilet Paper (4 roll)", 4.50, 30, dept.get("Household"));
        seed("Laundry Detergent", 7.99, 20, dept.get("Household"));
        seed("Air Freshener", 2.75, 40, dept.get("Household"));
        seed("Sponges (pack)", 3.10, 50, dept.get("Household"));
        seed("Cleaning Spray", 4.25, 40, dept.get("Household"));


        seed("Pasta", 1.89, 80, dept.get("Pantry"));
        seed("Rice", 2.25, 70, dept.get("Pantry"));
        seed("Canned Beans", 1.50, 100, dept.get("Pantry"));
        seed("Peanut Butter", 3.49, 60, dept.get("Pantry"));
        seed("Jelly", 2.99, 60, dept.get("Pantry"));
        seed("Cereal", 4.25, 50, dept.get("Pantry"));
        seed("Flour", 2.00, 80, dept.get("Pantry"));
        seed("Sugar", 2.10, 90, dept.get("Pantry"));


        seed("Water Bottle", 0.99, 100, dept.get("Beverages"));
        seed("Soda", 1.25, 80, dept.get("Beverages"));
        seed("Orange Juice", 3.49, 60, dept.get("Beverages"));
        seed("Iced Tea", 1.75, 70, dept.get("Beverages"));
        seed("Sports Drink", 2.00, 60, dept.get("Beverages"));
        seed("Coffee (bottle)", 2.50, 60, dept.get("Beverages"));
        seed("Sparkling Water", 1.35, 60, dept.get("Beverages"));
        seed("Milkshake", 3.25, 50, dept.get("Beverages"));


        seed("Burger", 5.99, 100, dept.get("Restaurant"));
        seed("Fries", 2.49, 100, dept.get("Restaurant"));
        seed("Chicken Sandwich", 6.75, 100, dept.get("Restaurant"));
        seed("Hot Dog", 3.25, 100, dept.get("Restaurant"));
        seed("Slice of Pizza", 2.75, 100, dept.get("Restaurant"));
        seed("Chicken Tenders", 4.50, 100, dept.get("Restaurant"));
    }

    private void seed(String name, double price, int stock, Department dept) {
        itemRepo.findByName(name).ifPresentOrElse(
                i -> {}, // already exists
                () -> {
                    itemRepo.save(new Item(name, price, stock, dept));
                    System.out.println("Seeded item: " + name);
                }
        );
    }
}
