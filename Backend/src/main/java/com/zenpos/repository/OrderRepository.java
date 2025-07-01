package com.zenpos.repository;

import com.zenpos.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findTopByPhoneNumberOrderByCreatedAtDesc(String phoneNumber);
    List<Order> findByPhoneNumber(String phone);
}
