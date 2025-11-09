package br.com.glic.userservice.dto;

public record UpdatePasswordRequest(
        String email,
        String password
) {
}
