package br.com.glic.userservice.mappers;

import br.com.glic.userservice.db.UserEntity;
import br.com.glic.userservice.dto.CreateUserRequest;
import br.com.glic.userservice.dto.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserEntity toEntity(CreateUserRequest request);

    UserResponse toResponse(UserEntity entity);
}
