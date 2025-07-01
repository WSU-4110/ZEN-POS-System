package com.zenpos.repository;

import com.zenpos.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByDepartmentId(Long departmentId);

    Optional<Object> findByName(String name);
}