package com.example.dashboard.database;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.dashboard.model.Card;
import com.example.dashboard.query_interfaces.CardShortened;

public interface CardRepository extends JpaRepository<Card, Long> {
    @Query(value = "SELECT c.id AS cardId, c.content as content, l.id AS listId, u.id AS userId " +
            "FROM Card c LEFT JOIN c.listEntity l " +
            "LEFT JOIN c.userEntity u " +
            "WHERE c.id = :id")
    Optional<CardShortened> getSingleCard(@Param("id") Long id);
}
