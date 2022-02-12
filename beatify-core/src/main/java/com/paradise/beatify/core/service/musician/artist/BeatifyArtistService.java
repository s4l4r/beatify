package com.paradise.beatify.core.service.musician.artist;

import com.paradise.beatify.core.domain.musician.Artist;
import com.paradise.beatify.core.dto.musician.artist.ArtistDTO;
import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.repository.musician.artist.ArtistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BeatifyArtistService implements ArtistService {

    private final ArtistRepository artistRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BeatifyArtistService(ArtistRepository artistRepository, ModelMapper modelMapper) {

        this.artistRepository = artistRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ArtistDTO getById(Long id) throws ServiceException {

        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Artist Not Found!"));
        return modelMapper.map(artist, ArtistDTO.class);
    }
}
