package com.Smart.Erp.DTO.Admin.Teacher;

import com.Smart.Erp.Enum.Role;
import com.Smart.Erp.Enum.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDto {
    private Long id;

    private String employeeId;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String qualification;

    private String specialization;

    private LocalDate joiningDate;

    private LocalDate dateOfBirth;

    private Status status;

    private String gender;

    private Role role;
}
