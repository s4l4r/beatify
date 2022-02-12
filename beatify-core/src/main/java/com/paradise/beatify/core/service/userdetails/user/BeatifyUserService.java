package com.paradise.beatify.core.service.userdetails.user;

import com.paradise.beatify.core.domain.userdetails.BeatifyUser;
import com.paradise.beatify.core.dto.userdetails.UserDTO;
import com.paradise.beatify.core.exceptions.ServiceException;
import com.paradise.beatify.core.repository.userdetails.user.UserRepository;
import com.paradise.beatify.core.service.userdetails.authority.AuthorityService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BeatifyUserService implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityService authorityService;

    @Autowired
    public BeatifyUserService(UserRepository userRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder,
                              AuthorityService authorityService) {

        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.authorityService = authorityService;
    }

    @Override
    public UserDTO getById(Long id) throws ServiceException {

        BeatifyUser user = userRepository.findById(id)
                .orElseThrow(() -> new ServiceException("Something went wrong!"));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public boolean existsById(UserDTO userDTO) {

        return userRepository.findById(userDTO.getId()).isPresent();
    }

    @Override
    public boolean existsByUsername(UserDTO userDTO) {

        try {

            getByEmailAddress(userDTO.getUsername());
            return true;

        } catch (ServiceException e) {

            return false;
        }
    }

    @Override
    public UserDTO signup(UserDTO userDTO) throws ServiceException {

        userDTO.setActive(true);
        userDTO.setPassword(getEncryptedPassword(userDTO.getPassword()));

        authorityService.createAuthority(userDTO);
        BeatifyUser entity = userRepository.save(modelMapper.map(userDTO, BeatifyUser.class));
        return modelMapper.map(entity, UserDTO.class);
    }

    @Override
    public UserDTO getByEmailAddress(String emailAddress) throws ServiceException {
        BeatifyUser user = userRepository.findByEmailAddress(emailAddress)
                .orElseThrow(() -> new ServiceException("No user found with email address " + emailAddress));
        return modelMapper.map(user, UserDTO.class);
    }

    private String getEncryptedPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}
