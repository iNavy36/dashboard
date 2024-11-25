package com.example.dashboard.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.dashboard.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    @Query(value = "SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END "
            + "FROM Admin a WHERE a.userEntity.id = :userId")
    boolean existsByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT a FROM Admin a WHERE a.userEntity.id = :userId")
    Admin getByUserId(@Param("userId") Long userId);
}
