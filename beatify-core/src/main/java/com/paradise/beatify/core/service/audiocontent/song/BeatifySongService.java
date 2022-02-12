package com.paradise.beatify.core.service.audiocontent.song;

import com.paradise.beatify.core.dto.audiocontent.SongDTO;
import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.repository.audiocontent.song.SongRepository;
import com.paradise.beatify.core.domain.audiocontent.song.Song;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BeatifySongService implements SongService {

    private final SongRepository songRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BeatifySongService(SongRepository songRepository, ModelMapper modelMapper) {

        this.songRepository = songRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public SongDTO getById(Long id) throws ServiceException {

        Song song = songRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Song Not Found!"));
        return modelMapper.map(song, SongDTO.class);
    }
}
