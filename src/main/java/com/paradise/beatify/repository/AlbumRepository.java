package com.paradise.beatify.repository;

import com.paradise.beatify.domain.Album;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query("SELECT COALESCE(MAX(a.popularity), 0) FROM Album a")
    long getOverallPopularity();

    List<Album> findAllByOrderByIdDesc(Pageable pageable);

    List<Album> findByTitleContainingIgnoreCase(String query);
}
