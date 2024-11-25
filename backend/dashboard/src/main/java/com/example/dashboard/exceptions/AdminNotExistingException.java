package com.example.dashboard.exceptions;

public class AdminNotExistingException extends RuntimeException {
    public AdminNotExistingException(Long id) {
        super("There is no admin with user id " + id);
    }
}
