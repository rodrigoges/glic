package br.com.glic.userservice.api;

import br.com.glic.userservice.dto.LoginRequest;
import br.com.glic.userservice.dto.LoginResponse;
import br.com.glic.userservice.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class LoginController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> create(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.login(request));
    }
}
