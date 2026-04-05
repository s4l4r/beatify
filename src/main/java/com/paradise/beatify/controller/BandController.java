package com.paradise.beatify.controller;

import com.paradise.beatify.dto.BandResponse;
import com.paradise.beatify.service.BandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bands")
public class BandController {

    private final BandService bandService;

    public BandController(BandService bandService) {
        this.bandService = bandService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<BandResponse> getBand(@PathVariable Long id) {
        BandResponse band = bandService.getById(id);
        return ResponseEntity.ok(band);
    }
}
