package com.zenpos.rewards;

import com.zenpos.dto.OrderDto;

public interface RewardsPlan {
    int calculatePoints(OrderDto order);
}
