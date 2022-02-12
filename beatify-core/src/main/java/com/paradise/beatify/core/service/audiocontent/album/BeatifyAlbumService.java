package com.paradise.beatify.core.service.audiocontent.album;

import com.paradise.beatify.core.domain.audiocontent.album.Album;
import com.paradise.beatify.core.dto.audiocontent.AlbumDTO;
import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.repository.audiocontent.album.AlbumRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BeatifyAlbumService implements AlbumService {

    private final AlbumRepository albumRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BeatifyAlbumService(AlbumRepository albumRepository, ModelMapper modelMapper) {

        this.albumRepository = albumRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public AlbumDTO getById(Long id) throws ServiceException {

        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Album Not Found!"));
        return modelMapper.map(album, AlbumDTO.class);
    }

    @Override
    public AlbumDTO increasePopularity(Long albumId) throws ServiceException {

        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new ServiceException("Album Not Found!"));
        album.setPopularity(album.getPopularity() + 1);

        return modelMapper.map(albumRepository.save(album), AlbumDTO.class);
    }

    @Override
    public long getOverallPopularity() throws ServiceException {

        return albumRepository.getOverallPopularity()
                .orElseThrow(() -> new ServiceException("Something went wrong!"));
    }

    @Override
    public List<AlbumDTO> getRecentlyAddedAlbums(int first, int max) {

        return albumRepository.findRecentAlbums(first, max)
                .stream()
                .map(album -> modelMapper.map(album, AlbumDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<AlbumDTO> getFeaturedAlbums(int first, int max) {

        return albumRepository.findFeaturedAlbums(first, max)
                .stream()
                .map(album -> modelMapper.map(album, AlbumDTO.class))
                .collect(Collectors.toList());
    }
}
