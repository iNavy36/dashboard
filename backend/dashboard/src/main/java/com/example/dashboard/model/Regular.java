package com.example.dashboard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "regulars")
public class Regular {
    @Id
    @Column(name = "regular_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
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
