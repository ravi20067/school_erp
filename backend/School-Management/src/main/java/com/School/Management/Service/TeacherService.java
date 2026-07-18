package com.School.Management.Service;

import com.School.Management.DTO.Admin.Teacher.AdminTeacherStatsDTO;
import com.School.Management.DTO.Admin.Teacher.TeacherDto;
import com.School.Management.Entity.Teacher;
import com.School.Management.Enum.Status;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Transactional
public class TeacherService {
    public @Nullable AdminTeacherStatsDTO getTeacherStats() {
        return null;
    }

    public @Nullable TeacherDto getTeachers(String search, Status status) {
        return null;
    }

    public @Nullable TeacherDto getTeacherById(Long id) {
        return null;
    }

    public @Nullable TeacherDto updateTeacher(Long id, TeacherDto teacherDto) {
        return null;
    }

    public void deleteTeacher(Long id) {
    }

    public @Nullable TeacherDto convertToDTO(Teacher teacher) {
        return TeacherDto.builder()
                .id(teacher.getId())
                .firstName(teacher.getFirstName())
                .lastName(teacher.getLastName())
                .email(teacher.getEmail())
                .phone(teacher.getPhone())
                .employeeId(teacher.getEmployeeId())
                .qualification(teacher.getQualification())
                .specialization(teacher.getSpecialization())
                .joiningDate(teacher.getJoiningDate())
                .dateOfBirth(teacher.getDateOfBirth())
                .status(teacher.getStatus())
                .role(teacher.getUser().getRoleUser())
                .build();
    }
}
