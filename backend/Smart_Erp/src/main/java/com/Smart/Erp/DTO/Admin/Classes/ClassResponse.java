package com.Smart.Erp.DTO.Admin.Classes;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import lombok.*;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ClassResponse {
    Long id;
    String name;
    int displayOrder;
    boolean isActive;
    List<SectionResponse> sections;
}
