package com.paradise.beatify.web.api;

import com.paradise.beatify.core.dto.audiocontent.PlaylistDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistRestController {

    @GetMapping(value = "/getPlayListInfo")
    public PlaylistDTO getPlaylistInfo(HttpServletRequest request) {
        return (PlaylistDTO) request.getSession().getAttribute("playList");
    }
}
