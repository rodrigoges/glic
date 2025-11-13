package br.com.glic.parent.utils;

import br.com.glic.parent.exceptions.GenericException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.time.OffsetDateTime;

@Component
public class Utils {

    public static void validateMandatoryField(Object object, String fieldName) {
        if (object == null || ObjectUtils.isEmpty(object)) {
            throw new GenericException(
                    HttpStatus.BAD_REQUEST,
                    fieldName + " is mandatory",
                    OffsetDateTime.now()
            );
        }
        if (object.toString().length() < 2) {
            throw new GenericException(
                    HttpStatus.BAD_REQUEST,
                    fieldName + " cannot be lower " + 2,
                    OffsetDateTime.now()
            );
        }
    }
}
