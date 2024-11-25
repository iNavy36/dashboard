package com.example.dashboard.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.dashboard.model.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query(value = "SELECT b.id AS boardId, b.name as name, a.id AS adminId, l.id AS listId " +
            "FROM Board b LEFT JOIN b.adminEntity a " +
            "LEFT JOIN b.lists l " +
            "GROUP BY b.id, a.id, b.name, l.id")
    List<Object[]> getAllBoards();

    @Query(value = "SELECT b.id AS boardId, b.name as name, a.id AS adminId, l.id AS listId " +
            "FROM Board b LEFT JOIN b.adminEntity a " +
            "LEFT JOIN b.lists l " +
            "WHERE b.id = :id")
    List<Object[]> getSingleBoard(@Param("id") Long id);
}
