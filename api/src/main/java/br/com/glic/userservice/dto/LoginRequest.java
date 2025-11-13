package br.com.glic.userservice.dto;

public record LoginRequest(
        String email, String password
) {
}
