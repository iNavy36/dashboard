package com.example.dashboard.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dashboard.database.UserRepository;
import com.example.dashboard.services.UserService;
import com.example.dashboard.query_interfaces.UserShortened;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping
    List<UserShortened> all() {
        return UserService.getAllUserShortened(this.userRepo.getAllUsers());
    }
}
