package br.com.glic.measureservice.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record UpdateMeasureRequest(
        UUID measureId,
        Integer value,
        OffsetDateTime offsetDateTime,
        UUID userId
) {
}
