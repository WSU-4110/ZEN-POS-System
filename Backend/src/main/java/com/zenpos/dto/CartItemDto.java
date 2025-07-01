package com.zenpos.dto;

public record CartItemDto(
        String name,
        double price,
        int quantity
) {}
