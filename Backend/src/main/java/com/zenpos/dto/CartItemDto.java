// src/main/java/com/zenpos/dto/CartItemDto.java
package com.zenpos.dto;

public record CartItemDto(
        String name,
        double price,
        int quantity
) {}
