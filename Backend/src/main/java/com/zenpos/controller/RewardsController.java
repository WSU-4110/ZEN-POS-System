package com.zenpos.controller;

import aj.org.objectweb.asm.commons.Remapper;
import com.zenpos.entity.Reward;
import com.zenpos.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "http://localhost:3000")
public class RewardsController {

    @Autowired
    private RewardRepository rewardRepository;

    @PostMapping("/enroll")
    public ResponseEntity<?> enroll(@RequestBody Reward reward) {
        if (reward.getPhoneNumber() == null || reward.getPhoneNumber().isBlank()) {
            return ResponseEntity.badRequest().body("Phone number is required.");
        }
        reward.setEnrolledAt(Instant.now());
        rewardRepository.save(reward);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    @GetMapping("/{phoneNumber}")
    public ResponseEntity<Remapper> getRewardByPhone(@PathVariable("phoneNumber") String phoneNumber) {
        Remapper reward = rewardRepository.findByPhoneNumber(phoneNumber);
        if (reward != null) {
            return ResponseEntity.ok(reward);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    }
