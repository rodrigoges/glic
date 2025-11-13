package br.com.glic.userservice.services;

import br.com.glic.parent.exceptions.GenericException;
import br.com.glic.userservice.db.UserRepository;
import br.com.glic.userservice.dto.CreateUserGoogleProfile;
import br.com.glic.userservice.enums.AuthTypeEnum;
import br.com.glic.userservice.mappers.GoogleOAuthMapper;
import br.com.glic.userservice.mappers.UserMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GoogleOAuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserService userService;
    private final UserRepository userRepository;
    private final GoogleOAuthMapper googleOAuthMapper;
    private final UserMapper userMapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        var delegate = new DefaultOAuth2UserService();
        var oauthUser = delegate.loadUser(userRequest);
        var attrs = oauthUser.getAttributes();
        this.createUserByGoogle(attrs);
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        return new DefaultOAuth2User(authorities, attrs, "sub");
    }

    @Transactional
    public void createUserByGoogle(Map<String, Object> googleAttributes) {
        var profile = mapCreateGoogleProfile(googleAttributes);
        var user = userRepository.findByProviderAndProviderId(AuthTypeEnum.GOOGLE.name(), profile.sub());
        if (user.isPresent()) {
            throw new GenericException(HttpStatus.BAD_REQUEST, "User has already exists", OffsetDateTime.now());
        }
        var userEntity = googleOAuthMapper.toEntity(profile);
        userEntity.setProvider(AuthTypeEnum.GOOGLE);
        userRepository.save(userEntity);
    }

    private CreateUserGoogleProfile mapCreateGoogleProfile(Map<String, Object> googleAttributes) {
        return new CreateUserGoogleProfile(
                (String) googleAttributes.get("sub"),
                (String) googleAttributes.get("email"),
                (String) googleAttributes.get("name")
        );
    }
}

