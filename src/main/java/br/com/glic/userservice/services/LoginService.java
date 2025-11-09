package br.com.glic.userservice.services;

import br.com.glic.parent.exceptions.GenericException;
import br.com.glic.userservice.db.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByEmail(username).orElseThrow(() -> new GenericException(
                HttpStatus.BAD_REQUEST,
                "User " + username + " not found",
                OffsetDateTime.now()
        ));
        return new User(user.getEmail(), user.getPassword(), List.of());
    }
}
