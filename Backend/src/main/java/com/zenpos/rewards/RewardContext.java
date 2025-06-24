package com.zenpos.rewards;

import com.zenpos.dto.OrderDto;

public class RewardContext {
    private final RewardsPlan plan;

    public RewardContext(RewardsPlan plan) {
        this.plan = plan;
    }

    public int executeStrategy(OrderDto order) {
        return plan.calculatePoints(order);
    }
}
