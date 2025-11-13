package br.com.glic.userservice.dto;

import java.util.UUID;

public record UserResponse(
        UUID userId,
        String fullName,
        String email
) {
}
