package com.paradise.beatify.repository;

import com.paradise.beatify.domain.BeatifyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<BeatifyUser, Long> {

    Optional<BeatifyUser> findByUsername(String username);

    Optional<BeatifyUser> findByGoogleId(String googleId);
}
