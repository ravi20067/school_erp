package com.School.Management.DTO.Admin.Classes;

import lombok.*;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ClassCreationRequest {
    String name;
    int displayOrder;
    long academicYearId;
}
