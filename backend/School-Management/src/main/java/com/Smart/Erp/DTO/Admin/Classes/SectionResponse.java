package com.School.Management.DTO.Admin.Classes;

import lombok.Builder;
import lombok.Data;
import lombok.*;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SectionResponse {
    long id;
    String name;
    Integer capacity;
    Integer studentCount;
    String roomNumber;
    ClassTeacherResponse classTeacher;
}
