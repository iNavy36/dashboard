package com.example.dashboard.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "admins")
public class Admin {
    @Id
    @Column(name = "admin_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", nullable = false)
    private User userEntity;

    @OneToMany(mappedBy = "adminEntity", targetEntity = Board.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Board> boards;

    public Admin() {
    }

    public Admin(User userEntity) {
        this.userEntity = userEntity;
    }

    public Long getId() {
        return id;
    }

    public User getUserEntity() {
        return userEntity;
    }

    public List<Board> getBoards() {
        return boards;
    }

}
