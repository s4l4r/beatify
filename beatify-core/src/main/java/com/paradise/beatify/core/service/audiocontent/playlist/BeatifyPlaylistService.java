package com.paradise.beatify.core.service.audiocontent.playlist;

import com.paradise.beatify.core.domain.audiocontent.playlist.Playlist;
import com.paradise.beatify.core.dto.audiocontent.PlaylistDTO;
import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.repository.audiocontent.playlist.PlaylistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BeatifyPlaylistService implements PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BeatifyPlaylistService(PlaylistRepository playlistRepository, ModelMapper modelMapper) {

        this.playlistRepository = playlistRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public PlaylistDTO getById(Long id) throws ServiceException {

        Playlist playlist = playlistRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Playlist Not Found!"));
        return modelMapper.map(playlist, PlaylistDTO.class);
    }
}
