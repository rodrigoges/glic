package br.com.glic.userservice.dto;

import java.util.UUID;

public record CreateUserRequest(
        UUID userId,
        String fullName,
        String email,
        String password
) {
}
