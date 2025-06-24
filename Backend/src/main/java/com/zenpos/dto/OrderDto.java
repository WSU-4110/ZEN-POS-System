package com.zenpos.dto;

import java.util.List;

public record OrderDto(
        List<CartItemDto> items,
        double total,
        boolean promotional
) {
    public double getTotalAmount() {
        return 0;
    }
}
