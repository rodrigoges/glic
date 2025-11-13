package br.com.glic.measureservice.dto;

import java.util.UUID;

public record CreateMeasureRequest(
        Integer value,
        UUID userId
) {
}
