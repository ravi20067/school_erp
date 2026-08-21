package com.School.Management.DTO.Admin.Student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {

    private Long id;

    private String admissionNo;

    private String firstName;

    private String lastName;

    private String gender;

    private LocalDate dateOfBirth;

    private String email;

    private String phone;

    private String address;

    private String schoolClass;

    private String section;

    private Integer rollNumber;

    private String status;

    private LocalDate admissionDate;
}
