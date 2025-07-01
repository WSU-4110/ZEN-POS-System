package com.zenpos.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "rewards")
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @Column(name = "enrolled_at", nullable = false, updatable = false)
    private Instant enrolledAt = Instant.now();

    public Reward() {}

    public Reward(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public Instant getEnrolledAt() {
        return enrolledAt;
    }
    public void setEnrolledAt(Instant enrolledAt) {
        this.enrolledAt = enrolledAt;
    }
}
