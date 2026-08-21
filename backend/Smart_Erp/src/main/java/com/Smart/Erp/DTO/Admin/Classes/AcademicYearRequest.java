package com.Smart.Erp.DTO.Admin.Classes;

import lombok.NoArgsConstructor;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AcademicYearRequest {

    private String name;

    private LocalDate startDate;

    private LocalDate endDate;
}
