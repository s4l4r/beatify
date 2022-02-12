package com.paradise.beatify.web.controller;

import com.paradise.beatify.core.domain.info.Country;
import com.paradise.beatify.core.dto.userdetails.UserDTO;
import com.paradise.beatify.core.util.authentication.PrincipalHelper;
import com.paradise.beatify.core.util.constants.BeatifyConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Arrays;

@Controller
@RequestMapping("/login")
public class LoginController {

    private final PrincipalHelper principalHelper;

    @Autowired
    public LoginController(PrincipalHelper principalHelper) {
        this.principalHelper = principalHelper;
    }

    @RequestMapping(method = RequestMethod.GET)
    public String loadLoginPage(Model model) {

        if (principalHelper.isAuthenticated())
            return "redirect:/home";

        model.addAttribute(BeatifyConstants.WEB_USER, new UserDTO());
        model.addAttribute("countries", Arrays.asList(Country.values()));
        return "login";
    }

    @RequestMapping(value = "/loginError", method = {RequestMethod.GET, RequestMethod.POST})
    public String loginErrorLoad(Model model) {

        model.addAttribute(BeatifyConstants.WEB_USER, new UserDTO());
        model.addAttribute("loginError", true);
        model.addAttribute("countries", Arrays.asList(Country.values()));
        return "login";
    }

    @RequestMapping(value = "/logout")
    public String logoutSuccess(Model model) {

        model.addAttribute(BeatifyConstants.WEB_USER, new UserDTO());
        model.addAttribute("logoutSuccess", true);
        model.addAttribute("countries", Arrays.asList(Country.values()));
        return "login";
    }
}
