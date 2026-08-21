package com.School.Management.Repository;


import com.School.Management.Entity.AcademicYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AcademicYearRepository
        extends JpaRepository<AcademicYear, Long> {

    Optional<AcademicYear> findByName(String name);

    boolean existsByName(String name);

    @Query("""
                SELECT a
                FROM AcademicYear a
                WHERE a.endDate < :targetStartDate
                ORDER BY a.endDate DESC
            """)
    List<AcademicYear> findPreviousYears(
            @Param("targetStartDate") LocalDate targetStartDate
    );

    Optional<AcademicYear> findByCurrent(Boolean current);


}
