package com.paradise.beatify.core.service.musician.band;

import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.repository.musician.band.BandRepository;
import com.paradise.beatify.core.domain.musician.Band;
import com.paradise.beatify.core.dto.musician.band.BandDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BeatifyBandService implements BandService {

    private final BandRepository bandRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BeatifyBandService(BandRepository bandRepository, ModelMapper modelMapper) {

        this.bandRepository = bandRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public BandDTO getById(Long id) throws ServiceException {

        Band band = bandRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Band Not Found!"));
        return modelMapper.map(band, BandDTO.class);
    }
}
