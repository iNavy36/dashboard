package com.example.dashboard.database;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import com.example.dashboard.model.User;
import com.example.dashboard.model.Admin;
import com.example.dashboard.model.Regular;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    @Transactional
    CommandLineRunner initDatabase(UserRepository userRepo, AdminRepository adminRepo, RegularRepository regularRepo) {
        return args -> {
            try {
                User firstUser = userRepo.save(new User("First Admin", "admin1@mail.com"));
                Admin firstAdmin = adminRepo.save(new Admin(firstUser));
                log.info("Preloading " + firstAdmin);
                User secondUser = userRepo.save(new User("First User", "user1@mail.com"));
                Regular firstRegular = regularRepo.save(new Regular(secondUser));
                log.info("Preloading " + firstRegular);
            } catch (Exception e) {
                log.error("Error occurred while preloading database: ", e);
            }
        };
    }
}
