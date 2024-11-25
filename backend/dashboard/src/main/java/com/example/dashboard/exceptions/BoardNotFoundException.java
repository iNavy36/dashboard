package com.example.dashboard.exceptions;

public class BoardNotFoundException extends RuntimeException {
    public BoardNotFoundException(Long id) {
        super("Could not find board with ID " + id);
    }
}
