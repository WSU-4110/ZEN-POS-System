package com.zenpos;

import com.zenpos.entity.Department;
import com.zenpos.entity.Employee;
import com.zenpos.entity.Item;
import com.zenpos.repository.DepartmentRepository;
import com.zenpos.repository.EmployeeRepository;
import com.zenpos.repository.ItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

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

        empRepo.findByUsername("admin").ifPresentOrElse(
                e -> System.out.println("Admin already exists."),
                () -> {
                    Employee admin = new Employee();
                    admin.setUsername("admin");
                    admin.setPasswordHash("password");
                    admin.setRole("MANAGER");
                    empRepo.save(admin);
                    System.out.println(" Admin created.");
                }
        );


        empRepo.findByUsername("cashier").ifPresentOrElse(
                e -> System.out.println("Cashier already exists."),
                () -> {
                    Employee cashier = new Employee();
                    cashier.setUsername("cashier");
                    cashier.setPasswordHash("password");
                    cashier.setRole("CASHIER");
                    empRepo.save(cashier);
                    System.out.println(" Cashier created.");
                }
        );


        if (deptRepo.count() == 0) {

            Department fruits = deptRepo.save(new Department("Fruits"));
            itemRepo.saveAll(List.of(
                    new Item("Apple", 0.99, 100, fruits),
                    new Item("Banana", 0.59, 100, fruits),
                    new Item("Orange", 0.79, 100, fruits),
                    new Item("Strawberry (pack)", 3.99, 50, fruits),
                    new Item("Grapes (lb)", 2.99, 75, fruits),
                    new Item("Mango", 1.25, 80, fruits),
                    new Item("Watermelon Slice", 2.50, 40, fruits),
                    new Item("Blueberries (pack)", 3.25, 50, fruits)
            ));

            Department vegetables = deptRepo.save(new Department("Vegetables"));
            itemRepo.saveAll(List.of(
                    new Item("Carrot", 0.39, 100, vegetables),
                    new Item("Broccoli (head)", 1.75, 50, vegetables),
                    new Item("Spinach (bag)", 2.50, 60, vegetables),
                    new Item("Cucumber", 0.89, 80, vegetables),
                    new Item("Tomato", 0.99, 90, vegetables),
                    new Item("Lettuce", 1.29, 60, vegetables),
                    new Item("Onion", 0.69, 120, vegetables),
                    new Item("Bell Pepper", 1.10, 70, vegetables)
            ));

            Department dairy = deptRepo.save(new Department("Dairy"));
            itemRepo.saveAll(List.of(
                    new Item("Milk (1 gal)", 2.99, 60, dairy),
                    new Item("Cheese (block)", 4.50, 40, dairy),
                    new Item("Yogurt (cup)", 1.25, 90, dairy),
                    new Item("Butter", 3.99, 50, dairy),
                    new Item("Sour Cream", 2.25, 40, dairy),
                    new Item("Cream Cheese", 2.50, 40, dairy),
                    new Item("Cottage Cheese", 2.89, 35, dairy),
                    new Item("Eggs (dozen)", 3.49, 70, dairy)
            ));

            Department meat = deptRepo.save(new Department("Meat & Seafood"));
            itemRepo.saveAll(List.of(
                    new Item("Chicken Breast", 6.99, 50, meat),
                    new Item("Ground Beef", 5.50, 50, meat),
                    new Item("Salmon Fillet", 9.99, 30, meat),
                    new Item("Bacon (pack)", 4.75, 40, meat),
                    new Item("Shrimp (lb)", 8.49, 35, meat),
                    new Item("Turkey Slices", 4.25, 40, meat),
                    new Item("Pork Chops", 6.75, 45, meat),
                    new Item("Tilapia Fillet", 5.99, 30, meat)
            ));

            Department bakery = deptRepo.save(new Department("Bakery"));
            itemRepo.saveAll(List.of(
                    new Item("Bread", 1.99, 100, bakery),
                    new Item("Croissant", 2.49, 60, bakery),
                    new Item("Muffin", 1.75, 70, bakery),
                    new Item("Bagel", 1.25, 60, bakery),
                    new Item("Donut", 1.10, 80, bakery),
                    new Item("Baguette", 2.00, 50, bakery),
                    new Item("Dinner Roll (6 pack)", 3.25, 40, bakery),
                    new Item("Pound Cake Slice", 2.50, 40, bakery)
            ));

            Department household = deptRepo.save(new Department("Household"));
            itemRepo.saveAll(List.of(
                    new Item("Dish Soap", 3.25, 50, household),
                    new Item("Paper Towels", 4.99, 40, household),
                    new Item("Trash Bags (15 ct)", 5.49, 30, household),
                    new Item("Toilet Paper (4 roll)", 4.50, 30, household),
                    new Item("Laundry Detergent", 7.99, 20, household),
                    new Item("Air Freshener", 2.75, 40, household),
                    new Item("Sponges (pack)", 3.10, 50, household),
                    new Item("Cleaning Spray", 4.25, 40, household)
            ));

            Department pantry = deptRepo.save(new Department("Pantry"));
            itemRepo.saveAll(List.of(
                    new Item("Pasta", 1.89, 80, pantry),
                    new Item("Rice", 2.25, 70, pantry),
                    new Item("Canned Beans", 1.50, 100, pantry),
                    new Item("Peanut Butter", 3.49, 60, pantry),
                    new Item("Jelly", 2.99, 60, pantry),
                    new Item("Cereal", 4.25, 50, pantry),
                    new Item("Flour", 2.00, 80, pantry),
                    new Item("Sugar", 2.10, 90, pantry)
            ));

            Department beverages = deptRepo.save(new Department("Beverages"));
            itemRepo.saveAll(List.of(
                    new Item("Water Bottle", 0.99, 100, beverages),
                    new Item("Soda", 1.25, 80, beverages),
                    new Item("Orange Juice", 3.49, 60, beverages),
                    new Item("Iced Tea", 1.75, 70, beverages),
                    new Item("Sports Drink", 2.00, 60, beverages),
                    new Item("Coffee (bottle)", 2.50, 60, beverages),
                    new Item("Sparkling Water", 1.35, 60, beverages),
                    new Item("Milkshake", 3.25, 50, beverages)
            ));

            Department restaurant = deptRepo.save(new Department("Restaurant"));
            itemRepo.saveAll(List.of(
                    new Item("Burger", 5.99, 100, restaurant),
                    new Item("Fries", 2.49, 100, restaurant),
                    new Item("Chicken Sandwich", 6.75, 100, restaurant),
                    new Item("Hot Dog", 3.25, 100, restaurant),
                    new Item("Slice of Pizza", 2.75, 100, restaurant),
                    new Item("Chicken Tenders", 4.50, 100, restaurant)
            ));

            System.out.println("departments and items seeded successfully.");
        } else {
            System.out.println("ℹDepartments already exist. Skipping seed.");
        }
    }
}
