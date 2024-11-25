package com.example.dashboard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cards")
public class Card {
    @Id
    @Column(name = "card_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "card_content")
    private String content;

    @ManyToOne(optional = false)
    @JoinColumn(name = "list_id", nullable = false)
    private ListEntity listEntity;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User userEntity;

    public Card() {
    }

    public Card(String content, User userEntity, ListEntity listEntity) {
        this.content = content;
        this.userEntity = userEntity;
        this.listEntity = listEntity;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public ListEntity getListEntity() {
        return listEntity;
    }

    public User getUserEntity() {
        return userEntity;
    }

    public void setListEntity(ListEntity listEntity) {
        this.listEntity = listEntity;
    }

    public void setUserEntity(User userEntity) {
        this.userEntity = userEntity;
    }

}
