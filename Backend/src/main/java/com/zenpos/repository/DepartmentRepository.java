package com.zenpos.repository;

import com.zenpos.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

// backend/src/main/java/com/zenpos/repository/DepartmentRepository.java
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    boolean existsByName(String name);
}
