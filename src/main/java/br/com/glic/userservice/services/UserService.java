package br.com.glic.userservice.services;

import br.com.glic.parent.exceptions.GenericException;
import br.com.glic.parent.utils.Utils;
import br.com.glic.userservice.db.UserRepository;
import br.com.glic.userservice.dto.CreateUserRequest;
import br.com.glic.userservice.dto.LoginRequest;
import br.com.glic.userservice.dto.LoginResponse;
import br.com.glic.userservice.dto.UpdatePasswordRequest;
import br.com.glic.userservice.dto.UserResponse;
import br.com.glic.userservice.enums.AuthTypeEnum;
import br.com.glic.userservice.mappers.UserMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public UserResponse create(CreateUserRequest request) {
        validateMandatoryFields(request);
        userRepository.findByEmail(request.email());
        var entity = userMapper.toEntity(request);
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setProvider(AuthTypeEnum.LOCAL);
        var user = userRepository.save(entity);
        return userMapper.toResponse(user);
    }

    private void validateMandatoryFields(CreateUserRequest request) {
        Utils.validateMandatoryField(request.fullName(), "Full Name");
        Utils.validateMandatoryField(request.email(), "E-mail");
        Utils.validateMandatoryField(request.password(), "Password");
    }

    public LoginResponse login(LoginRequest request) {
        var authToken = new UsernamePasswordAuthenticationToken(request.email().toLowerCase(), request.password());
        authenticationManager.authenticate(authToken);
        var user = userRepository.findByEmail(request.email()).orElseThrow(() -> new GenericException(
                HttpStatus.BAD_REQUEST,
                "User " + request.email() + " not found",
                OffsetDateTime.now()
        ));
        var token = jwtService.generate(user.getEmail(), List.of());
        return new LoginResponse(token, user.getEmail());
    }

    @Transactional
    public UserResponse updatePassword(UpdatePasswordRequest request) {
        var user = userRepository.findByEmail(request.email()).orElseThrow(() -> new GenericException(
                HttpStatus.BAD_REQUEST,
                "E-mail " + request.email() + " doesn't exists",
                OffsetDateTime.now()
        ));
        user.setPassword(passwordEncoder.encode(request.password()));
        var userSaved = userRepository.save(user);
        return userMapper.toResponse(userSaved);
    }
}

