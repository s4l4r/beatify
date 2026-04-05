package com.paradise.beatify.repository;

import com.paradise.beatify.domain.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    List<Playlist> findByBeatifyUserId(Long userId);
}
