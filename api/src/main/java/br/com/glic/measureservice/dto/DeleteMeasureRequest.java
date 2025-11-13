package br.com.glic.measureservice.dto;

import java.util.UUID;

public record DeleteMeasureRequest(
        UUID measureId,
        UUID userId
) {
}
