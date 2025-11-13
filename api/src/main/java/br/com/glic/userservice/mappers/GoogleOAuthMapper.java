package br.com.glic.userservice.mappers;

import br.com.glic.userservice.db.UserEntity;
import br.com.glic.userservice.dto.CreateUserGoogleProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GoogleOAuthMapper {

    @Mapping(target = "email", source = "email")
    @Mapping(target = "fullName", source = "name")
    @Mapping(target = "providerId", source = "sub")
    UserEntity toEntity(CreateUserGoogleProfile request);
}
