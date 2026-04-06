package com.paradise.beatify.security;

import com.paradise.beatify.domain.BeatifyUser;
import com.paradise.beatify.repository.UserRepository;
import com.paradise.beatify.service.PlaylistService;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends OidcUserService {

    private final UserRepository userRepository;
    private final PlaylistService playlistService;

    public CustomOAuth2UserService(UserRepository userRepository, PlaylistService playlistService) {
        this.userRepository = userRepository;
        this.playlistService = playlistService;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);

        String googleId = oidcUser.getSubject();
        String email = oidcUser.getEmail();
        String firstName = oidcUser.getGivenName();
        String lastName = oidcUser.getFamilyName();

        boolean isNew = userRepository.findByGoogleId(googleId).isEmpty();

        BeatifyUser user = userRepository.findByGoogleId(googleId).orElseGet(() -> {
            BeatifyUser newUser = new BeatifyUser();
            newUser.setGoogleId(googleId);
            newUser.setActive(true);
            return newUser;
        });

        user.setUsername(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setTitle(firstName + " " + lastName);
        userRepository.saveAndFlush(user);

        if (isNew) {
            playlistService.getOrCreateFavorites(user);
        }

        return oidcUser;
    }
}
