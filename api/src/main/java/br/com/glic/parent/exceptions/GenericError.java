package br.com.glic.parent.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.OffsetDateTime;

@Getter
@Setter
@AllArgsConstructor
public class GenericError {

    private HttpStatus httpStatus;
    private String message;
    private OffsetDateTime dateTime;
}
