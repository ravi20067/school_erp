package com.School.Management.Repository;

import com.School.Management.Entity.Sequence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SequenceRepo extends JpaRepository<Sequence,String> {
    Optional<Sequence> findByYear(String year);
}
