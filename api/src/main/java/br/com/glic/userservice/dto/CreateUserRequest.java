package br.com.glic.userservice.dto;

public record CreateUserRequest(
        String fullName,
        String email,
        String password
) {
}
