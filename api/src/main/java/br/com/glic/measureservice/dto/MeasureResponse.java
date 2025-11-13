package br.com.glic.measureservice.dto;

import br.com.glic.measureservice.enums.MeasureStatusEnum;

import java.time.OffsetDateTime;
import java.util.UUID;

public record MeasureResponse(
        UUID measureId,
        Integer value,
        OffsetDateTime dateCreation,
        MeasureStatusEnum status,
        UUID userId
) {
}
