package com.paradise.beatify.web.controller;

import com.paradise.beatify.core.domain.info.Country;
import com.paradise.beatify.core.dto.audiocontent.AlbumDTO;
import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.service.audiocontent.album.AlbumService;
import com.paradise.beatify.core.util.authentication.PrincipalHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Arrays;

@Controller
@RequestMapping("/albums")
public class AlbumController {

    private final AlbumService albumService;
    private final PrincipalHelper principalHelper;

    @Autowired
    public AlbumController(AlbumService albumService, PrincipalHelper principalHelper) {
        this.albumService = albumService;
        this.principalHelper = principalHelper;
    }

    @RequestMapping(value = "/{albumId}", method = RequestMethod.GET)
    public String loadAlbumPage(@PathVariable("albumId") Long albumId, Model model) {

        try {

            principalHelper.addAuthenticationDetails(model, true);
            AlbumDTO album = albumService.increasePopularity(albumId);
            model.addAttribute("album", album);
            model.addAttribute("countries", Arrays.asList(Country.values()));

            return "album";

        } catch (ServiceException e) {

            model.addAttribute("errorMessage", e.getTitle());
            return "error";
        }

    }
}
