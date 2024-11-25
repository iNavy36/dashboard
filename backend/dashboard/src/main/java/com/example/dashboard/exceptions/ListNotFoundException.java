package com.example.dashboard.exceptions;

public class ListNotFoundException extends RuntimeException {
    public ListNotFoundException(Long id) {
        super("Could not find list with ID " + id);
    }
}
