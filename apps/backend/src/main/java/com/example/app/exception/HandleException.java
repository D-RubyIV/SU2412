package com.example.app.exception;

import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.ArrayList;


@ControllerAdvice
public class HandleException {
    @ExceptionHandler(ApiException.class)
    public final ResponseEntity<ErrorModel> handleApiException(ApiException ex) {
        ErrorModel errorModel = new ErrorModel(ex.getMessage(), ex.getHttpStatus(), ex.getErrors());
        return ResponseEntity.status(ex.getHttpStatus().value()).body(errorModel);
    }

//    @ExceptionHandler(CredentialsExpiredException.class)
//    public final ResponseEntity<ErrorModel> handleCredentialsExpiredException(CredentialsExpiredException ex) {
//        ErrorModel errorModel = new ErrorModel(ex.getMessage(), HttpStatus.FORBIDDEN, new ArrayList<>());
//        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorModel);
//    }


    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<ErrorModel> handleBadRequestsException(BadRequestException ex) {
        ErrorModel errorModel = new ErrorModel(ex.getMessage(), HttpStatus.BAD_REQUEST, new ArrayList<>());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorModel);
    }

    @ExceptionHandler(BindException.class)
    public final ResponseEntity<?> handleBindException(BindException ex) {
        String field = ex.getFieldErrors().get(0).getField();
        String defaultMessage = ex.getFieldErrors().get(0).getDefaultMessage();
        ErrorModel errorModel = new ErrorModel(field.substring(0, 1).toUpperCase() + field.substring(1) + " " + defaultMessage, HttpStatus.BAD_REQUEST, new ArrayList<>());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorModel);
    }



}