package com.paradise.beatify.core.service.userdetails.authority;

import com.paradise.beatify.core.domain.userdetails.Authority;
import com.paradise.beatify.core.dto.userdetails.AuthorityDTO;
import com.paradise.beatify.core.dto.userdetails.UserDTO;
import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.repository.userdetails.authority.AuthorityRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BeatifyAuthorityService implements AuthorityService {

    private final AuthorityRepository authorityRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BeatifyAuthorityService(AuthorityRepository authorityRepository, ModelMapper modelMapper) {

        this.authorityRepository = authorityRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public AuthorityDTO getById(Long id) throws ServiceException {

        Authority authority = authorityRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Something went wrong!"));
        return modelMapper.map(authority, AuthorityDTO.class);
    }

    @Override
    public AuthorityDTO createAuthority(UserDTO userDTO) {

        AuthorityDTO authorityDTO = new AuthorityDTO();
        authorityDTO.setRole("ROLE_USER");
        authorityDTO.setUsername(userDTO.getUsername());
        authorityDTO.setActive(true);

        Authority entity = authorityRepository.save(modelMapper.map(authorityDTO, Authority.class));
        return modelMapper.map(entity, AuthorityDTO.class);
    }
}
