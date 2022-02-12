package com.paradise.beatify.web.controller;

import com.paradise.beatify.core.domain.info.Country;
import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.service.audiocontent.album.AlbumService;
import com.paradise.beatify.core.util.authentication.PrincipalHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Arrays;

@Controller
@RequestMapping(value = {"/", "home"})
public class HomeController {

    private final AlbumService albumService;
    private final PrincipalHelper principalHelper;

    @Autowired
    public HomeController(AlbumService albumService, PrincipalHelper principalHelper) {
        this.albumService = albumService;
        this.principalHelper = principalHelper;
    }

    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
    public String loadHomePage(Model model) {

        try {

            principalHelper.addAuthenticationDetails(model, true);
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
