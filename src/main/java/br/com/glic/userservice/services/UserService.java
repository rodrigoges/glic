package br.com.glic.userservice.services;

import br.com.glic.parent.exceptions.GenericException;
import br.com.glic.parent.utils.Utils;
import br.com.glic.userservice.db.UserEntity;
import br.com.glic.userservice.db.UserRepository;
import br.com.glic.userservice.dto.CreateUserRequest;
import br.com.glic.userservice.dto.CreateUserResponse;
import br.com.glic.userservice.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public CreateUserResponse create(CreateUserRequest request) {
        validateMandatoryFields(request);
        validateUserEmailExists(request.email());
        var entity = userMapper.toEntity(request);
        var user = userRepository.save(entity);
        return userMapper.toResponse(user);
    }

    private UserEntity validateUserEmailExists(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new GenericException(
                HttpStatus.BAD_REQUEST,
                "This e-mail " + email + " is already registered",
                OffsetDateTime.now()
        ));
    }

    private void validateMandatoryFields(CreateUserRequest request) {
        Utils.validateMandatoryField(request.fullName(), "Full Name");
        Utils.validateMandatoryField(request.email(), "E-mail");
        Utils.validateMandatoryField(request.password(), "Password");
    }
}

