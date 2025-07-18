package com.zenpos.controller;

import com.zenpos.entity.Reward;
import com.zenpos.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "http://localhost:3000")
public class RewardsController {

    @Autowired
    private RewardRepository rewardRepository;

    @PostMapping("/enroll")
    public ResponseEntity<Reward> enroll(@RequestBody Reward reward) {
        if (reward.getPhoneNumber() == null || reward.getPhoneNumber().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        Reward existing = rewardRepository.findByPhoneNumber(reward.getPhoneNumber());
        if (existing != null) return ResponseEntity.ok(existing);
        reward.setEnrolledAt(Instant.now());
        reward.setPoints(0);
        return ResponseEntity.ok(rewardRepository.save(reward));
    }

    @GetMapping("/{phoneNumber}")
    public ResponseEntity<Reward> getReward(@PathVariable String phoneNumber) {
        Reward reward = rewardRepository.findByPhoneNumber(phoneNumber);
        if (reward == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(reward);
    }

    @PostMapping("/apply")
    public ResponseEntity<Map<String, Object>> applyReward(@RequestBody Map<String, String> req) {
        String phone = req.get("phoneNumber");
        Reward reward = rewardRepository.findByPhoneNumber(phone);
        int discount = 0;
        int pointsUsed = 0;
        if (reward != null && reward.getPoints() >= 10) {
            pointsUsed = (reward.getPoints() / 10) * 10;
            discount = pointsUsed / 10;
        }
        Map<String, Object> result = new HashMap<>();
        result.put("discount", discount);
        result.put("pointsUsed", pointsUsed);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/addPoints")
    public ResponseEntity<?> addPoints(@RequestBody Map<String, Object> req) {
        String phone = (String) req.get("phoneNumber");
        int amount = (int) req.get("amount");
        Reward reward = rewardRepository.findByPhoneNumber(phone);
        if (reward == null) return ResponseEntity.badRequest().body("Not found");
        reward.setPoints(reward.getPoints() + amount);
        rewardRepository.save(reward);
        return ResponseEntity.ok(reward.getPoints());
    }

    @PostMapping("/redeem")
    public ResponseEntity<?> redeemPoints(@RequestBody Map<String, Object> req) {
        String phone = (String) req.get("phoneNumber");
        int pointsUsed = (int) req.get("pointsUsed");
        Reward reward = rewardRepository.findByPhoneNumber(phone);
        if (reward == null) return ResponseEntity.badRequest().body("Not found");
        reward.setPoints(reward.getPoints() - pointsUsed);
        rewardRepository.save(reward);
        return ResponseEntity.ok(reward.getPoints());
    }
}
