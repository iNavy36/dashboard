package com.example.dashboard.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "boards")
public class Board {
    @Id
    @Column(name = "board_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "board_name")
    private String name;

    @OneToMany(mappedBy = "boardEntity", targetEntity = ListEntity.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ListEntity> lists;

    @ManyToOne(optional = false)
    @JoinColumn(name = "admin_id", nullable = false)
    private Admin adminEntity;

    public Board() {
    }

    public Board(String name, Admin adminEntity) {
        this.name = name;
        this.adminEntity = adminEntity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public List<ListEntity> getLists() {
        return lists;
    }

    public Admin getAdmin() {
        return adminEntity;
    }

    public void setAdmin(Admin adminEntity) {
        this.adminEntity = adminEntity;
    }
}
