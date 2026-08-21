package com.School.Management.Service;


import com.School.Management.DTO.Admin.Student.AdminStudentStatsDTO;
import com.School.Management.DTO.Admin.Student.StudentDTO;
import com.School.Management.Entity.ClassEntity;
import com.School.Management.Entity.Section;
import com.School.Management.Entity.Student;
import com.School.Management.Repository.*;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;


@Component
@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepo studentRepository;

    private final SectionRepo sectionRepository;

    private final ClassRepo classRepo;

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

    public @Nullable List<String> getSections(String className) {
        ClassEntity classEntity = classRepo.findByClassNameAndAcademicYear_Current(className,true).orElseThrow(() -> new ResourceNotFoundException("class not found"));
        return sectionRepository.findByClassEntity(classEntity)
                .stream()
                .map(Section::getName)
                .toList();
    }

    public List<StudentDTO> loadStudents(String search, String schoolClass, String section) {
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
                .schoolClass(student.getClassEntity().getClassName())
                .section(student.getSection().getName())
                .rollNumber(student.getRollNumber())
                .status(student.getStatus().name())
                .admissionDate(student.getAdmissionDate())
                .build();
    }

    public @Nullable List<String> getClasses() {
        return classRepo.findByAcademicYear_Current(true).stream()
                .map(ClassEntity::getClassName)
                .toList();
    }
}
