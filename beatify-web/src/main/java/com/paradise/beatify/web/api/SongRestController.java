package com.paradise.beatify.web.api;

import com.paradise.beatify.core.dto.BaseEntityDTO;
import com.paradise.beatify.core.dto.ErrorDTO;
import com.paradise.beatify.core.dto.audiocontent.PlaylistDTO;
import com.paradise.beatify.core.dto.audiocontent.SongDTO;
import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.service.audiocontent.song.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value = "/api/songs")
public class SongRestController {

    private final SongService songService;

    @Autowired
    public SongRestController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping
    public BaseEntityDTO getSongById(Long id) {

        try {
            return songService.getById(id);
        } catch(ServiceException e) {

            return new ErrorDTO(e.getTitle());
        }
    }

    @GetMapping(value = "/setSongInfo")
    public String setSongInfo(@RequestParam("songId") Long songId,
                              @RequestParam("currentTime") String currentTime,
                              @RequestParam("shuffle") boolean shuffle,
                              @RequestParam("repeat") boolean repeat,
                              @RequestParam(value = "tracks[]", required = false) List<Long> tracksIds,
                              HttpServletRequest request) {

        SongDTO songInfo = new SongDTO();
        PlaylistDTO playListInfo = new PlaylistDTO();

        songInfo.setId(songId);
        songInfo.setCurrentTime(currentTime.split("\\.")[0]);

        playListInfo.setShuffle(shuffle);
        playListInfo.setRepeat(repeat);
        playListInfo.setTracks(tracksIds);

        request.getSession().setAttribute("song", songInfo);
        request.getSession().setAttribute("playList", playListInfo);

        return "success";
    }

    @GetMapping(value = "/getSongInfo")
    public SongDTO getSongInfo(HttpServletRequest request) {

        return (SongDTO) request.getSession().getAttribute("song");
    }
}
