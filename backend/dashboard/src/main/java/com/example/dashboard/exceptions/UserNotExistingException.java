package com.example.dashboard.exceptions;

public class UserNotExistingException extends RuntimeException {
    public UserNotExistingException(Long id) {
        super("There is no user with user id " + id);
    }
}
