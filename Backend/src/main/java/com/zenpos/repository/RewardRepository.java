package com.zenpos.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.zenpos.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardRepository extends JpaRepository<Reward, Long> {
    Remapper findByPhoneNumber(String phoneNumber);
}