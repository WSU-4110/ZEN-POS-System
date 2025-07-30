package com.zenpos.controller;

import com.zenpos.entity.Reward;
import com.zenpos.repository.RewardRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RewardsControllerTest {

    @Mock
    private RewardRepository rewardRepository;

    @InjectMocks
    private RewardsController rewardsController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testEnroll_NewReward() {
        Reward input = new Reward();
        input.setPhoneNumber("1234567890");

        when(rewardRepository.findByPhoneNumber("1234567890")).thenReturn(null);
        when(rewardRepository.save(any(Reward.class))).thenAnswer(i -> i.getArgument(0));

        ResponseEntity<Reward> response = rewardsController.enroll(input);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("1234567890", response.getBody().getPhoneNumber());
        assertEquals(0, response.getBody().getPoints());
        assertNotNull(response.getBody().getEnrolledAt());
    }

    @Test
    void testEnroll_ExistingReward() {
        Reward existing = new Reward();
        existing.setPhoneNumber("1234567890");
        existing.setPoints(10);

        when(rewardRepository.findByPhoneNumber("1234567890")).thenReturn(existing);

        Reward input = new Reward();
        input.setPhoneNumber("1234567890");

        ResponseEntity<Reward> response = rewardsController.enroll(input);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(existing, response.getBody());
    }

    @Test
    void testGetReward_Found() {
        Reward reward = new Reward();
        reward.setPhoneNumber("1111");

        when(rewardRepository.findByPhoneNumber("1111")).thenReturn(reward);

        ResponseEntity<Reward> response = rewardsController.getReward("1111");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(reward, response.getBody());
    }

    @Test
    void testApplyReward_WithEnoughPoints() {
        Reward reward = new Reward();
        reward.setPhoneNumber("2222");
        reward.setPoints(40); // 4 discounts

        when(rewardRepository.findByPhoneNumber("2222")).thenReturn(reward);

        Map<String, String> req = new HashMap<>();
        req.put("phoneNumber", "2222");

        ResponseEntity<Map<String, Object>> response = rewardsController.applyReward(req);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(40, response.getBody().get("pointsUsed"));
        assertEquals(4, response.getBody().get("discount"));
    }

    @Test
    void testAddPoints_Success() {
        Reward reward = new Reward();
        reward.setPhoneNumber("3333");
        reward.setPoints(10);

        when(rewardRepository.findByPhoneNumber("3333")).thenReturn(reward);

        Map<String, Object> req = new HashMap<>();
        req.put("phoneNumber", "3333");
        req.put("amount", 20);

        ResponseEntity<?> response = rewardsController.addPoints(req);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(30, response.getBody()); // 10 + 20
    }

    @Test
    void testRedeemPoints_Success() {
        Reward reward = new Reward();
        reward.setPhoneNumber("4444");
        reward.setPoints(50);

        when(rewardRepository.findByPhoneNumber("4444")).thenReturn(reward);

        Map<String, Object> req = new HashMap<>();
        req.put("phoneNumber", "4444");
        req.put("pointsUsed", 20);

        ResponseEntity<?> response = rewardsController.redeemPoints(req);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(30, response.getBody()); // 50 - 20
    }
}
