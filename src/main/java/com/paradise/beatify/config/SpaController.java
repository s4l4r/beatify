package com.paradise.beatify.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping(value = {"/", "/home", "/albums/**", "/artists/**", "/bands/**", "/search", "/login", "/library", "/favorites", "/playlists/**"})
    public String forward() {
        return "forward:/index.html";
    }
}
