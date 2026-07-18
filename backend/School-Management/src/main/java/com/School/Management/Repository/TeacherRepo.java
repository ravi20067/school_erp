package com.School.Management.Repository;

import com.School.Management.Entity.Teacher;
import com.School.Management.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeacherRepo extends JpaRepository<Teacher,Long> {
    Optional<Teacher> findByUser(User user);
}
