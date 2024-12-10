package com.example.dashboard.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String entityType, Long id) {
        super("Could not find " + entityType + " with ID " + id);
    }

    public NotFoundException(String entityType, Long id, String customMessage) {
        super(customMessage + " (ID: " + id + ")");
    }
}
