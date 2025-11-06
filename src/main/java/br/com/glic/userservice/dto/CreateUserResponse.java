package br.com.glic.userservice.dto;

public record CreateUserResponse(
        String fullName,
        String email,
        String password
) {
}
