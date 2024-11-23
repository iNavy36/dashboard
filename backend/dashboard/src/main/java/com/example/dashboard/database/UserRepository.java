package com.example.dashboard.database;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.dashboard.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
