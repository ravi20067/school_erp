package com.School.Management.Repository;

import com.School.Management.Entity.Student;
import com.School.Management.Enum.Classes;
import com.School.Management.Enum.Sections;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface StudentRepo extends JpaRepository<Student, Long> {
    Long countByGender(String gender);

    Long countByAdmissionDate(LocalDate admissionDate);

    @Query("""
        SELECT s
        FROM Student s
        WHERE
        (
            :search IS NULL OR :search = ''
            OR LOWER(s.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(CONCAT(s.firstName, ' ', s.lastName))
                LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(s.admissionNo) LIKE LOWER(CONCAT('%', :search, '%'))
        )
        AND
        (
            :schoolClass IS NULL
            OR s.schoolClass.className = :schoolClass
        )
        AND
        (
            :section IS NULL
            OR s.section.sectionName = :section
        )
        ORDER BY s.admissionNo
        """)
    List<Student> searchStudents(
            @Param("search") String search,
            @Param("schoolClass") Classes schoolClass,
            @Param("section") Sections section
    );
}
