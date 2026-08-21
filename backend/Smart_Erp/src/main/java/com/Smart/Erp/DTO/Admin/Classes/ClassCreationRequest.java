package com.Smart.Erp.DTO.Admin.Classes;

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
