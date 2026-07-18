package com.School.Management.Repository;

import com.School.Management.Entity.Teacher;
import com.School.Management.Entity.TeacherAttendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TeacherAttendanceRepository
        extends JpaRepository<TeacherAttendance, Long> {

    List<TeacherAttendance> findByTeacherId(Long teacherId);

    List<TeacherAttendance> findByAttendanceDate(LocalDate date);

    boolean existsByTeacherIdAndAttendanceDate(
            Long teacherId,
            LocalDate attendanceDate
    );

    Optional<TeacherAttendance> findByTeacherAndAttendanceDate(
            Teacher teacher,
            LocalDate attendanceDate
    );
}
