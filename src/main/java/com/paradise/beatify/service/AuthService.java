package com.paradise.beatify.service;

import com.paradise.beatify.domain.Authority;
import com.paradise.beatify.domain.BeatifyUser;
import com.paradise.beatify.domain.enums.Country;
import com.paradise.beatify.dto.AuthResponse;
import com.paradise.beatify.dto.LoginRequest;
import com.paradise.beatify.dto.RegisterRequest;
import com.paradise.beatify.dto.UserResponse;
import com.paradise.beatify.repository.AuthorityRepository;
import com.paradise.beatify.repository.UserRepository;
import com.paradise.beatify.security.JwtTokenProvider;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, AuthorityRepository authorityRepository,
                       PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        String token = jwtTokenProvider.generateToken(authentication.getName());

        BeatifyUser user = userRepository.findByUsername(request.email())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        UserResponse userResponse = new UserResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getUsername());
        return new AuthResponse(token, userResponse);
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.email())) {
            throw new IllegalArgumentException("Username already exists");
        }

        BeatifyUser user = new BeatifyUser();
        user.setUsername(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setPhoneNumber(request.phoneNumber());
        user.setActive(true);
        user.setTitle(request.firstName() + " " + request.lastName());

        if (request.nationality() != null && !request.nationality().isEmpty()) {
            try {
                user.setNationality(Country.valueOf(request.nationality()));
            } catch (IllegalArgumentException e) {
                // ignore invalid nationality
            }
        }

        userRepository.save(user);

        Authority authority = new Authority();
        authority.setRole("ROLE_USER");
        authority.setUsername(request.email());
        authority.setActive(true);
        authority.setTitle("ROLE_USER");
        authorityRepository.save(authority);

        String token = jwtTokenProvider.generateToken(user.getUsername());

        UserResponse userResponse = new UserResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getUsername());
        return new AuthResponse(token, userResponse);
    }

    public UserResponse getCurrentUser(String username) {
        BeatifyUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return new UserResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getUsername());
    }
}
