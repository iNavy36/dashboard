package com.example.dashboard.database;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.example.dashboard.model.User;
import com.example.dashboard.model.Admin;
import com.example.dashboard.model.Regular;

public class LoadDatabase {
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepo, AdminRepository adminRepo, RegularRepository regularRepo) {
        return args -> {
            adminRepo.save(new Admin(userRepo.save(new User("First Admin", "admin1@mail.com"))));
            regularRepo.save(new Regular(userRepo.save(new User("First User", "user1@mail.com"))));
        };
    }
}
