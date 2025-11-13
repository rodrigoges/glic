package br.com.glic.parent.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.OffsetDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(GenericException.class)
    public ResponseEntity<GenericError> handleGenericException(GenericException exception) {
        return ResponseEntity
                .status(exception.getHttpStatus())
                .body(new GenericError(
                        exception.getHttpStatus(),
                        exception.getMessage(),
                        OffsetDateTime.now()
                ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GenericError> handleException(Exception exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new GenericError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        exception.getMessage(),
                        OffsetDateTime.now()
                ));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<GenericError> handleRuntimeException(RuntimeException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new GenericError(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        exception.getMessage(),
                        OffsetDateTime.now()
                ));
    }
}
