package com.example.dashboard.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "regulars")
public class Regular {
    @Id
    @Column(name = "regular_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User userEntity;

    public Regular() {
    }

    public Regular(User userEntity) {
        this.userEntity = userEntity;
    }

    public Long getId() {
        return id;
    }

    public User getUserEntity() {
        return userEntity;
    }
}
