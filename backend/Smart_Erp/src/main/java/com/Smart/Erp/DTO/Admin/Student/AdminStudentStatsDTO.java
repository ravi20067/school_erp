package com.Smart.Erp.DTO.Admin.Student;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminStudentStatsDTO {

    private Long totalStudents;
    private Long boys;
    private Long girls;
    private Long newStudent;
}