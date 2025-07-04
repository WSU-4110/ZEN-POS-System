package com.zenpos.repository;

import com.zenpos.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByDepartmentId(Long departmentId);
}