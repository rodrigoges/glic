package br.com.glic.measureservice.dto;

import br.com.glic.measureservice.enums.MeasureStatusEnum;
import jakarta.validation.constraints.Null;

import java.time.OffsetDateTime;

public record FindMeasureRequest(
        @Null MeasureStatusEnum status,
        @Null OffsetDateTime from,
        @Null OffsetDateTime to,
        String email
) {
}
