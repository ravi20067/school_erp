package com.School.Management.Service;

import com.School.Management.DTO.Admin.Teacher.AdminTeacherStatsDTO;
import com.School.Management.DTO.Admin.Teacher.TeacherDto;
import com.School.Management.Entity.Teacher;
import com.School.Management.Enum.Status;
import com.School.Management.Repository.TeacherAttendanceRepository;
import com.School.Management.Repository.TeacherRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Transactional
public class TeacherService {

    private final TeacherRepo teacherRepo;

    private final TeacherAttendanceRepository teacherAttendanceRepository;

    public @Nullable AdminTeacherStatsDTO getTeacherStats() {
        return AdminTeacherStatsDTO.builder()
                .totalTeacher(teacherRepo.count())
                .male(teacherRepo.countByGender("Male"))
                .female(teacherRepo.countByGender("Female"))
                .toadayPresent(teacherAttendanceRepository.countByAttendanceDate(LocalDate.now()))
                .build();

    }

    public @Nullable List<TeacherDto> getTeachers(String search, Status status) {
        return teacherRepo.searchTeachers(search,status).stream()
                .map(this::convertToDTO)
                .toList();
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
                .gender(teacher.getGender())
                .build();
    }
}
