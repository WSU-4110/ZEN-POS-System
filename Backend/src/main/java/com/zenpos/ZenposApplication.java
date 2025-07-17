package com.zenpos;

import com.zenpos.entity.InventoryItem;
import com.zenpos.repository.InventoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ZenposApplication {
    public static void main(String[] args) {
        SpringApplication.run(ZenposApplication.class, args);
    }

    @Bean
    public CommandLineRunner seedInventory(InventoryRepository invRepo) {
        return args -> {
            if (invRepo.count() == 0) {
                invRepo.save(new InventoryItem("Espresso Machine", "Equipment", 5));
                invRepo.save(new InventoryItem("Coffee Beans (1kg)", "Consumables", 12));
                invRepo.save(new InventoryItem("Paper Cups (100pk)", "Packaging", 3));
            }
        };
    }
}