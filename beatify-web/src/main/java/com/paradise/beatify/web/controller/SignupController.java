package com.paradise.beatify.web.controller;

import com.paradise.beatify.core.domain.info.Country;
import com.paradise.beatify.core.dto.userdetails.UserDTO;
import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.service.audiocontent.album.AlbumService;
import com.paradise.beatify.core.service.userdetails.user.UserService;
import com.paradise.beatify.core.util.authentication.PrincipalHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Arrays;

@Controller
@RequestMapping(value = "/signup")
public class SignupController {

    private final UserService userService;
    private final Validator validator;
    private final PrincipalHelper principalHelper;
    private final AlbumService albumService;

    @Autowired
    public SignupController(UserService userService, @Qualifier("emailValidator") Validator validator,
                            PrincipalHelper principalHelper, AlbumService albumService) {
        this.userService = userService;
        this.validator = validator;
        this.principalHelper = principalHelper;
        this.albumService = albumService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public String signup(@ModelAttribute("userDTO") @Validated UserDTO userDTO, BindingResult result, Model model) {

        validator.validate(userDTO, result);
        if (result.hasErrors()) {

            try {

                principalHelper.addAuthenticationDetails(model, false);
                model.addAttribute("errorsInSignup", true);
                model.addAttribute("countries", Arrays.asList(Country.values()));
                return "login";
            } catch (ServiceException e) {

                model.addAttribute("errorMessage", e.getTitle());
                return "error";
            }
        } else {

            try {

                userService.signup(userDTO);
                principalHelper.addAuthenticationDetails(model, true);
                model.addAttribute("signupSuccess", true);
                model.addAttribute("featuredAlbumsPart1", albumService.getFeaturedAlbums(0, 4));
                model.addAttribute("featuredAlbumsPart2", albumService.getFeaturedAlbums(4, 4));
                model.addAttribute("recentlyAdded1", albumService.getRecentlyAddedAlbums(0, 4));
                model.addAttribute("recentlyAdded2", albumService.getRecentlyAddedAlbums(4, 4));
                model.addAttribute("countries", Arrays.asList(Country.values()));
                return "home";
            } catch (ServiceException e) {

                model.addAttribute("errorMessage", e.getTitle());
                return "error";
            }
        }
    }
}
