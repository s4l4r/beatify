package com.paradise.beatify.core.util.authentication;

import com.paradise.beatify.core.domain.userdetails.BeatifyUser;
import com.paradise.beatify.core.dto.userdetails.UserDTO;
import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.service.userdetails.user.UserService;
import com.paradise.beatify.core.util.constants.BeatifyConstants;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

@Component
public class PrincipalHelper {

    private final UserService userService;
    private final ModelMapper modelMapper;

    @Autowired
    public PrincipalHelper(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    public synchronized boolean isAuthenticated() {

        return !(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken);
    }

    public synchronized BeatifyUser getAuthenticatedUser() throws ServiceException {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails)
            return modelMapper.map(userService.getByEmailAddress(((UserDetails)principal).getUsername()),
                    BeatifyUser.class);
        else
            return null;
    }

    public synchronized void addAuthenticationDetails(Model model, boolean addModelAttribute) throws ServiceException {

        if (isAuthenticated()) {

            model.addAttribute(BeatifyConstants.WEB_AUTHENTICATED, true);
            if (addModelAttribute)
                model.addAttribute(BeatifyConstants.WEB_PRINCIPAL, getAuthenticatedUser());
        } else {

            model.addAttribute(BeatifyConstants.WEB_AUTHENTICATED, false);
            if (addModelAttribute)
                model.addAttribute(BeatifyConstants.WEB_USER, new UserDTO());
        }
    }
}
