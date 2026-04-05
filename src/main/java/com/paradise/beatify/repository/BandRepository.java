package com.paradise.beatify.repository;

import com.paradise.beatify.domain.Band;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BandRepository extends JpaRepository<Band, Long> {

    List<Band> findByTitleContainingIgnoreCase(String query);
}
