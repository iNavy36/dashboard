package com.example.dashboard.database;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.dashboard.model.Regular;

public interface RegularRepository extends JpaRepository<Regular, Long> {

}
