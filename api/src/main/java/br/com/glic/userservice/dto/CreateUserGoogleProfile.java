package br.com.glic.userservice.dto;

public record CreateUserGoogleProfile(
        String sub,
        String email,
        String name
) {
}

