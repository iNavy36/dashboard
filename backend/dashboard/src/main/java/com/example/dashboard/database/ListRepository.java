package com.example.dashboard.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.dashboard.model.ListEntity;

public interface ListRepository extends JpaRepository<ListEntity, Long> {
    @Query(value = "SELECT l.id AS listId, l.name AS name, b.id AS boardId, a.id as adminId, c.id AS cardId " +
            "FROM ListEntity l LEFT JOIN l.boardEntity b " +
            "LEFT JOIN l.adminEntity a " +
            "LEFT JOIN l.cards c " +
            "WHERE l.id = :id")
    List<Object[]> getSingleList(@Param("id") Long id);
}
