package com.Smart.Erp.DTO.Admin.Classes;

import lombok.Builder;
import lombok.Data;
import lombok.*;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ClassTeacherResponse {
    long id;
    String name;
    String subject;
}
