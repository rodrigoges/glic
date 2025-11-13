package br.com.glic.userservice.dto;

public record LoginResponse(
        String email, String token
) {
}
