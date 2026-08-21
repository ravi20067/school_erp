package com.School.Management.DTO.Admin.Classes;


import lombok.*;

import java.time.LocalDate;

import lombok.Data;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AcademicYearResponse {

    private Long id;

    private String name;

    private LocalDate startDate;

    private LocalDate endDate;

    private Boolean current;

    private Boolean active;
}
