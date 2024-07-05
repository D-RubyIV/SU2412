package com.example.app.exception;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.List;
@Getter
@Setter
public class ApiException extends RuntimeException{
    private HttpStatus httpStatus;
    private List<ErrorDetail> errors;
    public ApiException(String message, HttpStatus httpStatus, List<ErrorDetail> errors) {
        super(message);
        this.httpStatus = httpStatus;
        this.errors = errors;
    }
}