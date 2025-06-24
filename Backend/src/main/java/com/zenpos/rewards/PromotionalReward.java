package com.zenpos.rewards;

import com.zenpos.dto.OrderDto;

public class PromotionalReward implements RewardsPlan {
    @Override
    public int calculatePoints(OrderDto order) {
        int base = (int) Math.floor(order.total());
        return base * 2;
    }
}
