package br.com.glic.userservice.db;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByProviderAndProviderId(String provider, String providerId);
}
