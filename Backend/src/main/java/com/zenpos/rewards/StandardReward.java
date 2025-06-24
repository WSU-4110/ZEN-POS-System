package com.zenpos.rewards;

import com.zenpos.dto.OrderDto;

public class StandardReward implements RewardsPlan {
    @Override
    public int calculatePoints(OrderDto order) {
        return (int) Math.floor(order.getTotalAmount());
    }
}
