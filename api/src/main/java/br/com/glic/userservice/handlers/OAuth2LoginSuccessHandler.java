package br.com.glic.userservice.handlers;

import br.com.glic.userservice.db.UserRepository;
import br.com.glic.userservice.enums.AuthTypeEnum;
import br.com.glic.userservice.services.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        OAuth2User principal = (OAuth2User) authentication.getPrincipal();
        String sub = principal.getAttribute("sub");
        var user = userRepository.findByProviderAndProviderId(AuthTypeEnum.GOOGLE.name(), sub).orElseThrow();
        String jwt = jwtService.generate(user.getEmail(), List.of("ROLE_USER"));
        Cookie c = new Cookie("APP_TOKEN", jwt);
        c.setHttpOnly(true);
        c.setPath("/");
        response.addCookie(c);
        response.sendRedirect("/login/sucesso#token=" + jwt);
    }
}
