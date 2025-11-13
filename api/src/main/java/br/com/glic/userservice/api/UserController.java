package br.com.glic.userservice.api;

import br.com.glic.userservice.dto.CreateUserRequest;
import br.com.glic.userservice.dto.UpdatePasswordRequest;
import br.com.glic.userservice.dto.UserResponse;
import br.com.glic.userservice.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> create(@Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(request));
    }

    @PutMapping
    public ResponseEntity<UserResponse> updatePassword(@Valid @RequestBody UpdatePasswordRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updatePassword(request));
    }
}
