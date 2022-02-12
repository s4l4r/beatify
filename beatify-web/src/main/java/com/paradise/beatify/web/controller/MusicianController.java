package com.paradise.beatify.web.controller;

import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.service.audiocontent.album.AlbumService;
import com.paradise.beatify.core.service.musician.artist.ArtistService;
import com.paradise.beatify.core.service.musician.band.BandService;
import com.paradise.beatify.core.util.authentication.PrincipalHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(value = {"/artists", "/bands"})
public class MusicianController {

    private final ArtistService artistService;
    private final BandService bandService;
    private final PrincipalHelper principalHelper;
    private final AlbumService albumService;

    @Autowired
    public MusicianController(ArtistService artistService, BandService bandService, PrincipalHelper principalHelper,
                              AlbumService albumService) {
        this.artistService = artistService;
        this.bandService = bandService;
        this.principalHelper = principalHelper;
        this.albumService = albumService;
    }

    @RequestMapping(value = "/{artistId}", method = RequestMethod.GET)
    public String loadArtistPage(@PathVariable("artistId") Long artistId, Model model, HttpServletRequest request) {

        try {

            principalHelper.addAuthenticationDetails(model, true);

            boolean bandRequested = request.getRequestURL().toString().contains("/bands");
            if (bandRequested)
                model.addAttribute("artist", bandService.getById(artistId));
            else
                model.addAttribute("artist", artistService.getById(artistId));


            model.addAttribute("isBand", bandRequested);
            model.addAttribute("overAllPopularity", albumService.getOverallPopularity());

            return "artist";

        } catch (ServiceException e) {

            model.addAttribute("errorMessage", e.getTitle());
            return "error";
        }
    }
}
