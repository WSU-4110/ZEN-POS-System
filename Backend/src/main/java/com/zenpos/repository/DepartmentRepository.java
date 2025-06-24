package com.zenpos.repository;

import com.zenpos.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DepartmentRepository extends JpaRepository<Department, Long> {
    boolean existsByName(String name);
}
