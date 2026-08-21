package com.Smart.Erp.Repository;

import com.Smart.Erp.Entity.Student;
import org.springframework.data.repository.query.Param;
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
        AND s.classEntity.academicYear.current = true
        AND
        (
            :classEntity IS NULL OR :classEntity = ''
            OR s.classEntity.academicYear.current = true
        )
        AND
        (
            :section IS NULL OR :classEntity = ''
            OR s.section.name = :section
        )
        ORDER BY s.admissionNo
        """)
    List<Student> searchStudents(
            @Param("search") String search,
            @Param("classEntity") String classEntity,
            @Param("section") String section
    );
}
