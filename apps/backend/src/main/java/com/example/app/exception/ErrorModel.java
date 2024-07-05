package com.example.app.exception;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ErrorModel {
    private String message;
    private HttpStatus httpStatus;
    private List<ErrorDetail> errorDetails;
}