package com.zenpos.controller;

import com.zenpos.entity.Reward;
import com.zenpos.dto.OrderDto;
import com.zenpos.repository.RewardRepository;
import com.zenpos.rewards.PromotionalReward;
import com.zenpos.rewards.RewardContext;
import com.zenpos.rewards.StandardReward;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
@CrossOrigin(origins = "http://localhost:3000")
public class RewardsController {
    @Autowired
    private RewardRepository rewardRepo;

    @PostMapping
    public Reward enroll(@RequestBody Reward reward) {
        return rewardRepo.save(reward);
    }

    @GetMapping
    public List<Reward> list() {
        return rewardRepo.findAll();
    }

    @PostMapping("/calculate")
    public int calculate(@RequestBody OrderDto order) {
        boolean promo = order.promotional();
        RewardContext ctx = new RewardContext(
                promo
                        ? new PromotionalReward()
                        : new StandardReward()
        );
        return ctx.executeStrategy(order);
    }
}