package com.example.dashboard.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.dashboard.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT u.id AS userId, u.name as name, a.id AS adminId " +
            "FROM Admin a RIGHT JOIN a.userEntity u " +
            "GROUP BY u.id, a.id, u.name")
    List<Object[]> getAllUsers();
}
