package com.zenpos.controller;

import com.zenpos.entity.Reward;
import com.zenpos.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "http://localhost:3000")
public class RewardsController {
    @Autowired private RewardRepository rewardRepo;

    @PostMapping
    public Reward enroll(@RequestBody Reward reward) {
        return rewardRepo.save(reward);
    }

    @GetMapping
    public List<Reward> list() {
        return rewardRepo.findAll();
    }
}