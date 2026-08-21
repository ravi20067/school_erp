package com.Smart.Erp.Repository;

import com.Smart.Erp.Entity.Teacher;
import com.Smart.Erp.Entity.User;
import com.Smart.Erp.Enum.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TeacherRepo extends JpaRepository<Teacher,Long> {
    Optional<Teacher> findByUser(User user);
    Long countByGender(String gender);

    @Query("""
    SELECT t
    FROM Teacher t
    WHERE
        (
            :search IS NULL
            OR :search = ''
            OR LOWER(t.employeeId) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(t.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(t.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(CONCAT(t.firstName, ' ', t.lastName))
                LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(t.email) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(t.phone) LIKE LOWER(CONCAT('%', :search, '%'))
        )
        AND (
            :status IS NULL
            OR t.status = :status
        )
    ORDER BY t.firstName ASC
    """)
    List<Teacher> searchTeachers(
            @Param("search") String search,
            @Param("status") Status status
    );
}
