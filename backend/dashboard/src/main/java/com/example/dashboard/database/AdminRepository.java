package com.example.dashboard.database;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.dashboard.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

}
