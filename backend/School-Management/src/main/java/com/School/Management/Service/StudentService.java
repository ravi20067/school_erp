package com.School.Management.Service;


import com.School.Management.DTO.Admin.Student.AdminStudentStatsDTO;
import com.School.Management.DTO.Admin.Student.StudentDTO;
import com.School.Management.Entity.Student;
import com.School.Management.Enum.Classes;
import com.School.Management.Enum.Sections;
import com.School.Management.Repository.*;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Component
@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepo studentRepository;

    private final SectionRepo sectionRepository;

    public AdminStudentStatsDTO getDashboardStats() {

        Long totalStudents = studentRepository.count();

        Long boys = studentRepository.countByGender("Male");

        Long girls = studentRepository.countByGender("Female");

        Long newStudent = studentRepository.countByAdmissionDate(LocalDate.now());

        return new AdminStudentStatsDTO(
                totalStudents,
                boys,
                girls,
                newStudent
        );
    }

    public @Nullable List<String> getSections(Classes className) {
        return sectionRepository.findBySchoolClass_ClassName(className)
                .stream()
                .map(section -> section.getSectionName().name())
                .toList();
    }

    public List<StudentDTO> loadStudents(String search, Classes schoolClass, Sections section) {
        return studentRepository.searchStudents(search,schoolClass,section).stream()
                .map(this::convertToStudentDTO)
                .toList();
    }

    public StudentDTO convertToStudentDTO(Student student) {

        return StudentDTO.builder()
                .id(student.getId())
                .admissionNo(student.getAdmissionNo())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .gender(student.getGender())
                .dateOfBirth(student.getDateOfBirth())
                .email(student.getEmail())
                .phone(student.getPhone())
                .address(student.getAddress())
                .schoolClass(student.getSchoolClass().getClassName())
                .section(student.getSection().getSectionName())
                .rollNumber(student.getRollNumber())
                .status(student.getStatus().name())
                .admissionDate(student.getAdmissionDate())
                .build();
    }
}
