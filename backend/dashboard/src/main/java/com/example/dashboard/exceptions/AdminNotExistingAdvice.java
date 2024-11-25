package com.example.dashboard.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AdminNotExistingAdvice {
    @ExceptionHandler(AdminNotExistingException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String adminNotFoundHandler(AdminNotExistingException ex) {
        return ex.getMessage();
    }
}
