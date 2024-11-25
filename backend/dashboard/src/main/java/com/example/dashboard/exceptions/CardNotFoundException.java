package com.example.dashboard.exceptions;

public class CardNotFoundException extends RuntimeException {
    public CardNotFoundException(Long id) {
        super("Could not find card with ID " + id);
    }
}
