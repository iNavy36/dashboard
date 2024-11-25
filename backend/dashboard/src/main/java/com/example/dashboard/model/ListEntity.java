package com.example.dashboard.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "lists")
public class ListEntity {
    @Id
    @Column(name = "list_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "list_name")
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "board_id", nullable = false)
    private Board boardEntity;

    @OneToMany(mappedBy = "listEntity", targetEntity = Card.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Card> cards;

    public ListEntity() {
    }

    public ListEntity(String name, Board boardEntity) {
        this.name = name;
        this.boardEntity = boardEntity;
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

    public Board getBoardEntity() {
        return boardEntity;
    }

    public List<Card> getCards() {
        return cards;
    }
}
