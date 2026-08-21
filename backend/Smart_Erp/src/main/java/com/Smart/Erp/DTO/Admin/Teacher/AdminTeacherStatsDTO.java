package com.Smart.Erp.DTO.Admin.Teacher;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AdminTeacherStatsDTO {
    Long totalTeacher;
    Long male ;
    Long female;
    Long toadayPresent;
}
